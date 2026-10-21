"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer:fine)").matches) return;
    const lenis = new Lenis({ duration: 1, anchors: true });
    const tick = (t: number) => lenis.raf(t * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);
  return null;
}
