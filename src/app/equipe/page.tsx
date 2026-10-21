import PageHero from "@/components/ui/PageHero";
import Team from "@/components/sections/Team";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Equipe",
  "Apresentação dos profissionais do escritório ASP. Identificação, OAB e biografias em validação.",
  "/equipe",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Equipe"
        title="A confiança se constrói entre pessoas."
        description="Um espaço dedicado à apresentação dos profissionais. Dados biográficos, registros e áreas de atuação aguardam confirmação pelo escritório."
        path="/equipe"
      />
      <Team full />
    </>
  );
}
