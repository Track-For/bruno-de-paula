import PageHero from "@/components/ui/PageHero";
import Contact from "@/components/sections/Contact";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Contato",
  "Endereço e canais de contato da ASP em Cidade Ipava, São Paulo. Prepare uma mensagem para o WhatsApp.",
  "/contato",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Contato"
        title="Sua história merece atenção."
        description="Entre em contato para obter informações sobre o atendimento. O primeiro passo é compreender o contexto da sua demanda."
        path="/contato"
      />
      <Contact />
    </>
  );
}
