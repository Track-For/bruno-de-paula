import PageHero from "./PageHero";
import { legal } from "@/data/legal";
import { TextLink } from "./Button";
export default function LegalPage({ type }: { type: keyof typeof legal }) {
  const content = legal[type];
  return (
    <>
      <PageHero
        label={content.title}
        title={content.title}
        description={content.intro}
        path={`/${type}`}
      />
      <section className="section paper">
        <div className="container legal prose">
          <p className="notice">
            Minuta provisória. Revisão jurídica e confirmação das práticas reais
            pendentes.
          </p>
          {content.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <TextLink href="/contato">Contato institucional</TextLink>
        </div>
      </section>
    </>
  );
}
