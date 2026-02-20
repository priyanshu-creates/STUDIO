
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  return (
    <section className="py-24 md:py-32 bg-background text-off-white border-t border-white/5">
      <div className="px-8 flex flex-col md:flex-row gap-16 max-w-7xl mx-auto">
        <div className="w-full md:w-1/3">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-4 block opacity-50 text-primary">(05) FAQ</span>
          <h2 className="text-[40px] md:text-[64px] font-display font-black tracking-tighter leading-[0.9] mb-8">Frequently Asked Questions</h2>
        </div>

        <div className="md:w-2/3">
          <div className="divide-y divide-white/10">
            {FAQS.map((faq) => (
              <div key={faq.id} className="border-b border-white/10 pb-8 last:border-0">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full text-left flex justify-between items-center group"
                >
                  <span className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-accent-glow transition-colors">
                    {faq.question}
                  </span>
                  <span className={`text-2xl transition-transform duration-300 ${openId === faq.id ? 'rotate-45 text-accent-glow' : 'text-secondary'}`}>+</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${openId === faq.id ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-secondary leading-relaxed max-w-xl font-sans mt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
