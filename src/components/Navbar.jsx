import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Globe, Download, Settings, Menu, X } from 'lucide-react';
import { gsap, useGSAP } from '../lib/motion';

/** Xếp theo đúng thứ tự section trong trang để viên trượt chạy một chiều. */
const NAV_LINKS = [
  { id: 'problems',    key: 'nav.problems' },
  { id: 'story',       key: 'nav.story' },
  { id: 'virtual-pet', key: 'nav.virtualPet' },
  { id: 'features',    key: 'nav.features' },
  { id: 'pricing',     key: 'nav.pricing' },
  { id: 'apk-hub',     key: 'nav.apkHub', icon: Download },
];

export const Navbar = () => {
  const { lang, toggleLang, t, theme, toggleTheme, downloadApk, downloading, setIsAdminOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState(null);

  const navRef = useRef(null);
  const pillRef = useRef(null);
  // Bấm một mục -> Lenis cuộn ~1.5s và đi xuyên qua mọi section giữa đường.
  // Không khoá thì spy nhắm lại viên trượt 4-5 lần trong một cú bấm nên nó
  // khựng, và chỉ khựng khi cuộn xuống vì lúc đó các section mới còn phải chạy
  // animation reveal. Khoá cho tới khi cuộn tới đích.
  const lock = useRef({ id: null, until: 0 });

  // Scroll spy: section nào có đỉnh vừa trôi qua vạch 150px thì đang được đọc
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Lấy section có đỉnh gần vạch nhất, đo bằng vị trí thật trong trang chứ
      // không dựa vào thứ tự khai báo — hai thứ tự đó có thể lệch nhau.
      const probe = window.scrollY + 150;
      let current = null;
      let bestTop = -Infinity;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe && top > bestTop) {
          bestTop = top;
          current = link.id;
        }
      }
      // Sát đáy trang thì khoá vào mục cuối, tránh mục cuối không bao giờ sáng
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = NAV_LINKS[NAV_LINKS.length - 1].id;
      }

      // Đang trong cú bấm: bỏ qua mọi section trung gian, mở khoá ngay khi tới
      // đích (hoặc khi hết hạn, phòng trường hợp người dùng cuộn tay chen vào).
      if (lock.current.id) {
        if (current === lock.current.id || Date.now() > lock.current.until) {
          lock.current = { id: null, until: 0 };
        }
        return;
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Viên trượt chạy tới mục đang active. Đo lại khi đổi ngôn ngữ (chữ dài khác)
  useGSAP(() => {
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;

    const target = active ? nav.querySelector(`[data-nav="${active}"]`) : null;
    if (!target) {
      gsap.to(pill, { opacity: 0, duration: 0.25 });
      return;
    }

    const navBox = nav.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    gsap.to(pill, {
      x: box.left - navBox.left,
      width: box.width,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    // KHÔNG đưa `scrolled` vào deps: header đổi padding ngay đầu cú cuộn, tween
    // bị dựng lại giữa đường. Hình học đo tương đối với nav nên không cần.
  }, { dependencies: [active, lang] });

  /** Bấm một mục: nhắm viên trượt tới đó một lần rồi khoá spy cho tới khi cuộn xong. */
  const goTo = (id) => {
    lock.current = { id, until: Date.now() + 2200 };
    setActive(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/80 dark:bg-[#0b0f19]/85 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-800/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">

        {/* Brand Logo with 3D Badge */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-500 via-orange-400 to-amber-300 flex items-center justify-center text-white text-2xl shadow-3d-orange transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                IPIF
              </span>
              {/* Badge chỉ hiện khi còn chỗ, nếu không nó ép nav xuống hàng */}
              <span className="hidden xl:inline-block whitespace-nowrap text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-700/50">
                {t('nav.badge')}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Pet Care Ecosystem
            </p>
          </div>
        </a>

        {/* Desktop Navigation — chữ không xuống hàng, viên trượt chỉ mục đang xem */}
        <nav
          ref={navRef}
          className="relative hidden lg:flex items-center gap-0.5 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/50 shadow-inner"
        >
          <span
            ref={pillRef}
            aria-hidden
            className="absolute top-1.5 bottom-1.5 left-0 w-0 rounded-full bg-white dark:bg-slate-700 shadow-sm opacity-0 pointer-events-none"
          />
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-nav={link.id}
                onClick={() => goTo(link.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5 text-brand-500" />}
                {t(link.key)}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: i18n, Dark Mode, Admin, Download CTA */}
        <div className="flex items-center gap-2.5 shrink-0">

          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
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
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm hidden xl:block"
            title={t('nav.adminUpload')}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Primary APK Download Action CTA */}
          <button
            onClick={downloadApk}
            disabled={downloading}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap text-white bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 shadow-3d-orange active:translate-y-1 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 animate-bounce-subtle" />
            {/* Ở khoảng lg (nav đầy đủ + logo) chỉ còn chỗ cho icon, nếu để cả
                nhãn thì nút bị đẩy tràn khỏi mép phải. */}
            <span className="lg:hidden xl:inline">
              {downloading ? 'Downloading...' : t('nav.downloadBtn')}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 lg:hidden border border-slate-200 dark:border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-2 pb-4 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => { goTo(link.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 border-l-4 border-brand-500'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4 text-brand-500" />}
                {t(link.key)}
              </a>
            );
          })}

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
