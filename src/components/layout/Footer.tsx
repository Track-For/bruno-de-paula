import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
export default function Footer() {
  return (
    <footer className="site-footer navy">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="eyebrow">
              DIREITO COM CLAREZA. RELAÇÕES COM CONFIANÇA.
            </p>
            <h2>
              {company.name}
              <br />
              <span>{company.descriptor}</span>
            </h2>
          </div>
          <Link
            href="/contato"
            className="round-link"
            aria-label="Ir para contato"
          >
            <ArrowUpRight size={30} />
          </Link>
        </div>
        <div className="footer-grid">
          <p>
            {company.address}
            <br />
            {company.neighborhood}
            <br />
            <a href={`tel:+${company.whatsapp}`}>{company.phone}</a>
          </p>
          <nav aria-label="Navegação do rodapé">
            {navigation.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <p className="small">
            Conteúdo informativo. A orientação jurídica depende da análise
            individual de cada situação.
            <br />
            <br />
            {company.notice}
          </p>
        </div>
        <div className="footer-word" aria-hidden="true">
          ASP<span>—</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ASP Advogados Associados</span>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos de uso</Link>
          <span>São Paulo, Brasil</span>
        </div>
      </div>
    </footer>
  );
}
