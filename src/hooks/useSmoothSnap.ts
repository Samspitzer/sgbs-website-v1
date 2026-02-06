import { useEffect, useRef } from 'react';

export function useSmoothSnap(duration: number = 1000) {
  const isAnimating = useRef(false);
  const targetSection = useRef(0);
  const animationId = useRef<number | null>(null);

  // Wheel gesture detection:
  // A single mouse wheel "flick" fires dozens of wheel events over ~200-500ms.
  // We lock on the FIRST event and ignore everything until the gesture ends
  // (no wheel events for 800ms = gesture is done).
  const wheelLocked = useRef(false);
  const wheelUnlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    const totalSections = sections.length;
    if (totalSections === 0) return;

    const getCurrentSection = (): number => {
      return Math.round(window.scrollY / window.innerHeight);
    };

    const getTargetScroll = (index: number): number => {
      return index * window.innerHeight;
    };

    const smoothScrollTo = (sectionIndex: number, interrupt: boolean = false) => {
      const newTarget = Math.max(0, Math.min(totalSections - 1, sectionIndex));

      if (isAnimating.current && targetSection.current === newTarget && !interrupt) return;

      if (isAnimating.current && animationId.current) {
        cancelAnimationFrame(animationId.current);
        isAnimating.current = false;
      }

      const targetY = getTargetScroll(newTarget);
      const startY = window.scrollY;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) return;

      isAnimating.current = true;
      targetSection.current = newTarget;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, startY + distance * easeInOutCubic(progress));

        if (progress < 1) {
          animationId.current = requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, targetY);
          isAnimating.current = false;
          animationId.current = null;
        }
      };

      animationId.current = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Every wheel event resets the unlock timer.
      // The lock only releases after 800ms of silence = gesture finished.
      if (wheelUnlockTimer.current) {
        clearTimeout(wheelUnlockTimer.current);
      }
      wheelUnlockTimer.current = setTimeout(() => {
        wheelLocked.current = false;
      }, 800);

      // If already locked, swallow — one gesture = one section move
      if (wheelLocked.current) return;

      // Ignore tiny jitter
      if (Math.abs(e.deltaY) < 5) return;

      // Lock immediately — this is the first event of a new gesture
      wheelLocked.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentSection = getCurrentSection();
      smoothScrollTo(currentSection + direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' ||
          e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home' || e.key === 'End') {

        e.preventDefault();
        e.stopPropagation();

        let direction = 0;
        let absoluteTarget: number | null = null;

        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          direction = 1;
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          direction = -1;
        } else if (e.key === 'Home') {
          absoluteTarget = 0;
        } else if (e.key === 'End') {
          absoluteTarget = totalSections - 1;
        }

        if (absoluteTarget !== null) {
          smoothScrollTo(absoluteTarget, true);
        } else if (direction !== 0) {
          if (isAnimating.current) {
            smoothScrollTo(targetSection.current + direction, true);
          } else {
            const currentSection = getCurrentSection();
            smoothScrollTo(currentSection + direction);
          }
        }
      }
    };

    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'PageDown' || e.key === 'PageUp' ||
          e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDownCapture, { capture: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDownCapture, { capture: true });
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      if (wheelUnlockTimer.current) clearTimeout(wheelUnlockTimer.current);
    };
  }, [duration]);
}