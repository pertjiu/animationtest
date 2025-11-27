import { animate } from "motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
  isActive: boolean;
}

export function CountUp({ value, duration = 1, delay = 0, formatter = (v) => `€${Math.round(v)}`, isActive }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const initialValue = formatter(0);

  useEffect(() => {
    if (isActive && ref.current) {
      const controls = animate(
        (progress) => {
          if (ref.current) {
            ref.current.textContent = formatter(progress * value);
          }
        },
        { duration, ease: "ease-out", delay }
      );
      return () => controls.stop();
    }
  }, [value, duration, formatter, isActive, delay]);

  return <span ref={ref}>{initialValue}</span>;
}
