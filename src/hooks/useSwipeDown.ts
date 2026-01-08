import { useState, useRef, useCallback } from 'react';

interface SwipeState {
  startY: number;
  currentY: number;
  isDragging: boolean;
}

interface UseSwipeDownOptions {
  /** Minimalna odległość swipe (w pikselach) do wyzwolenia akcji */
  threshold?: number;
  /** Callback wywoływany po swipe down */
  onSwipeDown: () => void;
  /** Czy swipe jest włączony */
  enabled?: boolean;
}

/**
 * Hook do obsługi gestu swipe down
 * - Śledzi dotyk/mysz
 * - Wywołuje callback gdy swipe przekroczy threshold
 * - Zwraca offsetY do animacji
 */
export function useSwipeDown({
  threshold = 100,
  onSwipeDown,
  enabled = true,
}: UseSwipeDownOptions) {
  const [offsetY, setOffsetY] = useState(0);
  const swipeState = useRef<SwipeState>({
    startY: 0,
    currentY: 0,
    isDragging: false,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;
    swipeState.current = {
      startY: e.touches[0].clientY,
      currentY: e.touches[0].clientY,
      isDragging: true,
    };
  }, [enabled]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || !swipeState.current.isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - swipeState.current.startY;
    
    // Tylko swipe w dół (deltaY > 0)
    if (deltaY > 0) {
      swipeState.current.currentY = currentY;
      // Limit the drag to prevent excessive movement
      setOffsetY(Math.min(deltaY, threshold * 1.5));
    }
  }, [enabled, threshold]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled || !swipeState.current.isDragging) return;
    
    const deltaY = swipeState.current.currentY - swipeState.current.startY;
    
    if (deltaY >= threshold) {
      onSwipeDown();
    }
    
    // Reset state
    setOffsetY(0);
    swipeState.current = {
      startY: 0,
      currentY: 0,
      isDragging: false,
    };
  }, [enabled, threshold, onSwipeDown]);

  const handleTouchCancel = useCallback(() => {
    setOffsetY(0);
    swipeState.current = {
      startY: 0,
      currentY: 0,
      isDragging: false,
    };
  }, []);

  return {
    offsetY,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
    },
  };
}
