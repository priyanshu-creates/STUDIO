/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./services/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#E2E8F0', // Silver Base
                surface: '#0F172A', // Slate-900 or Transparent
                background: '#020617', // Deep Abyss (Slate-950)
                border: '#1E293B', // Slate-800
                secondary: '#94A3B8', // Blue-Grey Text
                'off-white': '#F8FAFC', // Slate-50
                'accent-glow': '#8B5CF6', // Violet
            },
            fontFamily: {
                sans: ['"Space Grotesk"', 'sans-serif'],
                display: ['"Syne"', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'slide-in-right': 'slideInRight 0.5s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'beam': 'beam 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(202, 138, 4, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(202, 138, 4, 0.6), 0 0 10px rgba(202, 138, 4, 0.4)' },
                },
                beam: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                }
            },
        },
    },
    plugins: [],
}
