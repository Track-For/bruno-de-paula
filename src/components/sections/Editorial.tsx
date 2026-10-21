import { articles } from "@/data/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
export default function Editorial() {
  return (
    <section className="section paper">
      <div className="container">
        <div className="section-heading">
          <div>
            <SectionLabel number="06">
              Perspectivas / Conteúdo jurídico
            </SectionLabel>
            <h2 className="display" data-reveal>
              Conhecimento para decisões
              <br />
              <em>mais conscientes.</em>
            </h2>
          </div>
          <TextLink href="/artigos">Todos os artigos</TextLink>
        </div>
        <p className="editorial-notice">
          Conteúdos demonstrativos, não aprovados para publicação.
        </p>
        <div className="article-grid">
          {articles.map((a) => (
            <ArticleCard article={a} key={a.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
