import ShaderFallback from "@/components/webgl/ShaderFallback";
import { company } from "@/data/company";
import GoldThread from "@/components/motion/GoldThread";
export default function Manifesto() {
  return (
    <section className="manifesto navy">
      <div className="container">
        <span className="eyebrow">A ARQUITETURA DA JUSTIÇA</span>
        <h2 data-manifesto>{company.manifesto}</h2>
        <ShaderFallback />
        <span className="manifesto-note">
          Equilíbrio para compreender. Clareza para orientar.
        </span>
        <GoldThread />
      </div>
    </section>
  );
}
