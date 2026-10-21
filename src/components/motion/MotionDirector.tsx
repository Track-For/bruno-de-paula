"use client";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
export default function MotionDirector() {
  const pathname = usePathname();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 25,
            opacity: 0.35,
            duration: 0.8,
            ease: "asp",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }),
        );
        document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "words",
            autoSplit: true,
          });
          gsap.from(split.words, {
            y: 22,
            opacity: 0.2,
            stagger: 0.045,
            duration: 0.9,
            ease: "asp",
          });
        });
        document
          .querySelectorAll<HTMLElement>("[data-manifesto]")
          .forEach((el) => {
            const split = SplitText.create(el, { type: "words" });
            gsap.from(split.words, {
              opacity: 0.28,
              stagger: 0.15,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 45%",
                scrub: 1,
              },
            });
          });
        document
          .querySelectorAll<HTMLElement>("[data-parallax] img")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { yPercent: -3, scale: 1.08 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            ),
          );
        if (document.querySelector(".hero-visual"))
          gsap.fromTo(
            ".hero-visual .portrait-frame",
            { clipPath: "inset(0% 0% 0% 0%)" },
            {
              clipPath: "inset(2% 2% 0% 2%)",
              y: 12,
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        document
          .querySelectorAll<HTMLElement>(".architect-mark")
          .forEach((el) =>
            gsap.from(el, {
              scale: 0.94,
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            }),
          );
        document
          .querySelectorAll<SVGPathElement>(".gold-thread path")
          .forEach((el) => {
            const length = el.getTotalLength();
            gsap.fromTo(
              el,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("svg"),
                  start: "top 90%",
                  end: "bottom 40%",
                  scrub: 1,
                },
              },
            );
          });
        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        });
      });
      const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        mm.revert();
        cancelAnimationFrame(refresh);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
  return <div className="scroll-progress" aria-hidden="true" />;
}
