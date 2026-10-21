"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer:fine)").matches || !ref.current)
      return;
    const el = ref.current;
    const x = gsap.quickTo(el, "x", { duration: 0.25 });
    const y = gsap.quickTo(el, "y", { duration: 0.25 });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const item = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      el.textContent = item?.dataset.cursor || "";
      el.style.opacity = item ? "1" : "0";
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      x.tween.kill();
      y.tween.kill();
    };
  }, [reduced]);
  return <div className="custom-cursor" ref={ref} aria-hidden="true" />;
}
