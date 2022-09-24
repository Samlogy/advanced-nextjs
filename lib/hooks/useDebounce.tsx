import { useCallback, useRef } from "react";
import { debounce } from "../functions";

export default function useDebounce(fn: any, delay?: number) {
  let debounced = useCallback(debounce(fn, delay), []);
  return useRef(debounced).current;
}
