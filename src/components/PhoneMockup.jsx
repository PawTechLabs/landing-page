import React, { useRef, useState } from 'react';
import {
  Activity, Bell, FileDown, TrendingUp, ChevronRight, ChevronLeft,
  CheckCircle2, Clock, Plus, Image as ImageIcon, MoreHorizontal,
  Sparkles, Stethoscope, Syringe, Bug, Pill, ClipboardList, Utensils,
} from 'lucide-react';
import { gsap, useGSAP, prefersReduced, useTilt } from '../lib/motion';
import { PetSprite } from './PetSprite';

/**
 * Mockup điện thoại của hero, dựng theo LAYOUT_THREE_PAGES.md.
 *
 * Ba màn:
 *  - health  : §1 Health Của Thú Cưng Thật
 *  - medical : §2 Hồ Sơ Y Tế & Lịch Sử
 *  - virtual : §3 Nuôi Thú Ảo (layered draggable sheet)
 *
 * Hai badge nổi ở hai góc và tab bar dưới đáy đều chuyển màn — bấm lại badge
 * đang active thì quay về màn Health (Home) theo đúng navigation flow §4.
 */

const TABS = [
  { id: 'health',  icon: '🏠', label: 'Sức khỏe' },
  { id: 'virtual', icon: '🐾', label: 'Pet Ảo' },
  { id: 'medical', icon: '🩺', label: 'Hồ sơ' },
];

const card =
  'bg-white/85 dark:bg-slate-800/80 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow';

/* ───────────────────────── §1 Health Dashboard ───────────────────────── */

const PETS = [
  { emoji: '🐕', name: 'Mochi', alert: true },
  { emoji: '🐈', name: 'Luna', alert: false },
  { emoji: '🐰', name: 'Bơ', alert: false },
];

const METRICS = [
  { icon: Bug,           title: 'Tẩy giun',    l1: 'Gần nhất: 10/06/2026', l2: 'Nhắc lịch: còn 20 ngày', tone: 'text-amber-600 dark:text-amber-400' },
  { icon: Stethoscope,   title: 'Khám thú y',  l1: 'Gần nhất: 20/04/2026', l2: 'ĐK: Thú Y PetCare',      tone: 'text-teal-600 dark:text-teal-400' },
  { icon: Pill,          title: 'Thuốc & đơn', l1: '1 loại đang dùng',     l2: 'Nhắc uống: 20:00 tối nay', tone: 'text-rose-600 dark:text-rose-400' },
  { icon: ClipboardList, title: 'Thể trạng',   l1: 'Cân đối',              l2: 'Ghi chú: dị ứng gà',      tone: 'text-violet-600 dark:text-violet-400' },
];

