# Relatório de entrega — ASP Advocacia

Data: 21 de outubro de 2026. Branch: `site-asp-advocacia`.

## Resultado

Frontend institucional responsivo para Andrade, Scarpelli & Paula — Advogados Associados, com linguagem editorial em marinho, marfim e dourado. São 21 páginas de conteúdo, 404 institucional, sitemap e robots; o processo do Next gera 27 entradas estáticas contando suas entradas internas.

A home apresenta essência, áreas, manifesto, escritório, equipe, artigos, processo de atendimento e contato. As áreas não confirmadas, os perfis incompletos e os artigos de exemplo estão identificados. Não há Direito Tributário, depoimentos, números de resultados ou credenciais inventadas.

**Somente frontend:** nenhum backend, CMS, API própria, banco, autenticação ou painel. O formulário não envia requisição POST: prepara um link para WhatsApp. Nenhum push, deploy ou alteração no site atual foi realizado.

## As 20 etapas

| Etapa | Status | Implementação e observações |
| --- | --- | --- |
| 01 Fundação | Concluída | Next 15.5.28, React 19.1, TS estrito, Tailwind 4, GSAP, Lenis e Three |
| 02 Design system | Concluída | Tokens do briefing, três famílias tipográficas, grid, bordas e foco visível |
| 03 Páginas | Concluída | Todas as rotas solicitadas; conteúdo local tipado e exportação estática |
| 04 Preloader | Concluída com adaptação | Abertura tipográfica e linha de equilíbrio, inferior a 2,5 s, uma vez por sessão; desktop com WebGL apenas |
| 05 Hero | Concluída | Retrato fornecido otimizado, SplitText e composição dourada decorativa |
| 06 ScrollTrigger | Concluída | Reveals, manifesto progressivo, progress bar, contexto e cleanup por rota |
| 07 Parallax | Concluída | Deslocamento interno moderado da ilustração e transformação do hero |
| 08 Shader balança | Concluída com adaptação | Linhas procedurais, formação inicial e reorganização arquitetônica no scroll; narrativa entre capítulos usa também SVG |
| 09 Linha dourada | Concluída | Traçado SVG desenhado com stroke-dashoffset e ScrollTrigger |
| 10 Zoom | Adaptada | Clip-path/transform no hero e escala moderada de elemento editorial; as três transições de zoom entre seções não foram reproduzidas literalmente |
| 11 Áreas | Concluída | Grid na home; catálogo horizontal nativo com controles e teclado no índice; vertical no mobile |
| 12 Displacement | Adaptada | Shader UV na ilustração arquitetônica; preserva o retrato. Não há troca de imagens por especialidade |
| 13 Manifesto | Concluída | Revelação progressiva de palavras e geometria simétrica discreta |
| 14 Equipe | Adaptada | Retrato real e hover suave; sem nomes/OAB inventados. Flip aplicado aos filtros editoriais, onde há mudança de layout real |
| 15 Artigos | Concluída | Busca local, categoria, estado vazio, paginação condicional, páginas individuais e compartilhamento |
| 16 Cursor | Concluída | Halo contextual LER/EXPLORAR apenas desktop com movimento permitido; cursor nativo preservado |
| 17 Botões | Concluída | Magnetismo moderado, setas e underline, foco visível |
| 18 Footer | Concluída com adaptação | Marca em grande escala, divisórias e final gráfico; sem animação contínua ou pinning |
| 19 Responsividade | Concluída | 1440, 768, 390 e 360 px, sem overflow horizontal nas páginas testadas |
| 20 Polimento | Concluída com pendências de publicação | Build, lint, TS, testes, axe, Lighthouse, capturas e documentação; revisão jurídica e aprovação ainda necessárias |

Os detalhes dessas escolhas estão em `DECISOES.md`. Não se afirma implementação literal de cada efeito sugerido no briefing. A prioridade foi manter leitura, sobriedade e desempenho.

## Rotas

```text
/
/escritorio/
/equipe/
/areas-de-atuacao/
/areas-de-atuacao/direito-imobiliario/
/areas-de-atuacao/direito-civil/
/areas-de-atuacao/familia-e-sucessoes/
/areas-de-atuacao/direito-trabalhista/
/areas-de-atuacao/direito-empresarial/
/areas-de-atuacao/direito-do-consumidor/
/areas-de-atuacao/direito-previdenciario/
/areas-de-atuacao/direito-contratual/
/areas-de-atuacao/direito-administrativo/
/areas-de-atuacao/direito-digital/
/artigos/
/artigos/documentos-do-imovel/
/artigos/leitura-cuidadosa-dos-contratos/
/artigos/preparar-primeiro-atendimento/
/contato/
/privacidade/
/termos/
/404.html
/sitemap.xml
/robots.txt
```

## Movimento e shaders

