import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Download, ShieldCheck, ChevronRight } from 'lucide-react';
import { gsap, useGSAP, prefersReduced, Words } from '../lib/motion';
import { PhoneMockup } from './PhoneMockup';

export const Hero = () => {
  const { t, apkInfo, downloadApk, downloading, downloadProgress } = useApp();
  const root = useRef(null);
  const parallaxRef = useRef(null);

  useGSAP(() => {
    if (prefersReduced) return;

    // fromTo khắp nơi: StrictMode chạy effect 2 lần, `from` sẽ khoá phần tử ở
    // trạng thái ẩn vì lần chạy thứ hai chụp opacity 0 làm giá trị đích.
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('[data-hero-kicker]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo('[data-hero-rule]', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 1.1 }, '<0.1')
      .fromTo('[data-hero-word]', { yPercent: 115 }, { yPercent: 0, duration: 1.15, stagger: 0.035 }, '<0.15')
      .fromTo('[data-hero-body]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, '-=0.7')
      .fromTo('[data-hero-phone]', { opacity: 0, y: 70, rotationY: -14, scale: 0.94 }, { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 1.5 }, '-=1.2')
      .fromTo('[data-hero-badge]', { opacity: 0, scale: 0.7, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.14 }, '-=0.8');

    // Trôi nhẹ theo cuộn để hero không "chết cứng"
    gsap.to(parallaxRef.current, {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
    gsap.to('[data-hero-glow]', {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }, { scope: root });

  return (
    <section
      ref={root}
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-grid-pattern"
    >
      {/* Ánh sáng môi trường */}
      <div data-hero-glow className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[46rem] rounded-full bg-gradient-to-tr from-brand-400/25 via-orange-300/10 to-teal-400/20 blur-[130px]" />
        <div className="absolute top-1/3 right-4 w-80 h-80 rounded-full bg-petpurple-500/15 blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">

          {/* Cột chữ */}
          <div className="lg:col-span-7 text-center lg:text-left">

            <p
              data-hero-kicker
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400"
            >
              {t('hero.kicker')}
            </p>
            <div
              data-hero-rule
              className="mt-4 mb-8 h-px w-32 mx-auto lg:mx-0 bg-gradient-to-r from-brand-500 to-transparent"
            />

            <h1
              className="max-w-4xl mx-auto lg:mx-0 font-extrabold tracking-tight text-slate-900 dark:text-white"
              style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)', lineHeight: 1.14 }}
            >
              <Words text={t('hero.titlePart1')} />
              <span className="relative inline-block">
                {/* Gradient phải nằm trên chính span bị GSAP transform.
                    Đặt ở span cha thì `background-clip: text` không vẽ xuyên
                    qua con có transform/overflow-hidden -> chữ trong suốt,
                    mất hút ở cả light lẫn dark mode. */}
                <Words
                  text={t('hero.titleHighlight')}
                  wordClass="bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 dark:from-amber-300 dark:via-orange-300 dark:to-amber-200 bg-clip-text text-transparent"
                />
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3 text-brand-500/40"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
              <Words text={t('hero.titlePart2')} />
            </h1>

            <p
              data-hero-body
              className="mt-8 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('hero.description')}
            </p>

            <div data-hero-body className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={downloadApk}
                disabled={downloading}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-base shadow-3d-orange active:translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{downloading ? t('apkHub.downloading') + `${downloadProgress}%` : t('hero.primaryCta')}</span>
              </button>

              <a
                href="#story"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-base border-2 border-slate-200 dark:border-slate-700 shadow-3d active:translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>{t('hero.secondaryCta')}</span>
                <ChevronRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {downloading && (
              <div className="mt-6 w-full max-w-md mx-auto lg:mx-0 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-brand-500 to-teal-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            )}

            <div
              data-hero-body
              className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{apkInfo.version} ({apkInfo.fileSize}) • {t('hero.verBadge')}</span>
            </div>
          </div>

          {/* Cột mockup điện thoại — bố cục 3 màn theo LAYOUT_THREE_PAGES.md */}
          <div ref={parallaxRef} className="lg:col-span-5 flex justify-center perspective-1000">
            <PhoneMockup />
          </div>

        </div>
      </div>
    </section>
  );
};

/** Dải tin cậy chạy vô tận — số liệu tách khỏi hero cho hero thở. */
export const TrustStrip = () => {
  const { t } = useApp();

  const items = [
    `${t('hero.statUsers')} ${t('hero.statUsersLabel')}`,
    `${t('hero.statRating')} ${t('hero.statRatingLabel')}`,
    `${t('hero.statClinics')} ${t('hero.statClinicsLabel')}`,
    t('hero.verBadge'),
  ];
  const loop = [...items, ...items, ...items];

  return (
    <div className="relative border-y border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm py-5 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-[#0b0f19] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-[#0b0f19] to-transparent" />

      <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
        {loop.map((label, i) => (
          <span key={i} className="flex items-center gap-12 text-sm font-bold text-slate-500 dark:text-slate-400">
            {label}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500/70" />
          </span>
        ))}
      </div>
    </div>
  );
};
