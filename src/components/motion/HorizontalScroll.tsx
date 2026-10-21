"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    ref.current?.scrollBy({
      left: direction * 380,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <div className="horizontal-areas">
      <div className="horizontal-controls">
        <span>Explore as áreas com as setas ou pelo teclado.</span>
        <button aria-label="Áreas anteriores" onClick={() => move(-1)}>
          <ArrowLeft size={18} />
        </button>
        <button aria-label="Próximas áreas" onClick={() => move(1)}>
          <ArrowRight size={18} />
        </button>
      </div>
      <div
        ref={ref}
        className="horizontal-viewport"
        tabIndex={0}
        role="region"
        aria-label="Catálogo de áreas de atuação"
        onKeyDown={(e) => {
          if (
            e.target === e.currentTarget &&
            (e.key === "ArrowRight" || e.key === "ArrowLeft")
          ) {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
