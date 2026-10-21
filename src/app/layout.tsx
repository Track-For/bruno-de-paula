import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { company } from "@/data/company";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MotionLayer from "@/components/layout/MotionLayer";
import "./globals.css";
import "./refinements.css";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-label",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "ASP | Andrade, Scarpelli & Paula — Advogados Associados",
    template: "%s | ASP Advogados",
  },
  description: company.introduction,
  robots: { index: false, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="pt-BR"
        className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      >
        <body>
          <a href="#conteudo" className="skip-link">
            Pular para o conteúdo
          </a>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <MotionLayer />
        </body>
      </html>
    </ViewTransitions>
  );
}
