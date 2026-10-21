import PageHero from "@/components/ui/PageHero";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Contact from "@/components/sections/Contact";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Áreas de atuação",
  "Direito Imobiliário e estrutura multidisciplinar proposta para validação pelo escritório ASP.",
  "/areas-de-atuacao",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="Áreas de atuação"
        title="Uma perspectiva ampla. Um cuidado particular."
        description="O Direito Imobiliário está presente na comunicação atual do escritório. As demais áreas apresentadas são sugestões de estrutura e aguardam confirmação de atuação."
        path="/areas-de-atuacao"
      />
      <PracticeAreas all />
      <Contact />
    </>
  );
}
