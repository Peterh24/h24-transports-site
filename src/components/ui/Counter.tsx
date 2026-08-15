"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

/** Compteur animé déclenché à l'entrée dans le viewport (easing cubic out). */
export function Counter({ value, suffix = "", prefix = "", duration = 1800 }: Props) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const target = parseFloat(String(value));

    if (reduce) {
      setN(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(target * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setN(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const display = useMemo(() => {
    const v = Number(value);
    if (Number.isInteger(v)) return Math.round(n).toLocaleString("fr-FR");
    return n.toFixed(1);
  }, [n, value]);

  return (
    <span ref={ref} className="tnum">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
