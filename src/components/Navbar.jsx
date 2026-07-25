import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, Moon, Globe, Download, ShieldCheck, 
  Settings, Menu, X, Sparkles, Heart 
} from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLang, t, theme, toggleTheme, apkInfo, downloadApk, downloading, setIsAdminOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 dark:bg-[#0b0f19]/85 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-800/50' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with 3D Badge */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-500 via-orange-400 to-amber-300 flex items-center justify-center text-white text-2xl shadow-3d-orange transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                IPIF
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-700/50">
                {t('nav.badge')}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Pet Care Ecosystem
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/50 shadow-inner">
          <a 
            href="#problems" 
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            {t('nav.problems')}
          </a>
          <a
            href="#story"
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            {t('nav.story')}
          </a>
          <a
            href="#features"
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            {t('nav.features')}
          </a>
          <a 
            href="#virtual-pet" 
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            {t('nav.virtualPet')}
          </a>
          <a 
            href="#pricing" 
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            {t('nav.pricing')}
          </a>
          <a 
            href="#apk-hub" 
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-brand-500" />
            {t('nav.apkHub')}
          </a>
        </nav>

        {/* Right Controls: i18n, Dark Mode, Admin, Download CTA */}
        <div className="flex items-center gap-2.5">
          
          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            title="Switch Language / Đổi Ngôn Ngữ"
          >
            <Globe className="w-3.5 h-3.5 text-brand-500" />
            <span>{lang === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Admin APK Trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm hidden lg:block"
            title={t('nav.adminUpload')}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Primary APK Download Action CTA */}
          <button
            onClick={downloadApk}
            disabled={downloading}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 shadow-3d-orange active:translate-y-1 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 animate-bounce-subtle" />
            <span>{downloading ? 'Downloading...' : t('nav.downloadBtn')}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 md:hidden border border-slate-200 dark:border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-4 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col gap-3">
          <a 
            href="#problems" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t('nav.problems')}
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t('nav.features')}
          </a>
          <a 
            href="#virtual-pet" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t('nav.virtualPet')}
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t('nav.pricing')}
          </a>
          <a 
            href="#apk-hub" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-brand-500" />
            {t('nav.apkHub')}
          </a>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => { setIsAdminOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand-500"
            >
              <Settings className="w-4 h-4" />
              {t('nav.adminUpload')}
            </button>
            
            <button
              onClick={() => { downloadApk(); setMobileMenuOpen(false); }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-500 shadow-3d-orange"
            >
              {t('nav.downloadBtn')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
