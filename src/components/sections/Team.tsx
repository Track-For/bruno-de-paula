import Image from "next/image";
import { attorneys } from "@/data/attorneys";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
export default function Team({ full = false }: { full?: boolean }) {
  return (
    <section className="section paper">
      <div className="container team-grid">
        <div>
          <SectionLabel number="05">
            Pessoas por trás da orientação
          </SectionLabel>
          <h2 className="display" data-reveal>
            A proximidade
            <br />
            tem um lado <em>humano.</em>
          </h2>
          <p>
            Conheça quem faz parte do escritório. A apresentação dos
            profissionais está em preparação para validação.
          </p>
          {!full && <TextLink href="/equipe">Conheça a equipe</TextLink>}
        </div>
        {attorneys.map((p) => (
          <article className="team-profile" key={p.id}>
            <div className="team-photo">
              <Image
                src={p.image}
                alt="Retrato fornecido; identificação profissional pendente de validação"
                width={850}
                height={858}
                sizes="(max-width: 767px) 90vw, 35vw"
              />
            </div>
            <div className="team-caption">
              <h3>{p.name}</h3>
              <p>{p.oab}</p>
              {full && <p>{p.bio}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
