import { Button } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <section className="not-found navy">
      <div className="container">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          ASP / 404
        </p>
        <h1>
          Vamos encontrar
          <br />
          um novo caminho.
        </h1>
        <p>Esta página não foi encontrada.</p>
        <Button href="/">Voltar ao início</Button>
      </div>
    </section>
  );
}
