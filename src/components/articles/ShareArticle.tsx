"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
export default function ShareArticle({ title }: { title: string }) {
  const [status, setStatus] = useState("");
  return (
    <>
      <button
        className="share-button"
        onClick={async () => {
          try {
            if (navigator.share) {
              await navigator.share({ title, url: location.href });
            } else if (navigator.clipboard) {
              await navigator.clipboard.writeText(location.href);
              setStatus("Link copiado.");
            } else {
              setStatus("Copie o endereço desta página na barra do navegador.");
            }
          } catch (error) {
            if (!(error instanceof DOMException && error.name === "AbortError"))
              setStatus(
                "Não foi possível compartilhar. Copie o endereço na barra do navegador.",
              );
          }
        }}
      >
        <Share2 size={17} />
        Compartilhar artigo
      </button>
      <p role="status" className="small">
        {status}
      </p>
    </>
  );
}
