
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background pt-16 md:pt-32 pb-8 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto rounded-none overflow-hidden relative glass-panel">
        <div className="p-8 md:p-16 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 bg-gradient-to-br from-[#0F172A] to-[#020617]">

          <div className="flex flex-col justify-between">
            <h2 className="text-[40px] md:text-[96px] font-display font-black tracking-tighter text-white leading-none mb-12">
              A2 STUDIOS<span className="text-xl vertical-top align-super text-accent-glow">®</span>
            </h2>

            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">Social Media</p>
              <div className="flex gap-4">
                {['f', 'ig', 'in'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 bg-off-white/5 border border-off-white/10 flex items-center justify-center rounded-none hover:bg-primary hover:text-background transition-all">
                    <span className="text-xs font-bold uppercase">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 md:gap-32 md:justify-end">
            <div className="space-y-6">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">About</p>
              <p className="text-sm text-off-white/60 leading-relaxed max-w-[240px] font-sans">
                A2 Studios is a digital studio specializing in design, branding, and interactive experiences powered by artificial intelligence.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">Navigation</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-12 text-sm font-bold">
                <a href="#" className="hover:text-primary transition-colors">Home</a>
                <a href="#" className="hover:text-primary transition-colors">About</a>
                <a href="#" className="hover:text-primary transition-colors">Projects</a>
                <a href="#" className="hover:text-primary transition-colors">Blogs</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
                <a href="#" className="hover:text-primary transition-colors">404</a>
              </div>
            </div>
          </div>

          {/* Large background text */}
          <div className="absolute bottom-4 right-4 text-[120px] font-black opacity-[0.03] italic select-none pointer-events-none">
            A2.
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-[#F5F5F5]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest text-[#F5F5F5]/40 uppercase">
        <p>© 2024 A2 Studios All rights reserved. Powered by Framer.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#F5F5F5]">Privacy Policy</a>
          <a href="#" className="hover:text-[#F5F5F5]">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
