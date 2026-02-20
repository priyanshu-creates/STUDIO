"""
Instagram Scraper for A2 Studios — Growth Engine Card
Deployed on Modal, runs every 24 hours at 6 AM UTC.
Scrapes the latest post image from @atwo.io and uploads it to Supabase Storage.
"""

import modal
import os
import io
import json
import re
import time
import datetime
import httpx
from pathlib import Path

# ---------------------------------------------------------------------------
# Modal App & Image
# ---------------------------------------------------------------------------
app = modal.App("instagram-scraper")

scraper_image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "playwright==1.49.1",
        "httpx",
        "beautifulsoup4",
        "supabase",
    )
    .run_commands("playwright install chromium --with-deps")
)

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
TARGET_USERNAME = "atwo.io"
SUPABASE_BUCKET = "instagram-images"
FALLBACK_IMAGE = "https://picsum.photos/400/500?random=20"


# ---------------------------------------------------------------------------
# Helper: Upload image to Supabase Storage & insert metadata row
# ---------------------------------------------------------------------------
def upload_to_supabase(image_bytes: bytes, username: str, post_url: str | None = None) -> str:
    """Upload image bytes to Supabase Storage and insert a row into instagram_posts.
    Returns the public URL of the uploaded image.
    """
    from supabase import create_client

    url = os.environ["SUPABASE_URL"]
    key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    client = create_client(url, key)

    # Generate a unique filename
    timestamp = datetime.datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    file_path = f"{username}/{timestamp}.jpg"

    # Upload to storage
    client.storage.from_(SUPABASE_BUCKET).upload(
        path=file_path,
        file=image_bytes,
        file_options={"content-type": "image/jpeg", "upsert": "true"},
    )

    # Build the public URL
    public_url = f"{url}/storage/v1/object/public/{SUPABASE_BUCKET}/{file_path}"

    # Insert metadata row
    client.table("instagram_posts").insert({
        "username": username,
        "image_url": public_url,
        "post_url": post_url,
    }).execute()

    print(f"✅ Uploaded to Supabase: {public_url}")
    return public_url


# ---------------------------------------------------------------------------
# Strategy 1: Playwright headless browser (most reliable)
# ---------------------------------------------------------------------------
def scrape_with_playwright(username: str) -> tuple[bytes, str | None]:
    """Use Playwright to load Instagram profile and grab the first post image."""
    from playwright.sync_api import sync_playwright
    from bs4 import BeautifulSoup

    print(f"🎭 Strategy 1: Playwright — scraping @{username}")

    with sync_playwright() as p:

        # Configure proxy if available
        launch_args = {
            "headless": True,
            "args": [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-blink-features=AutomationControlled",
            ],
        }

        # Use proxy from environment variables
        if os.environ.get("PROXY_SERVER"):
            print(f"   Using proxy: {os.environ['PROXY_SERVER']}")
            launch_args["proxy"] = {
                "server": os.environ["PROXY_SERVER"],
                "username": os.environ.get("PROXY_USERNAME"),
                "password": os.environ.get("PROXY_PASSWORD"),
            }

        browser = p.chromium.launch(**launch_args)

        context = browser.new_context(
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            has_touch=True,
            locale="en-US",
        )

        page = context.new_page()

        # Block unnecessary resources to speed things up
        page.route("**/*.{mp4,webm,ogg,mp3,wav}", lambda route: route.abort())
        page.route("**/analytics/**", lambda route: route.abort())

        # Navigate to profile
        page.goto(f"https://www.instagram.com/{username}/", wait_until="networkidle", timeout=60000)

        # Wait for the page content to load
        time.sleep(5)

        # Try to dismiss any login modals
        try:
            page.click("text=Not Now", timeout=3000)
        except Exception:
            pass
        try:
            page.click('[aria-label="Close"]', timeout=2000)
        except Exception:
            pass

        time.sleep(2)

        # Get page content
        html = page.content()
        soup = BeautifulSoup(html, "html.parser")

        # Strategy: find post images in the grid
        # Instagram uses <img> tags inside article elements or post links
        post_images = []

        # Look for images inside the post grid
        for img in soup.find_all("img"):
            src = img.get("src", "")
            alt = img.get("alt", "")
            # Filter: Instagram post images typically have descriptive alt text
            # and are hosted on Instagram CDN
            if src and ("cdninstagram" in src or "scontent" in src or "fbcdn" in src):
                # Skip tiny images (profile pics, icons)
                if "150x150" not in src and "s150x150" not in src:
                    post_images.append(src)

        # Also try to find via article tags
        if not post_images:
            articles = soup.find_all("article")
            for article in articles:
                for img in article.find_all("img"):
                    src = img.get("src", "")
                    if src and ("cdninstagram" in src or "scontent" in src or "fbcdn" in src):
                        post_images.append(src)

        # Also try to find from page source via regex  
        if not post_images:
            img_pattern = re.findall(r'"display_url":"([^"]+)"', html)
            post_images.extend([url.replace("\\u0026", "&") for url in img_pattern])

        if not post_images:
            # Try finding from og:image meta tag (profile-level image at least)
            og_img = soup.find("meta", property="og:image")
            if og_img and og_img.get("content"):
                post_images.append(og_img["content"])

        browser.close()

        if not post_images:
            raise Exception("Playwright: No post images found in HTML")

        # Download the first post image
        image_url = post_images[0]
        print(f"   Found image URL: {image_url[:80]}...")
        resp = httpx.get(image_url, timeout=30, follow_redirects=True)
        resp.raise_for_status()
        return resp.content, None  # post_url not easily extractable here


