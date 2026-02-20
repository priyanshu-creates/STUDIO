
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { supabase } from '../lib/supabaseClient';

const FALLBACK_IMAGE = 'https://picsum.photos/400/500?random=20';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 500]);
  const yText = useTransform(scrollY, [0, 1000], [0, -200]);

  const [latestPostImage, setLatestPostImage] = useState<string>(FALLBACK_IMAGE);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const { data, error } = await supabase
          .from('instagram_posts')
          .select('image_url')
          .order('scraped_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data?.image_url) {
          setLatestPostImage(data.image_url);
        }
      } catch {
        // Silently fall back to placeholder
      }
    };
    fetchLatestPost();
  }, []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* Background Cinematic Asset */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/bg vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 hero-gradient"></div>
      </motion.div>

      <motion.div
        style={{ y: yText }}
        className="relative z-10 w-full h-full px-4 md:px-8 flex flex-col-reverse md:grid md:grid-cols-12 gap-8 md:gap-8 pb-8 md:pb-0"
      >
        <div className="w-full md:col-span-8 flex flex-col justify-end md:pb-12">
          <h1 className="text-5xl md:text-[96px] font-display font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8] mb-4 md:mb-8 uppercase animate-slide-up">
            A2<br />STUDIOS<span className="text-accent-glow">.</span>
          </h1>
          <p className="max-w-xl text-sm md:text-lg text-primary/80 font-sans font-light leading-relaxed animate-fade-in delay-100">
            A2 Studios is a team of experts helping brands scale their businesses through AI-generated marketing campaigns.
            <span className="block mt-4 font-medium text-primary">No guessing. Just growth.</span>
          </p>
        </div>

        <div className="hidden lg:flex w-full md:col-span-4 flex-col justify-start items-end gap-6 pt-32">
          <div className="w-full max-w-[280px] p-4 glass-panel rounded-none border-white/10 card-hover animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-[10px] text-accent-glow font-bold block mb-2 uppercase tracking-widest">Growth Engine</span>
            <p className="text-xs text-primary/80 leading-normal opacity-80 mb-4">
              We recognized a gap in the luxury industry. Partner with us to drive growth and create connections that elevate your brand to the next level.
            </p>
            <img
              src={latestPostImage}
              className="w-full h-48 object-cover rounded-none grayscale"
              alt="Latest Instagram Post"
            />
          </div>

          <div className="flex gap-4 text-[10px] font-bold tracking-[0.2em] text-off-white/40">
            <span>NEWS & INSIGHTS</span>
            <span>FAQ</span>
            <span className="text-primary">CONTACT</span>
          </div>
        </div>
      </motion.div>


    </section>
  );
};

export default Hero;
