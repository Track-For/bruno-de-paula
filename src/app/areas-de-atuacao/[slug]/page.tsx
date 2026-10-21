import { notFound } from "next/navigation";
import { practiceAreas } from "@/data/practiceAreas";
import { faq } from "@/data/faq";
import { articles } from "@/data/articles";
import { seo } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import ArticleCard from "@/components/articles/ArticleCard";
export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = practiceAreas.find((a) => a.slug === slug);
  return a
    ? seo(a.title, a.description, `/areas-de-atuacao/${slug}`)
    : { title: "Área não encontrada" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = practiceAreas.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = articles.filter(
    (x) => x.category === a.title || x.category === "Orientação jurídica",
  );
  return (
    <>
      <section className="page-hero navy">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Áreas de atuação", href: "/areas-de-atuacao" },
              { label: a.title, href: `/areas-de-atuacao/${slug}` },
            ]}
          />
          <p className="eyebrow">
            {a.confirmed
              ? "ÁREA PRESENTE NO SITE ATUAL"
              : "PROPOSTA DE ÁREA · ATUAÇÃO A CONFIRMAR"}
          </p>
          <h1 data-split>{a.title}</h1>
          <p className="lead">{a.description}</p>
        </div>
      </section>
      <section className="section ivory">
        <div className="container content-grid">
          <div className="prose">
            <p className="notice">
              {a.confirmed
                ? "Texto informativo proposto. Escopo do atendimento sujeito à análise individual e à validação do escritório."
                : "Esta área integra uma proposta de organização do site. Sua atuação pelo escritório ainda não foi confirmada."}
            </p>
            <h2>Compreender o contexto é o ponto de partida.</h2>
            <p>
              {a.description} A orientação jurídica considera as informações, os
              documentos e as particularidades de cada situação. Este conteúdo
              apresenta temas gerais para uma conversa inicial, sem promessas de
              resultado.
            </p>
            <h2>Assuntos relacionados</h2>
            <ul>
              {a.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="faq">
              <h2>Perguntas frequentes</h2>
              {faq.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className="sidebar">
            <h2>Vamos compreender sua demanda?</h2>
            <p>
              Entre em contato para obter informações sobre o atendimento e
              confirmar a disponibilidade para este assunto.
            </p>
            <Button href="/contato">Entrar em contato</Button>
          </aside>
        </div>
      </section>
      <section className="section paper">
        <div className="container">
          <div className="section-heading">
            <h2 className="display">Leituras relacionadas.</h2>
            <p className="small">Exemplos editoriais não aprovados.</p>
          </div>
          <div className="article-grid">
            {related.map((x) => (
              <ArticleCard article={x} key={x.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
