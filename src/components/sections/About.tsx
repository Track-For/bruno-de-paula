import Image from "next/image";
import DisplacementPlane from "@/components/webgl/DisplacementPlane";
import { company } from "@/data/company";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
export default function About() {
  return (
    <section className="section ivory">
      <div className="container about-grid">
        <div className="architect-image" data-parallax>
          <Image
            src="/images/architecture.svg"
            width={720}
            height={840}
            alt="Composição editorial abstrata de planos arquitetônicos"
          />
          <DisplacementPlane />
          <span>ESTRUTURA & PROPORÇÃO / ESTUDO VISUAL</span>
        </div>
        <div className="about-copy">
          <SectionLabel number="04">O escritório</SectionLabel>
          <h2 className="display" data-reveal>
            {company.office}
          </h2>
          <p>{company.officeBody}</p>
          <TextLink href="/escritorio">Conheça o escritório</TextLink>
          <div className="values">
            {company.values.map((v) => (
              <div key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
