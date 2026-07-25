import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download, ShieldCheck, Heart,
  Activity, Calendar, CheckCircle2, ChevronRight
} from 'lucide-react';
import { gsap, useGSAP, prefersReduced, useTilt, Words } from '../lib/motion';

export const Hero = () => {
  const { t, apkInfo, downloadApk, downloading, downloadProgress } = useApp();
  const root = useRef(null);
  const parallaxRef = useRef(null);
  const tiltRef = useTilt(11);

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
                <Words
                  text={t('hero.titleHighlight')}
                  className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent"
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

          {/* Cột mockup điện thoại */}
          <div ref={parallaxRef} className="lg:col-span-5 flex justify-center perspective-1000">
            <div
              ref={tiltRef}
              data-hero-phone
              className="relative w-full max-w-[340px] sm:max-w-[380px] cursor-pointer transform-style-3d group will-change-transform"
            >
              <div className="relative rounded-[40px] p-4 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl border-4 border-slate-700/80 shadow-brand-500/20">

                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="relative bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 rounded-[32px] overflow-hidden pt-8 pb-6 px-4 space-y-4 border border-amber-200/50 dark:border-slate-800 min-h-[560px] flex flex-col justify-between">

                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 px-2 pt-2">
                    <span>09:41</span>
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                      <span>IPIF App</span>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/60 dark:border-slate-700 shadow-lg text-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      ● LIVE PET
                    </div>

                    <div className="relative w-28 h-28 mx-auto my-2 rounded-full bg-gradient-to-tr from-orange-400 via-amber-300 to-amber-200 flex items-center justify-center text-6xl shadow-inner animate-float-slow">
                      🐕
                      <div className="absolute -bottom-1 right-0 bg-white dark:bg-slate-700 p-1.5 rounded-full shadow">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-ping" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">
                        Mochi — Golden Cún
                      </h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        {t('hero.mockupStatus')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left pt-1">
                      <div className="bg-amber-100/60 dark:bg-slate-900/60 p-2 rounded-xl text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">Tâm trạng:</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200">😄 98% Vui</p>
                      </div>
                      <div className="bg-orange-100/60 dark:bg-slate-900/60 p-2 rounded-xl text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">Chi phí mô phỏng:</span>
                        <p className="font-bold text-brand-600 dark:text-brand-400">1.2M đ/tháng</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 dark:border-slate-700 shadow flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-300">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {t('hero.mockupNextVaccine')}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Phòng khám thú y Bệnh viện Pet Care
                      </p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  </div>

                  <div className="grid grid-cols-4 text-center py-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <div className="text-brand-500">🏠 Home</div>
                    <div>🐾 Pet Ảo</div>
                    <div>📚 Learn</div>
                    <div>🩺 Medical</div>
                  </div>

                </div>
              </div>

              <div
                data-hero-badge
                className="absolute -top-4 -left-6 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-3d border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 text-left animate-float-fast z-30"
              >
                <div className="p-2 rounded-xl bg-orange-100 text-orange-600 text-xl">✨</div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-white">Thú Cưng Ảo</p>
                  <p className="text-[10px] text-slate-500">Mô phỏng chi phí thật</p>
                </div>
              </div>

              <div
                data-hero-badge
                className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-3d border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 text-left animate-float-slow z-30"
              >
                <div className="p-2 rounded-xl bg-teal-100 text-teal-600 text-xl">🩺</div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-white">Hồ Sơ Thú Y</p>
                  <p className="text-[10px] text-slate-500">Tự động nhắc lịch</p>
                </div>
              </div>

            </div>
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
