import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Send, Globe, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-md">
                🐾
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                IPIF Ecosystem
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#problems" className="hover:text-brand-400 transition-colors">{t('nav.problems')}</a></li>
              <li><a href="#features" className="hover:text-brand-400 transition-colors">{t('nav.features')}</a></li>
              <li><a href="#virtual-pet" className="hover:text-brand-400 transition-colors">{t('nav.virtualPet')}</a></li>
              <li><a href="#pricing" className="hover:text-brand-400 transition-colors">{t('nav.pricing')}</a></li>
              <li><a href="#apk-hub" className="hover:text-brand-400 transition-colors">{t('nav.apkHub')}</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Đăng ký nhận tin
            </h4>
            <p className="text-xs text-slate-400">
              Nhận thông báo cập nhật tính năng mới & mẹo chăm sóc thú cưng hàng tuần.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-brand-500"
              />
              <button className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs font-semibold text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">{t('footer.privacy')}</a>
            <span>•</span>
            <a href="#" className="hover:underline">{t('footer.terms')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
