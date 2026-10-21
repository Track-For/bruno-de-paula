import { company } from "@/data/company";
import SectionLabel from "@/components/ui/SectionLabel";
export default function Process() {
  return (
    <section className="section navy">
      <div className="container">
        <SectionLabel number="07">Como funciona o atendimento</SectionLabel>
        <h2 className="display" data-reveal>
          Clareza desde
          <br />
          <em>a primeira conversa.</em>
        </h2>
        <div className="process-grid">
          {company.steps.map((s, i) => (
            <div key={s.title} data-reveal>
              <span className="process-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
