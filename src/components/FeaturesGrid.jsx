import React from 'react';
import { useApp } from '../context/AppContext';
import { Gamepad2, BookOpenCheck, Activity, CalendarCheck, Check, Sparkles, ArrowUpRight } from 'lucide-react';

export const FeaturesGrid = () => {
  const { t } = useApp();

  const items = t('features.items');
  const iconsMap = {
    'virtual-pet': <Gamepad2 className="w-8 h-8 text-orange-500" />,
    'learn': <BookOpenCheck className="w-8 h-8 text-amber-500" />,
    'health': <Activity className="w-8 h-8 text-teal-500" />,
    'records': <CalendarCheck className="w-8 h-8 text-purple-500" />
  };

  const gradients = [
    'from-orange-500/10 via-amber-500/5 to-transparent border-orange-200 dark:border-orange-900/50',
    'from-amber-500/10 via-yellow-500/5 to-transparent border-amber-200 dark:border-amber-900/50',
    'from-teal-500/10 via-emerald-500/5 to-transparent border-teal-200 dark:border-teal-900/50',
    'from-purple-500/10 via-indigo-500/5 to-transparent border-purple-200 dark:border-purple-900/50'
  ];

  return (
    <section id="features" className="py-32 md:py-44 relative bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div data-anim className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>{t('features.tag')}</span>
          </div>

          <h2 data-anim className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('features.title')}
          </h2>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(items) && items.map((feature, idx) => (
            <div
              key={feature.id || idx}
              data-anim
              className={`relative rounded-3xl p-8 bg-gradient-to-br ${gradients[idx % gradients.length]} bg-white dark:bg-slate-900/80 border shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="space-y-5">
                
                {/* Top Badge & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-3d border border-slate-200/60 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    {iconsMap[feature.id] || <Sparkles className="w-8 h-8 text-brand-500" />}
                  </div>
                  
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-extrabold border border-slate-200 dark:border-slate-700">
                    {feature.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Bullet Highlights */}
                <ul className="space-y-2.5 pt-2">
                  {feature.bullets && feature.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Link inside block */}
              <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>{t('hero.secondaryCta')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
