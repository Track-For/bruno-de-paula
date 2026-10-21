import LegalPage from "@/components/ui/LegalPage";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Termos de Uso",
  "Termos de uso demonstrativos do website institucional ASP.",
  "/termos",
);
export default function Page() {
  return <LegalPage type="termos" />;
}
