import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, HelpCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export const ProblemSection = () => {
  const { t } = useApp();

  const cardsData = t('problems.cards');
  const icons = [
    <BookOpen className="w-7 h-7 text-amber-500" />,
    <Calendar className="w-7 h-7 text-brand-500" />,
    <HelpCircle className="w-7 h-7 text-purple-500" />
  ];

  return (
    <section id="problems" className="py-32 md:py-40 relative bg-slate-100/60 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div data-anim className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>{t('problems.tag')}</span>
          </div>

          <h2 data-anim className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('problems.title')}
          </h2>

          <p data-anim className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t('problems.subtitle')}
          </p>
        </div>

        {/* 3 Core Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(cardsData) && cardsData.map((item, idx) => (
            <div
              key={item.id || idx}
              data-anim
              className="clay-card p-8 relative flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-4">
                
                {/* Number Badge & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    {icons[idx]}
                  </div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700 font-mono">
                    {item.number}
                  </span>
                </div>

                {/* Problem Title */}
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                {/* Problem Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Solution Highlight Footer inside Card */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 bg-brand-50/50 dark:bg-brand-950/30 p-3 rounded-xl border border-brand-100 dark:border-brand-900/50">
                <p className="text-xs font-bold text-brand-700 dark:text-brand-300 flex items-start gap-1.5">
                  <span>{item.solution}</span>
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
