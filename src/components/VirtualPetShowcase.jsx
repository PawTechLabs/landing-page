import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gamepad2, HeartHandshake, DollarSign, Sparkles, ShoppingBag, ShieldCheck, Download } from 'lucide-react';

export const VirtualPetShowcase = () => {
  const { t, downloadApk } = useApp();
  const [activeScene, setActiveScene] = useState('cozy-living');

  const scenes = [
    { id: 'cozy-living', name: 'Phòng Khách Ấm Cúng', bg: 'from-amber-100 via-orange-100 to-rose-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950', petEmoji: '🐶', price: 'Miễn phí' },
    { id: 'cherry-park', name: 'Công Viên Hoa Anh Đào', bg: 'from-pink-100 via-rose-100 to-purple-100 dark:from-purple-950 dark:via-pink-950 dark:to-slate-900', petEmoji: '🐱', price: '15.000đ' },
    { id: 'cyber-room', name: 'Phòng Cyberpunk 3D', bg: 'from-indigo-100 via-purple-100 to-teal-100 dark:from-indigo-950 dark:via-slate-900 dark:to-purple-950', petEmoji: '🐰', price: '25.000đ' }
  ];

  return (
    <section id="virtual-pet" className="py-32 md:py-44 relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-amber-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <div data-anim className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-extrabold uppercase tracking-wider">
              <Gamepad2 className="w-4 h-4 text-orange-500" />
              <span>{t('virtualPetSpotlight.tag')}</span>
            </div>

            <h2 data-anim className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('virtualPetSpotlight.title')}
            </h2>

            <p data-anim className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('virtualPetSpotlight.desc')}
            </p>

            <ul data-anim className="space-y-4 pt-2">
              {t('virtualPetSpotlight.featuresList') && t('virtualPetSpotlight.featuresList').map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                  <div className="p-2 rounded-xl bg-brand-500 text-white font-bold text-sm shrink-0">
                    {idx === 0 ? <DollarSign className="w-4 h-4" /> : idx === 1 ? <HeartHandshake className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 pt-0.5">{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={downloadApk}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-3d-orange active:translate-y-1 transition-all duration-200 flex items-center gap-3"
              >
                <Download className="w-5 h-5 animate-bounce-subtle" />
                <span>{t('virtualPetSpotlight.ctaText')}</span>
              </button>
            </div>
          </div>

          {/* Right 3D Scene Background Switcher Interactive Preview */}
          <div className="lg:col-span-6">
            <div data-anim className="clay-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  Mô Phỏng Không Gian 3D Scene
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-300">
                  IPIF Store Item
                </span>
              </div>

              {/* Dynamic 3D Scene Viewer */}
              <div className={`relative h-72 sm:h-80 rounded-3xl bg-gradient-to-tr ${scenes.find(s => s.id === activeScene)?.bg} p-6 flex flex-col justify-between border-2 border-white/80 dark:border-slate-700 shadow-inner transition-all duration-500 overflow-hidden`}>
                
                {/* Floating Scene Ornaments */}
                <div className="absolute top-4 left-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-extrabold text-slate-700 dark:text-slate-200 border border-white/40">
                  📍 {scenes.find(s => s.id === activeScene)?.name}
                </div>

                <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full shadow">
                  💰 {scenes.find(s => s.id === activeScene)?.price}
                </div>

                {/* Animated 3D Pet in Scene */}
                <div className="my-auto text-center space-y-2">
                  <div className="text-7xl sm:text-8xl animate-float-slow filter drop-shadow-2xl">
                    {scenes.find(s => s.id === activeScene)?.petEmoji}
                  </div>
                  <div className="inline-block bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 border border-white/40 shadow">
                    Bé đang thư giãn trong {scenes.find(s => s.id === activeScene)?.name}
                  </div>
                </div>

                {/* Scene Bottom Controls */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500">Thức ăn:</span>
                    <p className="text-xs font-bold text-emerald-600">Đủ 100%</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500">Vệ sinh:</span>
                    <p className="text-xs font-bold text-amber-600">Sạch sẽ</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500">Bệnh tật:</span>
                    <p className="text-xs font-bold text-teal-600">Khỏe mạnh</p>
                  </div>
                </div>

              </div>

              {/* Scene Selector Buttons */}
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Thử đổi Background Scene:</p>
                <div className="grid grid-cols-3 gap-3">
                  {scenes.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setActiveScene(s.id)}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                        activeScene === s.id
                          ? 'bg-brand-500 text-white border-brand-600 shadow-3d-orange'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                      }`}
                    >
                      <div>{s.petEmoji} {s.name}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
