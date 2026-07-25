import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Check, Download, Zap, Star } from 'lucide-react';

export const PricingSection = () => {
  const { t, downloadApk } = useApp();

  const freeFeatures = t('pricing.freeFeatures');
  const premiumFeatures = t('pricing.premiumFeatures');

  return (
    <section id="pricing" className="py-24 relative bg-slate-100/70 dark:bg-slate-900/70 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{t('pricing.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('pricing.title')}
          </h2>
        </div>

        {/* 2 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* FREE PLAN CARD */}
          <div className="clay-card p-8 flex flex-col justify-between space-y-8 relative">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Miễn phí
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                  {t('pricing.freeTitle')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('pricing.freeDesc')}
                </p>
              </div>

              <div className="flex items-baseline gap-2 border-b border-slate-200 dark:border-slate-700 pb-6">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {t('pricing.freePrice')}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  / {t('pricing.freePeriod')}
                </span>
              </div>

              <ul className="space-y-3">
                {Array.isArray(freeFeatures) && freeFeatures.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={downloadApk}
              className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-extrabold text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-md"
            >
              {t('pricing.freeCta')}
            </button>
          </div>

          {/* PREMIUM PLAN CARD */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-b from-brand-500 via-orange-500 to-amber-600 text-white shadow-3d-orange flex flex-col justify-between space-y-8 transform lg:-translate-y-2 border-4 border-amber-300/40">
            
            {/* Popular Badge */}
            <div className="absolute -top-4 right-8 bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>{t('pricing.popularBadge')}</span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-wider backdrop-blur-md">
                  Gói Premium Chuyên Nghiệp
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">
                  {t('pricing.premiumTitle')}
                </h3>
                <p className="text-xs text-orange-100 mt-1">
                  {t('pricing.premiumDesc')}
                </p>
              </div>

              <div className="flex items-baseline gap-2 border-b border-white/20 pb-6">
                <span className="text-5xl font-black text-white">
                  {t('pricing.premiumPrice')}
                </span>
                <span className="text-sm font-bold text-orange-100">
                  {t('pricing.premiumPeriod')}
                </span>
              </div>

              <ul className="space-y-3">
                {Array.isArray(premiumFeatures) && premiumFeatures.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-white">
                    <div className="w-5 h-5 rounded-full bg-white text-brand-600 flex items-center justify-center shrink-0 shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={downloadApk}
              className="w-full py-4 rounded-2xl bg-white text-brand-600 hover:bg-orange-50 font-extrabold text-sm transition-all shadow-xl active:translate-y-1"
            >
              {t('pricing.premiumCta')}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
