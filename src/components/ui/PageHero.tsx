import Breadcrumbs from "./Breadcrumbs";
import SectionLabel from "./SectionLabel";
export default function PageHero({
  label,
  title,
  description,
  path,
}: {
  label: string;
  title: string;
  description: string;
  path: string;
}) {
  return (
    <section className="page-hero navy">
      <div className="container">
        <Breadcrumbs items={[{ label, href: path }]} />
        <SectionLabel>{label}</SectionLabel>
        <h1 data-split>{title}</h1>
        <p className="lead">{description}</p>
      </div>
      <span className="hero-rule" aria-hidden="true" />
    </section>
  );
}
