import { useEffect, useRef } from "react";

export default function useDebounce(delay = 500) {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (callback: () => void) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, delay);
  };
}
