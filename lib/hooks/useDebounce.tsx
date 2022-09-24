import { useCallback, useRef } from "react";

export default function useDebounce(fn: any, delay = 500) {
  function debounce(func: any) {
    let timer: any;
    return (...args: any) => {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 650);
    };
  }

  let debounced = useCallback(debounce(fn), [delay]);
  debounced = useRef(debounced).current;
  return debounced;
}