const HealthScreen = () => (
  <>
    {/* AppBar */}
    <div data-screen-row className="flex items-center justify-between">
      <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Sức khỏe</h4>
      <div className="flex items-center gap-1.5">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[9px] font-extrabold">
          <FileDown className="w-2.5 h-2.5" />Xuất PDF
        </span>
        <span className="relative p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Bell className="w-3 h-3 text-slate-500 dark:text-slate-400" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </span>
      </div>
    </div>

    {/* SECTION 0 — Multi-Pet Selector */}
    <div data-screen-row className="flex items-center gap-2">
      {PETS.map((p, i) => (
        <div key={p.name} className="relative">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg bg-amber-100 dark:bg-slate-800 ${
              i === 0 ? 'ring-2 ring-brand-500 ring-offset-1 ring-offset-transparent' : 'opacity-60'
            }`}
          >
            {p.emoji}
          </div>
          {p.alert && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 border border-white dark:border-slate-900" />
          )}
        </div>
      ))}
      <div className="w-9 h-9 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400">
        <Plus className="w-3.5 h-3.5" />
      </div>
      <div className="ml-1 leading-tight">
        <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-100">Mochi</p>
        <p className="text-[9px] text-slate-500 dark:text-slate-400">Golden · 8 tháng</p>
      </div>
    </div>

    {/* SECTION 1 — Hero Card cân nặng + sparkline */}
    <div data-screen-row className={`${card} p-3 rounded-2xl`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white leading-none">
            3.8 <span className="text-sm font-bold">kg</span>
          </p>
          <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">Cập nhật 2 ngày trước</p>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[9px] font-extrabold">
          <TrendingUp className="w-2.5 h-2.5" />+0.2 kg
        </span>
      </div>

      <svg viewBox="0 0 120 30" preserveAspectRatio="none" className="mt-2 w-full h-7 text-brand-500">
        <polyline
          points="0,24 20,21 40,22 60,15 80,12 100,9 120,4"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="120" cy="4" r="3" fill="currentColor" />
      </svg>

      <div className="mt-1 flex items-center gap-1 text-[9px] font-extrabold text-brand-600 dark:text-brand-400">
        Xem biểu đồ lịch sử chi tiết <ChevronRight className="w-2.5 h-2.5" />
      </div>
    </div>

    {/* SECTION 2 — Timeline tiêm chủng */}
    <div data-screen-row className={`${card} p-3 rounded-2xl`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100">Tiêm chủng</p>
        <span className="text-[9px] font-bold text-brand-600 dark:text-brand-400">Xem tất cả ›</span>
      </div>

      <div className="relative pl-4 space-y-2.5">
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="relative">
          <CheckCircle2 className="absolute -left-4 top-0 w-3 h-3 text-emerald-500 bg-white dark:bg-slate-800 rounded-full" />
          <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">Mũi dại (Rabies)</p>
          <p className="text-[9px] text-slate-500 dark:text-slate-400">Hoàn thành 15/05/2026</p>
        </div>
        <div className="relative">
          <Clock className="absolute -left-4 top-0 w-3 h-3 text-amber-500 bg-white dark:bg-slate-800 rounded-full" />
          <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">Mũi 5 trong 1</p>
          <p className="text-[9px] font-bold text-amber-600 dark:text-amber-400">Sắp tới hạn · còn 5 ngày</p>
        </div>
      </div>
    </div>

    {/* SECTION 3 — Grid chỉ số y tế 2x2 */}
    <div data-screen-row className="grid grid-cols-2 gap-2">
      {METRICS.map((m) => (
        <div key={m.title} className={`${card} p-2.5 rounded-xl`}>
          <div className="flex items-center gap-1.5">
            <m.icon className={`w-3 h-3 ${m.tone}`} />
            <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-100">{m.title}</p>
          </div>
          <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400 leading-snug">{m.l1}</p>
          <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 leading-snug">{m.l2}</p>
        </div>
      ))}
    </div>

    {/* FAB / quick trigger */}
    <div
      data-screen-row
      className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-500 text-white text-[10px] font-extrabold shadow-glow-orange"
    >
      <Plus className="w-3 h-3" />Thêm bản ghi y tế
    </div>
  </>
);

/* ────────────────────── §2 Hồ Sơ Y Tế & Lịch Sử ────────────────────── */

const FILTERS = ['Tất cả', 'Cân nặng', 'Tiêm chủng', 'Khám', 'Thuốc'];
const RANGES = ['1M', '3M', '6M', '1Y'];

const RECORDS = [
  {
    group: 'THÁNG 07, 2026',
    rows: [
      { icon: Syringe, tone: 'text-rose-500', title: 'Tiêm phòng Mũi dại', meta: '15/07/2026 · Thú Y PetCare · BS Nam' },
      { icon: TrendingUp, tone: 'text-emerald-500', title: 'Cân nặng: 3.8 kg (+0.2 kg)', meta: '10/07/2026 · Đo tại nhà' },
    ],
  },
  {
    group: 'THÁNG 06, 2026',
    rows: [
      { icon: Bug, tone: 'text-amber-500', title: 'Tẩy giun định kỳ (Bio-Worm)', meta: '05/06/2026 · Liều 1 viên' },
    ],
  },
];

const MedicalScreen = () => (
  <>
    {/* Header */}
    <div data-screen-row className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <ChevronLeft className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Lịch sử Y tế · Mochi</h4>
      </div>
      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[9px] font-extrabold">
        <FileDown className="w-2.5 h-2.5" />Xuất PDF
      </span>
    </div>

    {/* Filter chips */}
    <div data-screen-row data-lenis-prevent className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      {FILTERS.map((f, i) => (
        <span
          key={f}
          className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold whitespace-nowrap ${
            i === 1
              ? 'bg-brand-500 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {f}
        </span>
      ))}
    </div>

    {/* Interactive line chart */}
    <div data-screen-row className={`${card} p-3 rounded-2xl`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100">Biểu đồ cân nặng</p>
        <div className="flex items-center gap-1">
          {RANGES.map((r) => (
            <span
              key={r}
              className={`px-1.5 py-0.5 rounded-md text-[8px] font-extrabold ${
                r === '3M'
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 200 76" className="mt-2 w-full h-20">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="18" x2="196" y1={10 + i * 18} y2={10 + i * 18}
            stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="1" strokeDasharray="3 4" />
        ))}
        {['4.0', '3.7', '3.4', '3.1'].map((lb, i) => (
          <text key={lb} x="0" y={13 + i * 18} className="fill-slate-400" style={{ fontSize: 7, fontWeight: 700 }}>{lb}</text>
        ))}
        <polyline
          points="24,62 60,54 96,40 132,30 168,18 192,12"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="text-brand-500"
        />
        {[[24, 62], [60, 54], [96, 40], [132, 30], [168, 18], [192, 12]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2.6" className="fill-brand-500" />
        ))}
      </svg>
    </div>

    {/* Nhóm bản ghi theo tháng */}
    {RECORDS.map((g) => (
      <div key={g.group} data-screen-row>
        <p className="mb-1.5 text-[9px] font-extrabold tracking-[0.14em] text-slate-400 dark:text-slate-500">{g.group}</p>
        <div className={`${card} rounded-2xl divide-y divide-slate-200/70 dark:divide-slate-700/70`}>
          {g.rows.map((r) => (
            <div key={r.title} className="flex items-center gap-2.5 p-2.5">
              <r.icon className={`w-3.5 h-3.5 shrink-0 ${r.tone}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-100 truncate">{r.title}</p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{r.meta}</p>
              </div>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

/* ─────────────────────── §3 Nuôi Thú Ảo (2 lớp) ─────────────────────── */

const TASKS = [
  { time: '07:00', label: 'Cho ăn sáng (200g hạt)', state: 'done' },
  { time: '12:00', label: 'Cho ăn trưa', state: 'late' },
  { time: '18:00', label: 'Dắt đi dạo (30 phút)', state: 'todo' },
];

const SUB_TABS = ['Nhật ký', 'Bài học', 'Tiến trình'];

const VirtualScreen = () => {
  const [petAnim, setPetAnim] = useState('idle');

  return (
    <>
      {/* ── Lớp cảnh quan (~42% chiều cao màn) ── */}
      <div data-screen-row className="relative -mx-4 -mt-1 h-[188px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800" />
        {/* sàn cảnh quan */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-300/70 to-transparent dark:from-slate-700/70" />
        {/* top scrim che chữ */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 pt-2.5 text-white">
          <div className="flex items-center gap-1.5 min-w-0">
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold truncate">Milo</p>
              <p className="text-[9px] text-white/80 truncate">Mèo Anh Short · 8 tuần tuổi</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="p-1 rounded-lg bg-white/20 backdrop-blur-sm"><ImageIcon className="w-3 h-3" /></span>
            <span className="p-1 rounded-lg bg-white/20 backdrop-blur-sm"><MoreHorizontal className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Pet sprite từ asset01 */}
        <button
          type="button"
          onClick={() => setPetAnim('play')}
          className="absolute bottom-9 left-1/2 -translate-x-1/2"
          title="Chạm để chơi với Milo"
        >
          <PetSprite
            petId="milo"
            anim={petAnim}
            width={104}
            onComplete={() => setPetAnim('idle')}
            className="drop-shadow-xl"
          />
        </button>

        {/* Floating status pill */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] font-bold">
          <Sparkles className="w-2.5 h-2.5 text-amber-300 shrink-0" />
          <span className="truncate">Milo hơi mệt do bạn chưa cho ăn bữa trưa</span>
        </div>
      </div>

      {/* ── Draggable sheet layer ── */}
      <div data-screen-row className="-mx-4 px-4 pt-2 rounded-t-[28px] bg-white/90 dark:bg-slate-900/90 border-t border-white/70 dark:border-slate-700 -mt-4 relative z-10">
        <div className="w-10 h-1 mx-auto rounded-full bg-slate-300 dark:bg-slate-600" />
        <p className="mt-1 text-center text-[9px] font-bold text-slate-400 dark:text-slate-500">Vuốt lên để chăm sóc</p>
      </div>

      {/* SECTION 1 — Lịch trình hôm nay */}
      <div data-screen-row className={`${card} p-2.5 rounded-2xl`}>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100">Lịch trình hôm nay</p>
          <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">2/4 việc</span>
        </div>
        <div className="space-y-1.5">
          {TASKS.map((task) => (
            <div
              key={task.time}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border ${
                task.state === 'late'
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40'
                  : 'border-slate-200/80 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 shrink-0 rounded-md flex items-center justify-center text-[8px] font-extrabold ${
                  task.state === 'done'
                    ? 'bg-emerald-500 text-white'
                    : task.state === 'late'
                    ? 'bg-amber-500 text-white'
                    : 'border border-slate-300 dark:border-slate-600'
                }`}
              >
                {task.state === 'done' ? '✓' : task.state === 'late' ? '!' : ''}
              </span>
              <span className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 shrink-0">{task.time}</span>
              <span className="flex-1 min-w-0 text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">
                {task.label}
              </span>
              {task.state === 'late' && (
                <>
                  <span className="text-[8px] font-extrabold text-amber-600 dark:text-amber-400 shrink-0">TRỄ 2 GIỜ</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500 text-white text-[8px] font-extrabold shrink-0">
                    <Utensils className="w-2 h-2" />Cho ăn
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 — Chỉ số sinh học rút gọn */}
      <div data-screen-row className="grid grid-cols-2 gap-2">
        <div className={`${card} p-2.5 rounded-xl`}>
          <p className="text-[9px] text-slate-500 dark:text-slate-400">⚖️ Cân nặng mô phỏng</p>
          <p className="text-[11px] font-extrabold text-slate-800 dark:text-white">2.4 kg <span className="font-bold text-emerald-600 dark:text-emerald-400">(Chuẩn loài)</span></p>
        </div>
        <div className={`${card} p-2.5 rounded-xl`}>
          <p className="text-[9px] text-slate-500 dark:text-slate-400">💉 Mũi tiêm tiếp theo</p>
          <p className="text-[11px] font-extrabold text-slate-800 dark:text-white">Còn 12 ngày <span className="font-bold text-slate-500 dark:text-slate-400">(Mũi 2)</span></p>
        </div>
      </div>

      {/* SECTION 3 — Tab bar giáo dục */}
      <div data-screen-row className={`${card} p-2.5 rounded-2xl`}>
        <div className="flex items-center gap-1.5">
          {SUB_TABS.map((s, i) => (
            <span
              key={s}
              className={`flex-1 text-center py-1 rounded-lg text-[9px] font-extrabold ${
                i === 0
                  ? 'bg-brand-500 text-white shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-2 space-y-1 text-[9px] leading-snug">
          <p className="text-slate-600 dark:text-slate-300">
            · 12:00 Bỏ lỡ bữa trưa ➔ <span className="font-bold text-rose-600 dark:text-rose-400">Milo sụt 50g</span>
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            · 07:00 Đã cho ăn ➔ <span className="font-bold text-brand-600 dark:text-brand-400">Chi phí: 25.000đ</span>
          </p>
        </div>
      </div>
    </>
  );
};

/* ───────────────────────────── Khung máy ───────────────────────────── */

const SCREEN_BODY = { health: HealthScreen, medical: MedicalScreen, virtual: VirtualScreen };

export const PhoneMockup = () => {
  const [screen, setScreen] = useState('health');
  const tiltRef = useTilt(5);
  const stageRef = useRef(null);
  const Body = SCREEN_BODY[screen];

  // Đổi màn: các khối trong màn mới trồi lên lần lượt
  useGSAP(() => {
    if (prefersReduced) return;
    gsap.fromTo(
      '[data-screen-row]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' }
    );
  }, { dependencies: [screen], scope: stageRef, revertOnUpdate: true });

  // Badge active thì bấm lại quay về Home (Health) — navigation flow §4
  const jump = (id) => setScreen((cur) => (cur === id ? 'health' : id));

  const badge = (active) =>
    `absolute z-30 flex items-center gap-2.5 p-3 rounded-2xl text-left bg-white dark:bg-slate-800 shadow-3d border transition-all duration-300 hover:-translate-y-0.5 ${
      active
        ? 'border-brand-500 ring-2 ring-brand-500/60 scale-[1.03]'
        : 'border-slate-100 dark:border-slate-700'
    }`;

  return (
    <div
      ref={tiltRef}
      data-hero-phone
      className="relative w-full max-w-[340px] sm:max-w-[380px] transform-style-3d group will-change-transform"
    >
      <div className="relative rounded-[40px] p-4 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl border-4 border-slate-700/80 shadow-brand-500/20">

        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-10 h-1 bg-slate-700 rounded-full" />
        </div>

        <div className="relative bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 rounded-[32px] overflow-hidden pt-8 pb-2 px-4 border border-amber-200/50 dark:border-slate-800 flex flex-col">

          {/* Status bar */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 px-1 pt-1 pb-2">
            <span>09:41</span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>IPIF App</span>
            </div>
          </div>

          {/* Vùng nội dung: cao cố định để đổi màn không giật layout */}
          <div
            ref={stageRef}
            data-lenis-prevent
            className="h-[530px] overflow-y-auto no-scrollbar space-y-2.5"
          >
            <Body />
          </div>

          {/* Tab bar + con trượt chỉ tab đang mở */}
          <div className="relative mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span
              className="absolute top-2 bottom-0 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 transition-all duration-300 ease-out"
              style={{ width: `${100 / TABS.length}%`, left: `${TABS.findIndex((tb) => tb.id === screen) * (100 / TABS.length)}%` }}
            />
            <div className="relative grid grid-cols-3">
              {TABS.map((tb) => (
                <button
                  key={tb.id}
                  type="button"
                  onClick={() => setScreen(tb.id)}
                  className={`py-1.5 text-[10px] font-extrabold whitespace-nowrap transition-colors ${
                    screen === tb.id
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tb.icon} {tb.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Badge góc trên trái — mở màn Nuôi Thú Ảo */}
      <button
        type="button"
        onClick={() => jump('virtual')}
        data-hero-badge
        className={`${badge(screen === 'virtual')} -top-4 -left-6 animate-float-fast`}
      >
        <span className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-300 text-xl leading-none">✨</span>
        <span className="block">
          <span className="block text-xs font-extrabold text-slate-800 dark:text-white">Thú Cưng Ảo</span>
          <span className="block text-[10px] text-slate-500 dark:text-slate-400">
            {screen === 'virtual' ? 'Đang xem · bấm để quay lại' : 'Bấm để xem bố cục'}
          </span>
        </span>
      </button>

      {/* Badge góc dưới phải — mở màn Hồ Sơ Y Tế */}
      <button
        type="button"
        onClick={() => jump('medical')}
        data-hero-badge
        className={`${badge(screen === 'medical')} -bottom-4 -right-4 animate-float-slow`}
      >
        <span className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-300 text-xl leading-none">🩺</span>
        <span className="block">
          <span className="block text-xs font-extrabold text-slate-800 dark:text-white">Hồ Sơ Thú Y</span>
          <span className="block text-[10px] text-slate-500 dark:text-slate-400">
            {screen === 'medical' ? 'Đang xem · bấm để quay lại' : 'Bấm để xem bố cục'}
          </span>
        </span>
      </button>
    </div>
  );
};
