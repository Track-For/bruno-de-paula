import { Link } from "next-view-transitions";
import { breadcrumbSchema } from "@/lib/seo";
export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const all = [{ label: "Início", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Navegação estrutural">
        <ol>
          {all.map((item, i) => (
            <li key={item.href}>
              {i === all.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(all)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}
