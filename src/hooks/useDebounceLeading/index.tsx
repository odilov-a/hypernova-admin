import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    let handler: any;
    if (!handler) {
      setDebounceValue(value);
    }
    handler = setTimeout(() => {
      handler = undefined;
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}
