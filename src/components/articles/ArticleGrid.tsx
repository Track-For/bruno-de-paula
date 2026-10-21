"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { articles } from "@/data/articles";
import ArticleCard from "./ArticleCard";
import { Flip } from "@/lib/gsap";
export default function ArticleGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [limit, setLimit] = useState(6);
  const container = useRef<HTMLDivElement>(null);
  const state = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = articles.filter(
    (a) =>
      (category === "Todas" || a.category === category) &&
      normalize(a.title + " " + a.excerpt).includes(normalize(query)),
  );
  const capture = () => {
    if (
      container.current &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      state.current = Flip.getState(
        container.current.querySelectorAll(".article-card"),
      );
  };
  useLayoutEffect(() => {
    if (!state.current) return;
    const tween = Flip.from(state.current, {
      duration: 0.4,
      ease: "power2.out",
      absolute: false,
    });
    state.current = null;
    return () => {
      tween.kill();
    };
  }, [query, category]);
  return (
    <>
      <div className="filters">
        <div className="filter-field">
          <label htmlFor="article-search">Buscar por título ou resumo</label>
          <input
            id="article-search"
            type="search"
            placeholder="O que você procura?"
            value={query}
            onChange={(e) => {
              capture();
              setQuery(e.target.value);
              setLimit(6);
            }}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="article-category">Categoria</label>
          <select
            id="article-category"
            value={category}
            onChange={(e) => {
              capture();
              setCategory(e.target.value);
              setLimit(6);
            }}
          >
            {["Todas", ...new Set(articles.map((a) => a.category))].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="result-count" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"} ·
        conteúdos demonstrativos
      </p>
      <div className="article-grid" ref={container}>
        {filtered.slice(0, limit).map((a) => (
          <ArticleCard article={a} key={a.id} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <p>Nenhum artigo corresponde à sua busca.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("Todas");
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
      {filtered.length > limit && (
        <button className="button" onClick={() => setLimit((l) => l + 6)}>
          Carregar mais artigos
        </button>
      )}
    </>
  );
}
