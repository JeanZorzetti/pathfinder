import { useEffect, useRef, useState, useCallback } from "react";

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  pullDistance?: number; // Distance to pull before triggering refresh (default: 80px)
  maxPullDistance?: number; // Maximum pull distance (default: 120px)
  resistance?: number; // Resistance factor for pull (default: 2.5)
}

export const usePullToRefresh = (options: PullToRefreshOptions) => {
  const {
    onRefresh,
    pullDistance = 80,
    maxPullDistance = 120,
    resistance = 2.5,
  } = options;

  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shouldTrigger, setShouldTrigger] = useState(false);

  const touchStart = useRef<number | null>(null);
  const scrollTop = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Only enable pull-to-refresh if we're at the top of the page
    scrollTop.current = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop.current === 0) {
      touchStart.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (touchStart.current === null || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStart.current;

      // Only allow pull down (positive diff) and when at top
      if (diff > 0 && scrollTop.current === 0) {
        // Prevent default scroll behavior when pulling
        e.preventDefault();

        // Apply resistance and cap at maxPullDistance
        const adjustedDiff = Math.min(diff / resistance, maxPullDistance);
        setPullY(adjustedDiff);

        // Check if we should trigger refresh
        setShouldTrigger(adjustedDiff >= pullDistance);
      }
    },
    [isRefreshing, pullDistance, maxPullDistance, resistance]
  );

  const handleTouchEnd = useCallback(async () => {
    if (touchStart.current === null) return;

    if (shouldTrigger && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
        setPullY(0);
        setShouldTrigger(false);
      }
    } else {
      // Animate back to 0
      setPullY(0);
      setShouldTrigger(false);
    }

    touchStart.current = null;
  }, [shouldTrigger, isRefreshing, onRefresh]);

  useEffect(() => {
    const element = document.body;

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    pullY,
    isRefreshing,
    shouldTrigger,
  };
};
