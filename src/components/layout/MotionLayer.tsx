"use client";
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const MotionDirector = dynamic(() => import("../motion/MotionDirector"), {
  ssr: false,
});
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const MagneticButtons = dynamic(() => import("../motion/MagneticButtons"), {
  ssr: false,
});
const query =
  "(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)";
const subscribe = (cb: () => void) => {
  const media = matchMedia(query);
  media.addEventListener("change", cb);
  return () => media.removeEventListener("change", cb);
};
export default function MotionLayer() {
  const active = useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
  return active ? (
    <>
      <SmoothScroll />
      <MotionDirector />
      <Preloader />
      <CustomCursor />
      <MagneticButtons />
    </>
  ) : null;
}
