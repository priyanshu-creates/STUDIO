
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { GlowingEffect } from './ui/glowing-effect';

const Testimonials: React.FC = () => {
  const featured = TESTIMONIALS.find(t => t.featured);
  const others = TESTIMONIALS.filter(t => !t.featured);

  return (
    <section className="py-24 md:py-32 bg-background text-off-white">
      <div className="px-8 text-center mb-16">
        <span className="text-[10px] font-bold tracking-widest uppercase mb-4 block text-primary">Testimonials</span>
        <h2 className="text-[40px] md:text-[64px] font-display font-black tracking-tighter leading-none mb-4">Stories from our clients</h2>
      </div>

      <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Featured Big Card */}
        {featured && (
          <div className="bg-primary text-background p-12 flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-background" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-tight mb-8">
                "{featured.quote}"
              </p>
            </div>
            <div className="flex justify-between items-end border-t border-background/20 pt-8">
              <div>
                <h4 className="font-black text-lg">{featured.author}</h4>
                <p className="text-[10px] font-bold opacity-80 tracking-widest uppercase">{featured.role} AT {featured.company}</p>
              </div>
              <span className="text-4xl font-black opacity-30">[01]</span>
            </div>
          </div>
        )}

        {/* Cinematic Visual Card */}
        <div className="bg-surface relative overflow-hidden flex items-center justify-center">
          <img
            src="https://picsum.photos/800/800?random=15&grayscale"
            alt="Cinematic Visual"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-8 right-8 flex gap-2">
            <button className="w-12 h-12 border border-[#F5F5F5]/30 flex items-center justify-center hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-12 h-12 border border-[#F5F5F5]/30 bg-[#F5F5F5] text-[#0A0A0A] flex items-center justify-center hover:bg-transparent hover:text-[#F5F5F5] transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of smaller cards */}
      <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {others.map((t) => (
          <div key={t.id} className="relative h-full rounded-[1.25rem] glass-panel p-2 md:rounded-[1.5rem] md:p-3">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex flex-col justify-between h-full bg-surface p-6 rounded-xl border-[0.75px] border-white/5 overflow-hidden">
              <div>
                <div className="flex gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-80 mb-8 italic font-sans">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] overflow-hidden">
                  <img src={`https://picsum.photos/100/100?random=${t.id}`} alt={t.author} className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase">{t.author}</h4>
                  <p className="text-[9px] opacity-60 tracking-widest uppercase">{t.role} AT {t.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center flex items-center justify-center gap-2 opacity-60">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <img key={i} src={`https://picsum.photos/40/${40 + i}`} className="w-6 h-6 rounded-full border border-[#F5F5F5]" />
          ))}
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase">100+ Happy Clients</span>
      </div>
    </section>
  );
};

export default Testimonials;
