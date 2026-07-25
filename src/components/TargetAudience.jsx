import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Heart, Clock, Crown, ArrowRight } from 'lucide-react';

export const TargetAudience = () => {
  const { t } = useApp();

  const cards = t('audience.cards');
  const icons = [
    <Heart className="w-6 h-6 text-rose-500" />,
    <Clock className="w-6 h-6 text-amber-500" />,
    <Crown className="w-6 h-6 text-purple-500" />
  ];

  return (
    <section className="py-32 md:py-44 relative bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div data-anim className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{t('audience.tag')}</span>
          </div>

          <h2 data-anim className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('audience.title')}
          </h2>
        </div>

        {/* 3 Personas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(cards) && cards.map((card, idx) => (
            <div
              key={idx}
              data-anim
              className="clay-card p-8 space-y-5 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    {icons[idx]}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-extrabold">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>Giải pháp phù hợp nhất</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
