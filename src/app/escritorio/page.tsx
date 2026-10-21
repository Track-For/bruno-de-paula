import PageHero from "@/components/ui/PageHero";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import { Button, TextLink } from "@/components/ui/Button";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "O escritório",
  "Conheça a proposta institucional e os princípios de atendimento da ASP em São Paulo.",
  "/escritorio",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="O escritório"
        title="Relações construídas com confiança."
        description="Uma apresentação do nosso modo de compreender o Direito: com atenção às pessoas, às histórias e às particularidades de cada situação."
        path="/escritorio"
      />
      <About />
      <section className="section paper">
        <div className="container prose">
          <p className="notice">
            Apresentação institucional proposta, sujeita à aprovação.
          </p>
          <h2>Uma história a ser apresentada com precisão.</h2>
          <p>
            O histórico do escritório, sua fundação e a trajetória dos
            profissionais serão incluídos após validação. Esta versão utiliza
            apenas as informações fornecidas para o projeto, sem atribuir tempo
            de experiência, certificações ou resultados.
          </p>
          <div className="hero-actions">
            <Button href="/equipe">Conheça a equipe</Button>
            <TextLink href="/contato">Informações sobre atendimento</TextLink>
          </div>
        </div>
      </section>
      <Process />
    </>
  );
}
