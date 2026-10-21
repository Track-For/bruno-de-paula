import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import ArticleGrid from "@/components/articles/ArticleGrid";
import { TextLink } from "@/components/ui/Button";
import { articles } from "@/data/articles";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Artigos e perspectivas",
  "Biblioteca editorial demonstrativa com informações sobre imóveis, contratos e atendimento jurídico.",
  "/artigos",
);
export default function Page() {
  const a = articles.find((a) => a.featured)!;
  return (
    <>
      <PageHero
        label="Artigos"
        title="Conhecimento para decisões mais conscientes."
        description="Perspectivas sobre o Direito e as questões da vida cotidiana. Os textos desta versão são exemplos editoriais e ainda não foram aprovados para publicação."
        path="/artigos"
      />
      <section className="section paper">
        <div className="container">
          <article className="article-featured">
            <Image
              src={a.coverImage}
              alt="Composição geométrica editorial de linhas arquitetônicas"
              width={720}
              height={480}
            />
            <div>
              <p className="eyebrow">EM DESTAQUE · DEMONSTRATIVO</p>
              <h2>{a.title}</h2>
              <p>{a.excerpt}</p>
              <TextLink href={`/artigos/${a.slug}`}>
                Ler artigo demonstrativo
              </TextLink>
            </div>
          </article>
          <ArticleGrid />
        </div>
      </section>
    </>
  );
}
