import { company } from "@/data/company";
export const whatsappUrl = (
  message = "Olá, gostaria de informações sobre o atendimento do escritório.",
) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
