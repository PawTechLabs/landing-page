import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/motion';
import {
  petSprites, framePosition,
  SHEET_COLS, SHEET_ROWS, FRAME_RATIO,
} from '../lib/petSprites';

/**
 * Phát một animation trong sprite sheet của asset01.
 *
 * Chạy bằng một tween GSAP với ease `steps()` thay vì requestAnimationFrame
 * thủ công: đúng ticker của cả site, tự pause khi tab ẩn, và useGSAP dọn sạch
 * khi unmount / khi đổi anim.
 */
export const PetSprite = ({
  petId = 'mochi',
  anim = 'idle',
  width = 128,
  flip = false,
  className = '',
  onComplete,
}) => {
  const el = useRef(null);
  const pet = petSprites[petId] || petSprites.mochi;
  const clip = pet.anims[anim] || pet.anims.idle;

  // Callback đọc qua ref: khỏi đưa vào dependencies rồi restart tween mỗi render
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useGSAP(() => {
    const { frames, fps, loop } = clip;
    const show = (i) => {
      el.current.style.backgroundPosition = framePosition(frames[i]);
    };

    show(0);
    if (prefersReduced || frames.length < 2) return;

    const state = { i: 0 };
    const tw = gsap.to(state, {
      i: frames.length,
      duration: frames.length / fps,
      ease: `steps(${frames.length})`,
      repeat: loop ? -1 : 0,
      onUpdate: () => show(Math.min(frames.length - 1, Math.floor(state.i))),
      onComplete: () => cbRef.current?.(),
    });

    return () => tw.kill();
  }, { dependencies: [pet.url, anim], revertOnUpdate: true, scope: el });

  return (
    <div
      ref={el}
      role="img"
      aria-label={`${pet.name} — ${anim}`}
      className={`bg-no-repeat ${className}`}
      style={{
        width,
        height: Math.round(width * FRAME_RATIO),
        backgroundImage: `url(${pet.url})`,
        backgroundSize: `${SHEET_COLS * 100}% ${SHEET_ROWS * 100}%`,
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
    />
  );
};
