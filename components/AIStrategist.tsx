import React, { useState } from 'react';
import { TiltCard } from './ui/tilt-card';

const AIStrategist: React.FC = () => {
  const [selectedBottleneck, setSelectedBottleneck] = useState<string | null>(null);

  const bottlenecks = [
    {
      id: 'traffic',
      label: 'Low Traffic',
      description: 'Great product, but no one sees it.',
      insight: 'You have an attention problem.',
      solution: 'We engineer viral content loops that earn curiosity before asking for intent.',
      action: 'Get Your Attention Strategy'
    },
    {
      id: 'conversion',
      label: 'Low Conversion',
      description: 'High traffic, but visitors don\'t buy.',
      insight: 'You have a clarity problem.',
      solution: 'We redesign your funnel for "One Decision" — removing friction and anxiety.',
      action: 'Get Your Conversion Audit'
    },
    {
      id: 'retention',
      label: 'Low Operations',
      description: 'Manual work is killing your scale.',
      insight: 'You have an efficiency problem.',
      solution: 'We deploy custom AI agents to automate your workflow and client success.',
      action: 'Automate Your Agency'
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-surface text-off-white">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: Introduction */}
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase mb-4 block text-primary">Diagnose & Scale</span>
          <h2 className="text-[40px] md:text-[64px] font-display font-black tracking-tighter leading-none mb-8">
            WHERE IS YOUR <br />
            <span className="text-primary/80">BOTTLENECK?</span>
          </h2>
          <p className="text-lg text-off-white/80 font-sans font-light leading-relaxed mb-8 max-w-md">
            Most agencies guess. We diagnose. Identify your current constraint, and let our engineers build the specific AI systems to break it.
          </p>

          <div className="flex flex-col gap-4">
            {bottlenecks.map((b) => (
              <TiltCard key={b.id} className="h-full" rotateScale={2}>
                <button
                  key={b.id}
                  onClick={() => setSelectedBottleneck(b.id)}
                  className={`w-full text-left p-6 transition-all duration-300 group relative overflow-hidden h-full ${selectedBottleneck === b.id
                    ? 'glass-panel border-accent-glow bg-accent-glow/10'
                    : 'glass-panel opacity-60 hover:opacity-100 hover:border-accent-glow/50'
                    }`}
                >
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <span className={`block text-xs font-bold tracking-widest uppercase mb-1 ${selectedBottleneck === b.id ? 'text-accent-glow' : 'text-secondary'}`}>
                        {b.label}
                      </span>
                      <h3 className="text-xl font-bold font-display text-white">{b.description}</h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${selectedBottleneck === b.id ? 'border-primary bg-primary text-background' : 'border-white/20 text-white/20'}`}>
                      →
                    </div>
                  </div>
                </button>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Right: Diagnostic Result */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          {selectedBottleneck ? (
            <TiltCard className="w-full" rotateScale={3}>
              <div className="w-full bg-background border border-primary/20 p-8 md:p-12 animate-fade-in relative">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Analysis</span>

                {(() => {
                  const selected = bottlenecks.find(b => b.id === selectedBottleneck);
                  return (
                    <>
                      <h3 className="text-3xl font-display font-black mb-6">{selected?.insight}</h3>
                      <p className="text-off-white/80 text-lg leading-relaxed mb-8 font-sans">
                        {selected?.solution}
                      </p>
                      <button className="w-full py-4 bg-primary text-background font-bold tracking-widest uppercase hover:bg-off-white transition-colors">
                        {selected?.action}
                      </button>
                    </>
                  );
                })()}
              </div>
            </TiltCard>
          ) : (
            <div className="text-center opacity-30">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-primary font-display font-black">?</span>
              </div>
              <p className="font-display font-bold text-2xl">SELECT A CARD TO DIAGNOSE</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AIStrategist;
