import { company } from "@/data/company";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
export default function Philosophy() {
  return (
    <section className="section ivory" id="essencia">
      <div className="container essence-grid">
        <SectionLabel number="01">Nossa essência</SectionLabel>
        <div>
          <h2 className="display" data-reveal>
            O Direito exige conhecimento.
            <br />
            <em>A confiança exige proximidade.</em>
          </h2>
          <div className="essence-bottom">
            <span className="architect-mark" aria-hidden="true">
              A<span>/</span>SP
            </span>
            <div>
              <p>{company.essenceBody}</p>
              <TextLink href="/escritorio">
                A essência do nosso trabalho
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
