import Image from "next/image";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { company } from "@/data/company";
import { seo } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { TextLink } from "@/components/ui/Button";
import ShareArticle from "@/components/articles/ShareArticle";
import ArticleCard from "@/components/articles/ArticleCard";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a
    ? {
        ...seo(a.seoTitle, a.seoDescription, `/artigos/${slug}`),
        robots: { index: false, follow: true },
      }
    : { title: "Artigo não encontrado" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    image: company.url + a.coverImage,
    inLanguage: "pt-BR",
    mainEntityOfPage: company.url + "/artigos/" + a.slug + "/",
    ...(a.author ? { author: { "@type": "Person", name: a.author } } : {}),
  };
  return (
    <>
      <section className="page-hero navy">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Artigos", href: "/artigos" },
              { label: a.title, href: `/artigos/${slug}` },
            ]}
          />
          <p className="eyebrow">
            {a.category} · {a.readingTime} MIN DE LEITURA
          </p>
          <h1>{a.title}</h1>
          <p className="lead">{a.excerpt}</p>
          <p className="small">
            21 de outubro de 2026 · Data demonstrativa · Autoria pendente de
            validação
          </p>
        </div>
      </section>
      <section className="section paper">
        <div className="container">
          <p className="notice">
            Artigo demonstrativo — exemplo não aprovado para publicação.
            Conteúdo informativo, sujeito à revisão jurídica. Não substitui uma
            consulta individual.
          </p>
          <Image
            className="article-cover"
            src={a.coverImage}
            alt="Composição geométrica editorial"
            width={720}
            height={480}
          />
          <div className="content-grid">
            <article className="prose article-content">
              {a.content.map((s) => (
                <section id={s.id} key={s.id}>
                  <h2>{s.heading}</h2>
                  <p>{s.text}</p>
                </section>
              ))}
              <ShareArticle title={a.title} />
              <TextLink href="/artigos">Voltar aos artigos</TextLink>
            </article>
            <aside className="sidebar">
              <h2>Nesta leitura</h2>
              <nav aria-label="Sumário do artigo">
                {a.content.map((s) => (
                  <a key={s.id} href={`#${s.id}`}>
                    {s.heading}
                  </a>
                ))}
              </nav>
              <TextLink href="/contato">Fale com o escritório</TextLink>
            </aside>
          </div>
        </div>
      </section>
      <section className="section ivory">
        <div className="container">
          <div className="section-heading">
            <h2 className="display">Continue a leitura.</h2>
          </div>
          <div className="article-grid">
            {articles
              .filter((x) => x.id !== a.id)
              .map((x) => (
                <ArticleCard key={x.id} article={x} />
              ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
