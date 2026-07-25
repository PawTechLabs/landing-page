import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Check, X, ShieldCheck } from 'lucide-react';

export const DifferenceSection = () => {
  const { t } = useApp();

  const rows = t('difference.rows');

  return (
    <section className="py-32 md:py-40 relative bg-slate-50 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div data-anim className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>{t('difference.tag')}</span>
          </div>

          <h2 data-anim className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('difference.title')}
          </h2>
        </div>

        {/* Comparison Matrix Table */}
        <div data-anim className="clay-card p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-4 text-base font-extrabold text-slate-800 dark:text-slate-200 w-1/4">
                    Tiêu chí phân tích
                  </th>
                  <th className="py-4 px-4 text-base font-extrabold text-slate-400 dark:text-slate-500 w-1/3">
                    ❌ {t('difference.traditionalTitle')}
                  </th>
                  <th className="py-4 px-4 text-base font-extrabold text-brand-600 dark:text-brand-400 bg-brand-50/60 dark:bg-brand-950/40 rounded-t-2xl w-5/12">
                    ✨ {t('difference.ipifTitle')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
                {Array.isArray(rows) && rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-5 px-4 font-bold text-sm text-slate-800 dark:text-slate-200">
                      {row.aspect}
                    </td>
                    <td className="py-5 px-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white bg-brand-50/40 dark:bg-brand-950/20">
                      <div className="flex items-start gap-2 text-brand-700 dark:text-brand-300">
                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0 mt-0.5" />
                        <span>{row.ipif}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
