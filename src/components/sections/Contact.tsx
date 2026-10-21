import { company } from "@/data/company";
import { whatsappUrl } from "@/lib/whatsapp";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "./ContactForm";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
export default function Contact() {
  return (
    <section className="section ivory" id="contato">
      <div className="container contact-grid">
        <div>
          <SectionLabel number="08">Contato</SectionLabel>
          <h2 className="display" data-reveal>
            O primeiro passo
            <br />é uma <em>conversa.</em>
          </h2>
          <p>Conte-nos, de forma breve, como podemos orientar você.</p>
          <div className="contact-details">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Phone size={19} />
              <span>
                {company.phone}
                <small>Telefone e WhatsApp</small>
              </span>
              <ArrowUpRight size={18} />
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address + " " + company.neighborhood)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={19} />
              <span>
                {company.address}
                <small>{company.neighborhood} · Abrir mapa</small>
              </span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
