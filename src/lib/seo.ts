import type { Metadata } from "next";
import { company } from "@/data/company";
export function seo(title: string, description: string, path = ""): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${company.url}${path}/` },
    openGraph: {
      title,
      description,
      url: `${company.url}${path}/`,
      locale: "pt_BR",
      type: "website",
      siteName: company.name,
      images: [{ url: "/images/Logo.png", width: 490, height: 219 }],
    },
  };
}
export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: company.url + item.href,
    })),
  };
}
