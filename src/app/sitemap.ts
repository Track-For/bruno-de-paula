import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
import { practiceAreas } from "@/data/practiceAreas";
import { articles } from "@/data/articles";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    ...navigation.map((n) => n.href),
    "/privacidade",
    "/termos",
    ...practiceAreas.map((a) => `/areas-de-atuacao/${a.slug}`),
    ...articles.map((a) => `/artigos/${a.slug}`),
  ].map((path) => ({
    url: company.url + path + "/",
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
