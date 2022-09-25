import { useCallback, useRef } from "react";
import { debounce } from "../functions";

export default function useDebounce(fn: any, delay = 500) {
  let debounced = useCallback(debounce(fn, delay), []);
  return useRef(debounced).current;
}
