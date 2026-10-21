"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      try {
        if (sessionStorage.getItem("asp-intro")) return;
        sessionStorage.setItem("asp-intro", "1");
      } catch {
        return;
      }
      const gl = document.createElement("canvas").getContext("webgl2");
      if (!gl) return;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gsap
        .timeline()
        .set(ref.current, { display: "flex" })
        .fromTo(
          ".preloader-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "asp" },
        )
        .to(ref.current, { opacity: 0, duration: 0.45, delay: 0.1 })
        .set(ref.current, { display: "none" });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <span>ASP</span>
      <i className="preloader-line" />
      <small>ESTRUTURA · EQUILÍBRIO · CLAREZA</small>
    </div>
  );
}
