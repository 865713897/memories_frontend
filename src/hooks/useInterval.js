import { useEffect, useRef, useCallback } from 'react';

/**
 * 定时器
 */
function useInterval(fn = () => {}, delay = 200, deps = [], options = { immediate: false }) {
  const immediate = options?.immediate;
  const timerRef = useRef(0);

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    if (immediate) {
      fn();
    }
    timerRef.current = setInterval(() => {
      fn();
    }, delay);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [delay, ...deps]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  return clear;
}

export default useInterval;
