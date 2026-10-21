import LegalPage from "@/components/ui/LegalPage";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Política de Privacidade",
  "Minuta de privacidade do protótipo ASP, pendente de revisão jurídica e técnica.",
  "/privacidade",
);
export default function Page() {
  return <LegalPage type="privacidade" />;
}
