import { useEffect, useRef } from 'react';

export function useSmoothSnap(duration: number = 1000) {
  const isAnimating = useRef(false);
  const targetSection = useRef(0);
  const animationId = useRef<number | null>(null);
  const lastWheelTime = useRef(0);

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    const totalSections = sections.length;
    if (totalSections === 0) return;

    // Always calculate current section from scroll position
    const getCurrentSection = (): number => {
      return Math.round(window.scrollY / window.innerHeight);
    };

    const getTargetScroll = (index: number): number => {
      return index * window.innerHeight;
    };

    const smoothScrollTo = (sectionIndex: number, interrupt: boolean = false) => {
      // Clamp to valid range
      const newTarget = Math.max(0, Math.min(totalSections - 1, sectionIndex));
      
      // If already animating to this target, ignore
      if (isAnimating.current && targetSection.current === newTarget && !interrupt) return;
      
      // If animating and new target is different, cancel current animation
      if (isAnimating.current && animationId.current) {
        cancelAnimationFrame(animationId.current);
        isAnimating.current = false;
      }
      
      const targetY = getTargetScroll(newTarget);
      const startY = window.scrollY;
      const distance = targetY - startY;
      
      // Skip if already there
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
          // Ensure we land exactly on target
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

      const now = Date.now();
      if (now - lastWheelTime.current < 100) return;
      lastWheelTime.current = now;

      if (Math.abs(e.deltaY) < 5) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // If animating, redirect to new target
      if (isAnimating.current) {
        smoothScrollTo(targetSection.current + direction, true);
      } else {
        const currentSection = getCurrentSection();
        smoothScrollTo(currentSection + direction);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle spacebar, arrows, page up/down
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
          // If animating, redirect to new target (current target + direction)
          if (isAnimating.current) {
            smoothScrollTo(targetSection.current + direction, true);
          } else {
            const currentSection = getCurrentSection();
            smoothScrollTo(currentSection + direction);
          }
        }
      }
    };

    // Prevent default scroll behavior for spacebar at document level
    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'PageDown' || e.key === 'PageUp' || 
          e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    };

    // Use capture phase for keydown to catch it before browser handles it
    document.addEventListener('keydown', handleKeyDownCapture, { capture: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDownCapture, { capture: true });
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [duration]);
}