import { seo } from "@/lib/seo";
import { company } from "@/data/company";
import Hero from "@/components/sections/Hero";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Editorial from "@/components/sections/Editorial";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
export const metadata = seo(
  "Andrade, Scarpelli & Paula — Advogados Associados",
  company.introduction,
);
export default function Home() {
  return (
    <>
      <Hero />
      <PracticeAreas />
      <Manifesto />
      <About />
      <Team />
      <Editorial />
      <Process />
      <Contact />
    </>
  );
}
