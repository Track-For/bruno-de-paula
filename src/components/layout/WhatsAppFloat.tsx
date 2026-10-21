import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp (abre em outra aba)"
    >
      <MessageCircle size={21} />
      <span>Vamos conversar</span>
    </a>
  );
}
