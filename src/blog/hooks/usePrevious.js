import { useEffect, useRef } from "react";

/*
 * stores value in ref.current and updates the value as an effect
 */
export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
