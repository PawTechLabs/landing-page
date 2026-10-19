import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Download, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const PlayStoreNoticeModal = () => {
  const { 
    t, 
    isPlayStoreNoticeOpen, 
    setIsPlayStoreNoticeOpen, 
    downloadApk, 
    downloading, 
    downloadProgress,
    apkInfo 
  } = useApp();

  if (!isPlayStoreNoticeOpen) return null;

  const handleDownload = () => {
    downloadApk();
    // Keep modal open momentarily or close after brief delay
    setTimeout(() => {
      setIsPlayStoreNoticeOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsPlayStoreNoticeOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Icon & Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 via-orange-400 to-amber-300 flex items-center justify-center text-white shadow-3d-orange">
              {/* Google Play Vector */}
              <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186A2.215 2.215 0 0 1 3 20.615V3.385c0-.624.234-1.2.609-1.571z" fill="#00C1A6"/>
                <path d="M3.61 1.814c.353-.353.9-.408 1.434-.1l12.136 7.001-3.388 3.286L3.61 1.814z" fill="#00A2FF"/>
                <path d="M17.18 8.613l-3.388 3.388-3.387-3.388 6.775-3.912c.484-.279.99-.214 1.344.086l-1.344 3.826z" fill="#FFD400"/>
                <path d="M17.18 15.388l1.344 3.826c-.354.3-.86.365-1.344.086l-6.775-3.912 3.387-3.388 3.388 3.388z" fill="#FF3333"/>
                <path d="M3.61 22.186l10.182-10.187 3.388 3.388L5.044 22.388c-.534.308-1.08.253-1.434-.102z" fill="#00D664"/>
              </svg>
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-500 text-white shadow-sm">
              <Clock className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('playStore.statusReviewing')}</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t('playStore.noticeTitle')}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('playStore.noticeDesc')}
          </p>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Phiên bản hiện tại:</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">{apkInfo.version}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Dung lượng file:</span>
            <span className="font-bold">{apkInfo.fileSize}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Đã kiểm định bảo mật OWASP, an toàn tuyệt đối.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-3d-orange active:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2.5 group"
          >
            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{downloading ? `Đang tải... ${downloadProgress}%` : t('playStore.downloadApkNow')}</span>
          </button>

          <button
            onClick={() => setIsPlayStoreNoticeOpen(false)}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            {t('playStore.closeBtn')}
          </button>
        </div>

      </div>
    </div>
  );
};
