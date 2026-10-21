import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles";
export default function ArticleCard({ article: a }: { article: Article }) {
  return (
    <article className="article-card" data-reveal>
      <Link href={`/artigos/${a.slug}`} data-cursor="LER">
        <div className="article-image">
          <Image
            src={a.coverImage}
            alt="Estudo geométrico editorial"
            width={720}
            height={480}
          />
          <span>EXEMPLO EDITORIAL</span>
        </div>
        <div className="article-meta">
          <span>{a.category}</span>
          <span>{a.readingTime} min de leitura</span>
        </div>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
        <div className="article-bottom">
          <time dateTime={a.publishedAt}>21 OUT 2026 · DEMONSTRATIVO</time>
          <ArrowUpRight size={19} />
        </div>
      </Link>
    </article>
  );
}
