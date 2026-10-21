import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { company } from "@/data/company";
import { Button, TextLink } from "@/components/ui/Button";
import JusticeThreads from "@/components/webgl/JusticeThreads";
export default function Hero() {
  return (
    <section className="hero hero-editorial ivory">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" />
            ADVOCACIA EM SÃO PAULO
          </p>
          <h1 aria-label={company.hero}>
            <span className="hero-title-line">{company.heroLines[0]}</span>
            <span className="hero-title-line">{company.heroLines[1]}</span>
            <em className="hero-title-line">{company.heroLines[2]}</em>
          </h1>
          <p className="hero-description">{company.heroDescription}</p>
          <div className="hero-actions">
            <Button href="/areas-de-atuacao">
              Conheça nossas áreas de atuação
            </Button>
            <TextLink href="/escritorio">Conheça o escritório</TextLink>
          </div>
        </div>
        <div className="hero-visual">
          <span className="hero-monogram" aria-hidden="true">
            ASP
          </span>
          <JusticeThreads />
          <p className="portrait-overline">
            ANDRADE, SCARPELLI & PAULA <span>ADVOGADOS ASSOCIADOS</span>
          </p>
          <div className="portrait-frame">
            <Image
              src={company.portrait}
              alt="Retrato institucional fornecido para a apresentação do escritório ASP"
              width={850}
              height={858}
              priority
              sizes="(max-width: 767px) 90vw, 42vw"
            />
            <div className="portrait-shade" />
          </div>
          <div className="portrait-caption">
            <span>Escuta. Critério. Clareza.</span>
            <span>UMA PERSPECTIVA ATENTA A CADA SITUAÇÃO.</span>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#areas-de-atuacao">
            <ArrowDown size={16} /> Encontre seu assunto
          </a>
          <span>ANDRADE, SCARPELLI & PAULA</span>
          <span className="hero-edition">ORIENTAÇÃO COM RESPONSABILIDADE.</span>
        </div>
      </div>
    </section>
  );
}
