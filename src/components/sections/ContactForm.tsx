"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
export default function ContactForm() {
  const [prepared, setPrepared] = useState("");
  return (
    <form
      className="contact-form"
      onChange={() => setPrepared("")}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setPrepared(
          whatsappUrl(
            `Olá, meu nome é ${String(data.get("name")).trim()}. Assunto: ${data.get("subject")}. ${String(data.get("message")).trim()}`,
          ),
        );
      }}
    >
      <p className="eyebrow">PREPARE SUA MENSAGEM</p>
      <label htmlFor="contact-name">Como podemos chamar você?</label>
      <input
        id="contact-name"
        name="name"
        autoComplete="given-name"
        placeholder="Seu nome"
        required
        minLength={2}
        maxLength={80}
      />
      <label htmlFor="contact-subject">
        Sobre qual assunto gostaria de conversar?
      </label>
      <select name="subject" id="contact-subject" required defaultValue="">
        <option value="" disabled>
          Selecione um assunto
        </option>
        <option>Imóveis e regularização</option>
        <option>Informações sobre atendimento</option>
        <option>Outro assunto jurídico</option>
      </select>
      <label htmlFor="contact-message">Uma breve mensagem</label>
      <textarea
        id="contact-message"
        name="message"
        rows={3}
        required
        minLength={10}
        maxLength={1000}
        placeholder="Descreva o assunto sem incluir dados sensíveis."
      />
      <p className="small">
        Este formulário apenas prepara uma mensagem no seu navegador. Nada é
        enviado ou armazenado pelo site. Ao abrir o WhatsApp, aplicam-se as
        práticas de privacidade desse serviço.
      </p>
      <button className="button" type="submit">
        Preparar mensagem <ArrowUpRight size={17} />
      </button>
      <div aria-live="polite">
        {prepared && (
          <a
            className="prepared-link"
            href={prepared}
            target="_blank"
            rel="noopener noreferrer"
          >
            Mensagem pronta. Abrir WhatsApp <ArrowUpRight size={18} />
          </a>
        )}
      </div>
      <noscript>
        <p>
          Para conversar, utilize o link direto de WhatsApp ao lado. O preparo
          da mensagem requer JavaScript.
        </p>
      </noscript>
    </form>
  );
}
