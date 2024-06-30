// hooks/useDebounce.js

import { useCallback, useRef } from 'react';

// Custom hook for debouncing function calls
export function useDebounce(callback, delay) {
  // Ref to store the timeout ID
  const timeoutRef = useRef(null);

  // Memoized debounced function
  const debouncedCallback = useCallback((...args) => {
    // Clear existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
}