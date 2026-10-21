"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ShaderFallback from "./ShaderFallback";
const BalanceShader = dynamic(() => import("./BalanceShader"), { ssr: false });
export default function JusticeThreads() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(min-width:1024px) and (pointer:fine)").matches)
      return;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const timer = setTimeout(() => setSupported(true), 1200);
    const observer = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [reduced]);
  return (
    <div className="justice-threads" ref={ref}>
      <ShaderFallback />
      {supported && !reduced && <BalanceShader active={active} />}
    </div>
  );
}
