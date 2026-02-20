import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 md:px-8 py-6 flex justify-between items-center transition-all duration-300">
        {/* Brand */}
        <div className="flex items-center gap-2 relative z-50">
          <img src="/logo.png" alt="A2 Studios Logo" className="w-10 md:w-12 h-auto object-contain" />
        </div>

        {/* Desktop Links (Centered Glass Pill) */}
        <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-black/20 backdrop-blur-md border border-white/5 rounded-full shadow-lg">
          <a href="#work" className="text-sm font-medium tracking-wide text-white hover:text-accent-glow transition-colors font-sans">WORK</a>
          <a href="#about" className="text-sm font-medium tracking-wide text-white hover:text-accent-glow transition-colors font-sans">ABOUT</a>
          <a href="#services" className="text-sm font-medium tracking-wide text-white hover:text-accent-glow transition-colors font-sans">SERVICES</a>
          <a href="#pricing" className="text-sm font-medium tracking-wide text-white hover:text-accent-glow transition-colors font-sans">PRICING</a>
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-50">
          <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 text-background rounded-full text-xs font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all font-sans">
            GET STARTED
          </button>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-bold font-display tracking-tight">
              <a href="#work" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-glow transition-colors">WORK</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-glow transition-colors">ABOUT</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-glow transition-colors">SERVICES</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-glow transition-colors">PRICING</a>
            </div>

            <button className="mt-8 px-8 py-3 bg-white text-background rounded-full text-sm font-bold tracking-wider">
              GET STARTED
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