- `MotionLayer`: carrega efeitos avançados somente em desktop, ponteiro fino e sem movimento reduzido.
- `MotionDirector`: SplitText, ScrollTrigger, parallax, manifesto, linha dourada, transformações e indicador de leitura.
- `SmoothScroll`: Lenis sincronizado ao ticker GSAP; desmontagem remove ticker e instância.
- `MagneticButtons`, `CustomCursor`, `Preloader`, `HorizontalScroll`, `GoldThread`.
- `ArticleGrid`: Flip nas mudanças dos filtros, com desativação para movimento reduzido.
- `next-view-transitions`: navegação com fallback nativo e desativação visual para movimento reduzido.
- `JusticeThreads` / `BalanceShader`: BufferGeometry de segmentos e GLSL de formação, deslocamento leve, transparência e progresso de scroll. DPR até 1.5; pausa fora do viewport e descarte de geometria.
- `DisplacementPlane` / `DisplacementCanvas`: textura local por Drei e deslocamento UV suave; fallback é a imagem HTML original.
- `ShaderFallback`: SVG sempre disponível sob a camada WebGL. Perda de contexto oculta o canvas; error boundaries preservam o restante do site.

O teste de movimento encontrou um canvas no hero e dois após chegar à ilustração; não registrou erros de página ou console durante scroll e navegação de ida e volta. Evidência: `docs/motion-check.json`.

## Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado; exportação em `out/` |
| `npm run lint` | Aprovado, sem avisos na execução final |
| `npx tsc --noEmit` | Aprovado |
| Playwright | 8 testes aprovados |
| Rotas e links | Páginas estáticas, H1 único, idioma e links internos verificados |
| Formulário | Validação, preparo de URL, invalidação ao editar e ausência de POST verificados |
| Menu | Abertura, Escape, retorno de foco e navegação mobile verificados |
| JavaScript desabilitado | Home e conteúdo editorial permanecem legíveis |
| axe-core | Zero violações WCAG A/AA nas cinco páginas verificadas |
| Overflow | Ausente em 1440, 768, 390 e 360 px nas páginas principais testadas |
| Lighthouse mobile | Performance **83**, Accessibility **100**, SEO **69**, CLS **0** |

A medição Lighthouse foi executada sobre a exportação estática local em Edge Chromium. A pontuação SEO 69 decorre do `noindex` deliberado para conteúdo ainda não aprovado; a meta ≥95 não foi atingida nesta configuração. Não foi removido o bloqueio apenas para elevar a nota. Performance atingiu a meta ≥80; acessibilidade atingiu ≥95; CLS ficou abaixo de 0,05. Esses números são de laboratório, não garantia de métricas em produção.

Artefatos: `docs/test-results.json`, `docs/accessibility.json`, `docs/lighthouse-mobile.json`, `docs/motion-check.json` e `docs/screenshots/`.

Capturas finais: `home-1440.png`, `home-768.png`, `home-390.png`, `home-360.png`, `hero-desktop.png` e `hero-motion.png`. As capturas da página completa percorrem o conteúdo antes para carregar as imagens sob demanda.

## Conteúdo pendente de validação

- Autorização do logo e retrato, identificação profissional e OAB.
- Histórico do escritório, biografias, atribuições e especialidades efetivas.
- Confirmação das nove áreas propostas.
- Aprovação dos textos institucionais e substituição dos artigos demonstrativos.
- Revisão de publicidade profissional e das minutas legais.
- Identificação do responsável por privacidade e confirmação das práticas da hospedagem.

O site atual foi consultado apenas como referência institucional: https://advocaciaasp.com.br/. O material `Avaliação.png` não foi reutilizado. Os SVGs são estudos gráficos locais, não fotografias do escritório. Lista completa em `PENDENCIAS.md`.

O audit de dependências de produção registra sete avisos altos remanescentes, ligados à cadeia de ferramentas herdadas. O aviso transitivo de PostCSS foi corrigido com override. Não foi aplicado `audit fix --force`, pois implicaria mudanças incompatíveis nos pacotes preexistentes. Ver `docs/audit-production.json`.

## Executar, publicar e evoluir

```bash
npm install
npm run dev
```

Para versão estática: `npm run build` e `npm run preview`. O build gera os arquivos em `out/`; a publicação futura deve servir essa pasta e configurar `404.html`, HTTPS e cache. Não usar `next start` para `output: 'export'`.

Antes de publicar: validar conteúdos e autorizações, revisar domínio/canonicals, retirar os bloqueios de indexação somente do conteúdo aprovado e repetir as verificações. A hospedagem Hostinger atual não foi acessada ou modificada.

Para publicação semanal sem programação, será necessária uma etapa futura de integração de CMS e automação de rebuild. `DOCUMENTACAO_CMS_FUTURO.md` descreve o contrato `Article`, adaptadores, componentes afetados, opções Sanity/Strapi/WordPress e custos a validar. Não há promessa de painel já disponível.
