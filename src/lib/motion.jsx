import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Một ngôn ngữ easing duy nhất cho toàn site
gsap.defaults({ ease: 'power3.out', duration: 1 });

export const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Quán tính cuộn (Lenis) đồng bộ với ticker của GSAP + ScrollTrigger.
 * Bắt luôn anchor link để cuộn mượt thay vì nhảy cụp.
 */
export function useSmoothScroll() {
  useGSAP(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96, duration: 1.5 });
    };
    document.addEventListener('click', onClick);

    // Font load xong thì chiều cao đổi -> phải đo lại trigger
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

/**
 * Chạy tween một lần khi `trigger` lọt vào viewport.
 *
 * Cố tình KHÔNG dùng ScrollTrigger: React StrictMode mount kép, vòng cleanup
 * của lần mount đầu giết ScrollTrigger của lần mount sau nhưng tween vẫn sống,
 * để lại phần tử kẹt vĩnh viễn ở trạng thái "from" (opacity 0).
 * IntersectionObserver là API nền tảng, không phụ thuộc vị trí đo sẵn nên
 * miễn nhiễm với cả đua mount lẫn layout đổi sau khi font tải xong.
 *
 * Trả về hàm dọn dẹp.
 */
export function revealOnEnter(trigger, targets, fromVars, toVars) {
  // Đã nằm trong hoặc đã trôi qua viewport ngay lúc gắn: hiện thẳng, không ẩn
  // đi rồi ngồi chờ. Không có đường nào để nội dung kẹt trắng vĩnh viễn.
  if (trigger.getBoundingClientRect().top < window.innerHeight * 0.92) {
    gsap.set(targets, { opacity: 1, y: 0, scale: 1, filter: 'none' });
    return () => {};
  }

  gsap.set(targets, fromVars);

  const io = new IntersectionObserver(
    (entries, obs) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      gsap.to(targets, toVars);
    },
    { rootMargin: '0px 0px -12% 0px' }
  );
  io.observe(trigger);

  return () => io.disconnect();
}

/**
 * Như revealOnEnter nhưng hai chiều: vào viewport thì bung ra, rơi xuống dưới
 * viewport thì thu lại — nên cuộn ngược lên sẽ thấy nó co lại chứ không đứng im.
 *
 * Chỉ thu khi phần tử ra khỏi mép DƯỚI. Ra khỏi mép trên thì kệ: người dùng
 * đã đọc xong, thu lại ở đó chỉ gây giật khi cuộn tiếp.
 *
 * Trả về hàm dọn dẹp.
 */
export function toggleOnScroll(trigger, targets, fromVars, toVars) {
  const io = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1];
      if (e.isIntersecting) {
        gsap.to(targets, toVars);
        return;
      }
      if (e.rootBounds && e.boundingClientRect.top >= e.rootBounds.bottom) {
        gsap.to(targets, fromVars);
      }
    },
    { rootMargin: '0px 0px -12% 0px' }
  );
  io.observe(trigger);

  return () => io.disconnect();
}

/**
 * Bọc quanh một khối. Mọi phần tử con có [data-anim] sẽ trồi lên lần lượt
 * khi khối lọt vào viewport. Không có [data-anim] thì animate cả khối.
 */
export const Reveal = ({ children, y = 44, stagger = 0.11, className = '', id }) => {
  const root = useRef(null);

  useGSAP(() => {
    const found = root.current.querySelectorAll('[data-anim]');
    const targets = found.length ? found : [root.current];

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0, filter: 'none' });
      return;
    }

    return revealOnEnter(
      root.current,
      targets,
      { opacity: 0, y, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.15, stagger, clearProps: 'filter' }
    );
  }, { scope: root });

  return (
    <div ref={root} id={id} className={className}>
      {children}
    </div>
  );
};

/**
 * Đoạn văn dẫn truyện: từng chữ sáng dần theo tiến độ cuộn.
 */
export const ScrubText = ({ text, className = '' }) => {
  const root = useRef(null);
  const words = useMemo(() => String(text).split(' '), [text]);

  useGSAP(() => {
    const els = root.current.querySelectorAll('[data-word]');
    if (prefersReduced) {
      gsap.set(els, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      els,
      { opacity: 0.1 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.35,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'bottom 58%',
          scrub: 0.7,
        },
      }
    );
  }, { scope: root });

  return (
    <p ref={root} className={className}>
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block will-change-[opacity]">
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
};

/**
 * Tilt 3D theo con trỏ, nội suy bằng quickTo nên không giật như setState.
 * Trả về ref gắn vào phần tử cần nghiêng.
 */
export function useTilt(max = 10) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      rotX(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -max);
      rotY(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max);
    };
    const onLeave = () => { rotX(0); rotY(0); };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, { scope: ref });

  return ref;
}

/** Tách chuỗi thành các <span> chữ để stagger. Đủ dùng, khỏi cần SplitText. */
export const Words = ({ text, className = '', wordClass = '' }) => (
  <span className={className}>
    {String(text).split(' ').map((w, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom py-[0.16em] -my-[0.16em]"
      >
        <span data-hero-word className={`inline-block ${wordClass}`}>
          {w}
          {' '}
        </span>
      </span>
    ))}
  </span>
);

export { gsap, ScrollTrigger, useGSAP };
