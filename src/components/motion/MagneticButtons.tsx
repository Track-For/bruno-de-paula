"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function MagneticButtons() {
  const path = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer:fine)").matches) return;
    const cleanup = Array.from(
      document.querySelectorAll<HTMLElement>(".magnetic"),
    ).map((el) => {
      const x = gsap.quickTo(el, "x", { duration: 0.4 });
      const y = gsap.quickTo(el, "y", { duration: 0.4 });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.04);
        y((e.clientY - r.top - r.height / 2) * 0.08);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        x.tween.kill();
        y.tween.kill();
        gsap.set(el, { clearProps: "transform" });
      };
    });
    return () => cleanup.forEach((fn) => fn());
  }, [path, reduced]);
  return null;
}
