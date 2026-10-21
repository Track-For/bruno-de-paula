# ASP — Andrade, Scarpelli & Paula

Frontend institucional em português, com direção editorial “A arquitetura da justiça”. O projeto contém home, apresentação institucional, equipe, dez áreas, biblioteca com três artigos demonstrativos, contato, páginas legais e 404.

**Não há backend, API própria, CMS, banco de dados, painel administrativo ou envio de formulário ao servidor. Nenhum deploy foi realizado.**

## Executar

Requer Node.js 20.9 ou superior e npm. Na pasta do projeto:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. O download inicial das fontes pelo `next/font` precisa de acesso à internet durante o build; os arquivos são servidos localmente no site gerado.

## Verificar e gerar arquivos estáticos

```bash
npm run build
npm run lint
npx tsc --noEmit
npm test
```

O resultado fica em `out/`. Para inspecionar essa versão localmente:

```bash
npm run preview
```

Abra `http://127.0.0.1:4173`. Os testes usam Microsoft Edge instalado, em modo headless. Em outro sistema, ajuste `channel` em `playwright.config.ts` e instale o navegador Playwright correspondente. `next start` não serve uma exportação estática; use `npm run preview`.

## Stack

- Next.js 15.5.28, App Router, React 19.1, TypeScript estrito.
- Tailwind CSS v4 e CSS editorial com tokens de marca.
- Cormorant Garamond, Manrope e IBM Plex Mono via `next/font`.
- GSAP, ScrollTrigger, SplitText, Flip, CustomEase e `@gsap/react`.
- Lenis, Three.js, React Three Fiber, Drei, shaders GLSL e fallbacks SVG.
- `next-view-transitions`, `next/image` e Lucide.
- Playwright, axe-core e Lighthouse para verificação.

## Onde editar

| Conteúdo | Arquivo |
| --- | --- |
| Identidade, telefone, endereço e apresentação | `src/data/company.ts` |
| Áreas, assuntos e confirmação de atuação | `src/data/practiceAreas.ts` |
| Artigos e campos SEO | `src/data/articles.ts` |
| Profissionais | `src/data/attorneys.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Minutas de privacidade e termos | `src/data/legal.ts` |
| Menu | `src/data/navigation.ts` |
| Tokens e responsividade | `src/app/globals.css` |
| Metadados comuns | `src/lib/seo.ts` |

Artigos têm conteúdo estruturado tipado, sem HTML arbitrário. Para adicionar um artigo, inclua um objeto `Article`, use slug único, forneça imagem local e execute novo build. A rota individual e o sitemap serão gerados a partir dos dados. A busca considera título e resumo, desconsidera acentos, e combina o termo com a categoria. O botão de carregar mais aparece quando há mais de seis resultados.

## Contato

O formulário usa validação nativa, prepara uma URL codificada para o WhatsApp e só abre o serviço quando o visitante seleciona o link resultante. Os campos ficam apenas na memória do componente e não são armazenados. Alterar o formulário invalida a mensagem anterior. Há link direto alternativo para uso sem JavaScript.

## Movimento e acessibilidade

O conteúdo já está presente no HTML. Em telas menores que 1024 px, ponteiro touch ou preferência por movimento reduzido, a camada de animação avançada não é carregada. A biblioteca editorial mantém filtros funcionais e desativa Flip com movimento reduzido. O menu usa diálogo nativo com contenção de foco, Escape e retorno ao acionador. Há link para pular ao conteúdo e foco visível.

Os canvases são decorativos, carregados sob demanda, limitados a DPR 1.5 e pausados fora da área visível. O SVG ou a imagem HTML permanece abaixo da camada WebGL. GSAP usa contexto e reversão por rota, Lenis remove ticker e listeners no cleanup, e a geometria procedural é descartada ao desmontar.

## Publicação futura

1. Resolver os itens de `PENDENCIAS.md`, em especial revisão jurídica, OAB, autorizações e áreas confirmadas.
2. Revisar domínio e canonicals em `company.ts`.
3. Remover o `noindex` global de `src/app/layout.tsx` somente quando o site estiver aprovado. Os artigos demonstrativos também possuem bloqueio próprio.
4. Executar build, lint, TypeScript e testes.
5. Em hospedagem estática, enviar **o conteúdo de `out/`**, preservando pastas, `_next/`, imagens, `robots.txt`, `sitemap.xml` e `404.html`. Configurar a página 404 e HTTPS no provedor.
6. Na Vercel, configurar o projeto Next.js com o build existente e validar o resultado em ambiente de preview antes de apontar o domínio. Não há necessidade de executar aplicação Node em produção para esta exportação.

Na Hostinger, confirmar se o plano contratado permite servir arquivos estáticos e configurar domínio, HTTPS, página de erro e cache. Não substituir o site atual antes da aprovação. Nenhuma configuração de hospedagem foi alterada nesta entrega.

## Documentação

- `RELATORIO.md`: escopo, etapas, rotas e evidências.
- `DECISOES.md`: escolhas de implementação e adaptações.
- `PENDENCIAS.md`: validações para publicação e limitações.
- `DOCUMENTACAO_CMS_FUTURO.md`: evolução editorial sem implementar CMS agora.
- `docs/screenshots/`: capturas responsivas.
- `docs/test-results.json`, `docs/lighthouse-mobile.json`: resultados automatizados.
- `docs/original/`: cópia dos arquivos de base antes da substituição.

Branch de trabalho: `site-asp-advocacia`. Alterações preexistentes foram preservadas. Arquivos de componentes e utilitários legados permanecem no repositório sem entrar na aplicação nova.