# ---------------------------------------------------------------------------
# Strategy 2: Instagram GraphQL / Embed endpoint
# ---------------------------------------------------------------------------
def scrape_with_embed(username: str) -> tuple[bytes, str | None]:
    """Try Instagram's embed/public API endpoints."""
    print(f"🔗 Strategy 2: Embed/API — scraping @{username}")

    headers = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }

    # Try the web profile endpoint
    url = f"https://www.instagram.com/api/v1/users/web_profile_info/?username={username}"
    headers_api = {
        **headers,
        "X-IG-App-ID": "936619743392459",
        "X-Requested-With": "XMLHttpRequest",
    }

    resp = httpx.get(url, headers=headers_api, timeout=30, follow_redirects=True)
    if resp.status_code == 200:
        data = resp.json()
        user_data = data.get("data", {}).get("user", {})
        edges = user_data.get("edge_owner_to_timeline_media", {}).get("edges", [])
        if edges:
            node = edges[0].get("node", {})
            display_url = node.get("display_url")
            shortcode = node.get("shortcode")
            post_url = f"https://www.instagram.com/p/{shortcode}/" if shortcode else None
            if display_url:
                img_resp = httpx.get(display_url, timeout=30, follow_redirects=True)
                img_resp.raise_for_status()
                return img_resp.content, post_url

    raise Exception("Embed/API: Could not fetch post data")


# ---------------------------------------------------------------------------
# Strategy 3: Third-party viewer (Imginn)
# ---------------------------------------------------------------------------
def scrape_with_third_party(username: str) -> tuple[bytes, str | None]:
    """Scrape from third-party Instagram viewers as last resort."""
    from bs4 import BeautifulSoup

    print(f"🌐 Strategy 3: Third-party viewers — scraping @{username}")

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    # Try Imginn
    viewers = [
        f"https://imginn.com/{username}/",
        f"https://picnob.com/profile/{username}/",
    ]

    for viewer_url in viewers:
        try:
            resp = httpx.get(viewer_url, headers=headers, timeout=30, follow_redirects=True)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                # Look for post images
                for img in soup.find_all("img"):
                    src = img.get("src", "") or img.get("data-src", "")
                    if src and ("cdninstagram" in src or "scontent" in src or "fbcdn" in src):
                        img_resp = httpx.get(src, timeout=30, follow_redirects=True)
                        img_resp.raise_for_status()
                        if len(img_resp.content) > 5000:  # Not a tiny placeholder
                            return img_resp.content, None
        except Exception as e:
            print(f"   {viewer_url} failed: {e}")
            continue

    raise Exception("Third-party viewers: All failed")


# ---------------------------------------------------------------------------
# Main scheduled function
# ---------------------------------------------------------------------------
@app.function(
    schedule=modal.Cron("0 6 * * *"),  # Daily at 6 AM UTC
    image=scraper_image,
    timeout=300,
    secrets=[
        modal.Secret.from_name("supabase-creds"),
        modal.Secret.from_name("proxy-creds"),
    ],
)
def scrape_latest_post():
    """Scrape the latest Instagram post from @atwo.io and upload to Supabase."""
    username = TARGET_USERNAME
    strategies = [
        ("Playwright", scrape_with_playwright),
        ("Embed/API", scrape_with_embed),
        ("Third-party", scrape_with_third_party),
    ]

    for name, strategy in strategies:
        try:
            image_bytes, post_url = strategy(username)
            if image_bytes and len(image_bytes) > 1000:
                print(f"✅ Success with {name}! Image size: {len(image_bytes)} bytes")
                public_url = upload_to_supabase(image_bytes, username, post_url)
                return {"success": True, "strategy": name, "url": public_url}
            else:
                print(f"⚠️  {name}: Image too small ({len(image_bytes)} bytes), trying next...")
        except Exception as e:
            print(f"❌ {name} failed: {e}")
            continue

    # All strategies failed
    error_msg = "All scraping strategies failed. Cloud IPs may be blocked."
    print(f"🚨 {error_msg}")
    return {"success": False, "error": error_msg, "fallback": FALLBACK_IMAGE}


# ---------------------------------------------------------------------------
# Manual trigger (for testing: `modal run scraper/instagram_scraper.py`)
# ---------------------------------------------------------------------------
@app.local_entrypoint()
def main():
    result = scrape_latest_post.remote()
    print(json.dumps(result, indent=2))
