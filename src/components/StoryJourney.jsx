import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { gsap, ScrollTrigger, useGSAP, prefersReduced, toggleOnScroll, ScrubText } from '../lib/motion';

/** Cầu nối giữa hai chương: từng chữ sáng dần theo tiến độ cuộn. */
export const ChapterBreak = ({ textKey }) => {
  const { t } = useApp();
  return (
    <section className="relative py-32 md:py-48 bg-white dark:bg-[#0b0f19] overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-brand-500/50" />
      <div className="max-w-5xl mx-auto px-6">
        <ScrubText
          text={t(textKey)}
          className="text-2xl sm:text-4xl lg:text-[2.9rem] font-extrabold leading-[1.35] tracking-tight text-center text-slate-900 dark:text-white"
        />
      </div>
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-brand-500/50" />
    </section>
  );
};

export const StoryJourney = () => {
  const { t } = useApp();
  const chapters = t('story.chapters');
  const root = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    if (!Array.isArray(chapters) || !chapters.length) return;

    const cards = gsap.utils.toArray('[data-chapter]', root.current);

    // Từng chương bung ra khi tới, thu lại khi cuộn ngược xuống dưới viewport.
    // Dùng IntersectionObserver chứ không ScrollTrigger (xem ghi chú
    // revealOnEnter về StrictMode mount kép).
    const cleanups = [];
    cards.forEach((card, i) => {
      if (!prefersReduced) {
        cleanups.push(
          toggleOnScroll(
            card,
            card,
            { opacity: 0, y: 90, scale: 0.94, duration: 0.55, ease: 'power2.in' },
            { opacity: 1, y: 0, scale: 1, duration: 1.2 }
          )
        );
      }
      ScrollTrigger.create({
        trigger: card,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => self.isActive && setActive(i),
      });
    });

    // Thanh tiến độ câu chuyện. Trigger là cả section, KHÔNG phải thanh ray —
    // ray nằm trong cột sticky nên vị trí của nó đo ra sẽ sai.
    gsap.fromTo(
      barRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: { trigger: root.current, start: 'top 55%', end: 'bottom 85%', scrub: 0.5 },
      }
    );

    // Cột trái ghim bằng position:sticky (CSS thuần), không dùng ScrollTrigger
    // pin — pinSpacing:false tính sai vị trí khi cuộn ngược lên.
    return () => cleanups.forEach((fn) => fn());
  }, { scope: root, dependencies: [chapters] });

  if (!Array.isArray(chapters)) return null;

  return (
    <section
      id="story"
      ref={root}
      className="relative py-32 md:py-48 overflow-clip bg-slate-950 text-white"
    >
      {/* Nền: ánh sáng môi trường + hạt lưới.
          overflow-clip chứ không hidden — hidden tạo scroll container và làm
          chết position:sticky của cột trái. */}
      <div className="pointer-events-none absolute inset-0 overflow-clip opacity-[0.55]">
        <div className="absolute -top-40 left-1/4 w-[42rem] h-[42rem] rounded-full bg-brand-600/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full bg-petpurple-600/20 blur-[130px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">

          {/* Cột trái được ghim */}
          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-400">
              {t('story.kicker')}
            </p>

            <h2 className="max-w-xl text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.05] tracking-tight">
              {t('story.title')}
            </h2>

            <p className="max-w-md text-base sm:text-lg text-slate-400 leading-relaxed">
              {t('story.lead')}
            </p>

            <div className="flex items-stretch gap-5 pt-4">
              <div className="relative w-[3px] rounded-full bg-white/10 min-h-[140px]">
                <div
                  ref={barRef}
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-400 via-amber-400 to-teal-400"
                />
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {t('story.progressLabel')}
                </p>
                {chapters.map((c, i) => (
                  <p
                    key={i}
                    className={`text-sm font-bold transition-all duration-500 ${
                      i === active
                        ? 'text-white translate-x-1'
                        : 'text-slate-600'
                    }`}
                  >
                    {c.day} — {c.title}
                  </p>
                ))}
              </div>
            </div>
          </aside>

          {/* Cột phải: các chương cuộn qua */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            {chapters.map((c, i) => (
              <article
                key={i}
                data-chapter
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10 will-change-transform"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.accent} opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <span className="inline-block text-[11px] font-black uppercase tracking-[0.24em] text-brand-400">
                      {c.day}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
                      {c.body}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-2xl sm:text-3xl font-black bg-gradient-to-br ${c.accent} bg-clip-text text-transparent`}
                    >
                      {c.stat}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-500 max-w-[9rem] leading-snug mt-1">
                      {c.statLabel}
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-24 -right-16 w-56 h-56 rounded-full bg-white/[0.04] blur-2xl group-hover:bg-white/[0.07] transition-colors duration-700" />
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
