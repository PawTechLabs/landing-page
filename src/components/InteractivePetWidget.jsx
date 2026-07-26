import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';
import { PetSprite } from './PetSprite';

export const InteractivePetWidget = () => {
  const { t } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [petState, setPetState] = useState({
    name: 'Milo',
    happiness: 95,
    hunger: 80,
    statusText: 'Đang rất vui!',
  });
  // Sprite lấy từ /asset01 — mỗi hành động phát một clip rồi quay về idle
  const [petAnim, setPetAnim] = useState('idle');

  const [bubbleMessage, setBubbleMessage] = useState('Chào bạn! Mình là Milo, thử nuôi mình nhé! 🐾');

  const handleFeed = () => {
    setPetState(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 20),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setPetAnim('eat');
    setBubbleMessage('Ngon quá! Cảm ơn bạn đã cho ăn 🍖');
  };

  const handlePet = () => {
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
    }));
    setPetAnim('wave');
    setBubbleMessage('Thích quá nà! ❤️');
  };

  const handlePlay = () => {
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      hunger: Math.max(10, prev.hunger - 10),
    }));
    setPetAnim('jump');
    setBubbleMessage('Bắt bóng vui cực kỳ! 🎾');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Expanded Pet Bubble Widget */}
      {isOpen ? (
        <div className="clay-card p-5 w-72 space-y-4 shadow-2xl relative border-2 border-brand-300 dark:border-brand-700 animate-bounce-subtle">
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {t('petWidget.title')}
              </h4>
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                ● {petState.statusText}
              </p>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="bg-brand-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-brand-200 dark:border-slate-700 text-xs text-brand-900 dark:text-brand-200 font-semibold relative text-center">
            {bubbleMessage}
          </div>

          {/* Pet Animated Avatar — sprite thật từ /asset01 */}
          <button
            type="button"
            onClick={handlePet}
            className="mx-auto block rounded-2xl bg-gradient-to-tr from-amber-200 to-orange-300 dark:from-slate-800 dark:to-slate-700 p-1 shadow-inner"
          >
            <PetSprite
              petId="milo"
              anim={petAnim}
              width={92}
              onComplete={() => setPetAnim('idle')}
              className="mx-auto animate-float-fast"
            />
          </button>

          {/* Progress Meters */}
          <div className="space-y-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Hạnh phúc:</span>
              <span className="text-amber-500">{petState.happiness}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${petState.happiness}%` }} />
            </div>

            <div className="flex justify-between pt-1">
              <span>No bụng:</span>
              <span className="text-emerald-500">{petState.hunger}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${petState.hunger}%` }} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handleFeed}
              className="py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold text-[11px] hover:bg-orange-200 transition-colors"
            >
              {t('petWidget.feedBtn')}
            </button>
            <button
              onClick={handlePet}
              className="py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-[11px] hover:bg-rose-200 transition-colors"
            >
              {t('petWidget.petBtn')}
            </button>
            <button
              onClick={handlePlay}
              className="py-1.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-[11px] hover:bg-teal-200 transition-colors"
            >
              {t('petWidget.playBtn')}
            </button>
          </div>

        </div>
      ) : (
        /* Floating Minimized Trigger Icon */
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-500 via-orange-500 to-amber-400 text-white flex items-center justify-center text-3xl shadow-3d-orange hover:scale-110 active:scale-95 transition-transform relative group"
        >
          🐶
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white animate-ping" />
        </button>
      )}

    </div>
  );
};
