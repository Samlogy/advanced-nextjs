import { useRef } from "react";
import { throttle } from "../functions";

export default function useThrottle(fn: any, limit?: number) {
  return useRef(throttle(fn, limit)).current;
}
