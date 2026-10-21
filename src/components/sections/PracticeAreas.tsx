import { Link } from "next-view-transitions";
import { ArrowUpRight, Landmark } from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
export default function PracticeAreas({ all = false }: { all?: boolean }) {
  const areas = all ? practiceAreas : practiceAreas.slice(0, 6);
  return (
    <section
      className="section paper practice practice-readable"
      id="areas-de-atuacao"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <SectionLabel number="01">Áreas de atuação</SectionLabel>
            <h2 className="display" data-reveal>
              Qual assunto
              <br />
              <em>trouxe você até aqui?</em>
            </h2>
          </div>
          <div className="heading-aside">
            <p>Explore os temas abaixo e entenda o que cada área abrange.</p>
            <span className="small">
              Áreas propostas sujeitas à confirmação do escritório.
            </span>
          </div>
        </div>
        <div className="practice-grid">
          {areas.map((area, i) => (
            <Link
              href={`/areas-de-atuacao/${area.slug}`}
              key={area.slug}
              className={`practice-card ${i === 0 ? "featured-area" : ""}`}
              data-cursor="EXPLORAR"
            >
              <div className="card-top">
                <span>/{String(i + 1).padStart(2, "0")}</span>
                {i === 0 ? (
                  <Landmark size={28} strokeWidth={1} />
                ) : (
                  <ArrowUpRight size={22} />
                )}
              </div>
              <div>
                <span className="area-status">
                  {area.confirmed
                    ? "PRESENTE NO SITE ATUAL"
                    : "ATUAÇÃO A CONFIRMAR"}
                </span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <ul className="area-topics" aria-label="Assuntos relacionados">
                  {area.topics.slice(0, 2).map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
              <span className="card-link">
                Conhecer a área <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
        {!all && (
          <div className="section-end">
            <span className="small">
              Relações construídas com atenção e responsabilidade.
            </span>
            <TextLink href="/areas-de-atuacao">Explore todas as áreas</TextLink>
          </div>
        )}
      </div>
    </section>
  );
}
