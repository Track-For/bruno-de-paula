"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
const Canvas = dynamic(() => import("./DisplacementCanvas"), { ssr: false });
export default function DisplacementPlane() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(min-width:1024px) and (pointer:fine)").matches)
      return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setReady(true);
      },
      { rootMargin: "100px" },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);
  return (
    <div ref={ref} className="displacement-layer" aria-hidden="true">
      {ready && !reduced && <Canvas active={active} />}
    </div>
  );
}
