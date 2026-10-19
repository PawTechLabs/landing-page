import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ExternalLink } from 'lucide-react';

export const GooglePlayBadge = ({ 
  variant = 'hero', 
  className = '',
  showBadge = true 
}) => {
  const { t, playStoreUrl, setIsPlayStoreNoticeOpen } = useApp();

  const isLive = Boolean(playStoreUrl && playStoreUrl.trim());

  const handleClick = (e) => {
    if (isLive) {
      // Đã có link -> mở trang Google Play Store
      window.open(playStoreUrl.trim(), '_blank', 'noopener,noreferrer');
    } else {
      // Chưa có link -> mở popup giải thích thân thiện & hướng dẫn tải APK
      e.preventDefault();
      setIsPlayStoreNoticeOpen(true);
    }
  };

  // Google Play Official 4-Color Triangle Vector
  const GooglePlayIcon = ({ className: iconClass = "w-6 h-6" }) => (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.609 1.814L13.792 12 3.61 22.186A2.215 2.215 0 0 1 3 20.615V3.385c0-.624.234-1.2.609-1.571z" fill="#00C1A6"/>
      <path d="M3.61 1.814c.353-.353.9-.408 1.434-.1l12.136 7.001-3.388 3.286L3.61 1.814z" fill="#00A2FF"/>
      <path d="M17.18 8.613l-3.388 3.388-3.387-3.388 6.775-3.912c.484-.279.99-.214 1.344.086l-1.344 3.826z" fill="#FFD400"/>
      <path d="M17.18 15.388l1.344 3.826c-.354.3-.86.365-1.344.086l-6.775-3.912 3.387-3.388 3.388 3.388z" fill="#FF3333"/>
      <path d="M3.61 22.186l10.182-10.187 3.388 3.388L5.044 22.388c-.534.308-1.08.253-1.434-.102z" fill="#00D664"/>
    </svg>
  );

  // Variant: Hero CTA button
  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        type="button"
        className={`relative w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-950 dark:bg-slate-800 dark:hover:bg-slate-700/90 text-white font-sans border-2 border-slate-700/80 dark:border-slate-600/80 shadow-3d active:translate-y-1 transition-all duration-300 flex items-center justify-center gap-3.5 group hover:-translate-y-1 ${className}`}
        title={isLive ? "Mở Google Play Store" : "Google Play Store (Đang kiểm duyệt)"}
      >
        <GooglePlayIcon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
        
        <div className="text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {isLive ? t('playStore.badgeGet') : t('playStore.badgePre')}
            </span>
            {showBadge && !isLive && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-extrabold border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {t('playStore.statusComing')}
              </span>
            )}
          </div>
          <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
            <span>{t('playStore.storeName')}</span>
            {isLive && <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
          </div>
        </div>
      </button>
    );
  }

  // Variant: Card in APK Hub Section
  if (variant === 'card') {
    return (
      <div 
        onClick={handleClick}
        className={`cursor-pointer group p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-2 border-slate-700/70 hover:border-brand-500/60 shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 shadow-inner group-hover:scale-105 transition-transform">
              <GooglePlayIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isLive ? t('playStore.badgeGet') : t('playStore.badgePre')}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                  isLive 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                  {isLive ? 'Sẵn sàng' : t('playStore.statusReviewing')}
                </span>
              </div>
              <p className="text-lg font-black text-white mt-0.5">{t('playStore.storeName')}</p>
            </div>
          </div>
          
          <div className="p-2 rounded-xl bg-slate-800/80 group-hover:bg-brand-500 text-slate-400 group-hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-300/90 leading-relaxed">
          {isLive 
            ? "Tải bản chính thức trực tiếp từ Google Play Store để nhận tự động cập nhật phiên bản mới."
            : "Bản phát hành đang được Google kiểm duyệt. Bạn có thể bấm vào đây để xem chi tiết hoặc dùng bản APK trực tiếp."}
        </p>
      </div>
    );
  }

  // Variant: Compact / Footer
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-left transition-all duration-200 group ${className}`}
    >
      <GooglePlayIcon className="w-5 h-5 shrink-0 group-hover:scale-105 transition-transform" />
      <div className="leading-tight">
        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
          {isLive ? t('playStore.badgeGet') : t('playStore.badgePre')}
        </span>
        <span className="block text-xs font-black text-white">
          {t('playStore.storeName')}
        </span>
      </div>
    </button>
  );
};
