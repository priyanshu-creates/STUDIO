import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../constants';

const CaseStudies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="py-32 bg-background">
      <div className="px-8 mb-16 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold text-accent-glow tracking-widest uppercase mb-4 block">Selected Projects</span>
          <h2 className="text-[40px] md:text-[64px] font-display font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8]">CASE STUDIES</h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-primary/80 max-w-[300px] text-xs leading-relaxed opacity-60 font-sans">
            A curation of our most impactful collaborations using AI visual synthesis and interactive design.
          </p>
        </div>
      </div>

      {/* Horizontal Gallery */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-8 pb-8"
        style={{ scrollbarWidth: 'none' }}
      >
        {CASE_STUDIES.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[600px] w-full overflow-hidden rounded-none glass-panel card-hover flex-shrink-0 w-[80vw] md:w-[60vw] snap-start cursor-crosshair"
          >
            {/* Image Background */}
            <img
              src={study.image}
              alt={study.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] font-bold tracking-widest text-accent-glow mb-2 block">{study.category}</span>
              <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white mb-2">{study.title}</h3>
              <p className="text-sm text-primary/80 max-w-xs font-sans">{study.description}</p>
            </div>
            {/* Hover Indicator */}
            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border-accent-glow/50">
                ↗
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
