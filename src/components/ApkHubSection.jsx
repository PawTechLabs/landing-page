import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Download, ShieldCheck, FileCheck, Calendar, HardDrive, 
  Settings, CheckCircle2, AlertCircle, Smartphone, Hash, Sparkles
} from 'lucide-react';

export const ApkHubSection = () => {
  const { t, apkInfo, downloadApk, downloading, downloadProgress, setIsAdminOpen } = useApp();

  const steps = t('apkHub.steps');

  return (
    <section id="apk-hub" className="py-24 relative bg-gradient-to-b from-white via-orange-50/40 to-slate-100 dark:from-[#0b0f19] dark:via-slate-900/90 dark:to-slate-950 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-emerald-500" />
            <span>{t('apkHub.tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('apkHub.title')}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t('apkHub.subtitle')}
          </p>
        </div>

        {/* APK Card Dashboard */}
        <div className="clay-card p-6 sm:p-10 max-w-4xl mx-auto space-y-8 shadow-2xl relative">
          
          {/* Top Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-inner">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{t('apkHub.versionLabel')}</span>
              <p className="text-sm font-extrabold text-brand-600 dark:text-brand-400">{apkInfo.version}</p>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{t('apkHub.sizeLabel')}</span>
              <p className="text-sm font-extrabold text-slate-800 dark:text-white">{apkInfo.fileSize}</p>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{t('apkHub.dateLabel')}</span>
              <p className="text-sm font-extrabold text-slate-800 dark:text-white">{apkInfo.releaseDate}</p>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{t('apkHub.downloadCountLabel')}</span>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{apkInfo.totalDownloads.toLocaleString()} lượt</p>
            </div>
          </div>

          {/* Download Button Action Zone */}
          <div className="text-center space-y-4 pt-2">
            
            <button
              onClick={downloadApk}
              disabled={downloading}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-black text-lg shadow-3d-orange active:translate-y-1 transition-all duration-200 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <Download className="w-6 h-6 animate-bounce-subtle" />
              <span>{downloading ? t('apkHub.downloading') + `${downloadProgress}%` : t('apkHub.downloadBtn')}</span>
            </button>

            {downloading && (
              <div className="w-full max-w-md mx-auto bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-brand-500 via-orange-400 to-emerald-400 h-full transition-all duration-300 ease-out" 
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>File name: {apkInfo.fileName}</span>
            </div>
          </div>

          {/* Changelog & SHA256 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            
            {/* Changelog */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-brand-500" />
                {t('apkHub.changelogTitle')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                {apkInfo.changelog}
              </p>
            </div>

            {/* Verification details */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Kiểm duyệt & An toàn Virus:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ứng dụng IPIF đã vượt qua kiểm tra bảo mật OWASP API, không chứa quảng cáo ẩn hay mã độc.
              </p>
              <div className="bg-slate-100 dark:bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                <span className="font-bold text-slate-700 dark:text-slate-300">SHA-256:</span> {apkInfo.sha256}
              </div>
            </div>

          </div>

          {/* Android Installation Guide */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-4">
            <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-600" />
              {t('apkHub.guideTitle')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {Array.isArray(steps) && steps.map((step, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-100 dark:border-slate-800 space-y-1.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Upload Trigger Button */}
          <div className="pt-2 text-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 font-extrabold text-xs transition-all border border-slate-300 dark:border-slate-700"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>{t('apkHub.adminTriggerBtn')}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
