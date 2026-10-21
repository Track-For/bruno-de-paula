# Publicação editorial futura

Esta entrega usa somente `src/data/articles.ts`. Não existe CMS conectado, painel ou persistência. As opções abaixo são caminhos para uma etapa posterior, não serviços já contratados.

## Contrato de conteúdo

A interface `Article` define `id`, `slug`, `title`, `excerpt`, `category`, `author`, `publishedAt`, `updatedAt`, `coverImage`, `readingTime`, `content`, `seoTitle`, `seoDescription` e `featured`. O corpo é uma lista de seções com identificador, título e texto.

Para manter os componentes independentes do fornecedor, criar futuramente uma camada `getArticles()` / `getArticleBySlug()`, executada no build, que converta a resposta do CMS nesse formato. Não expor tokens de escrita no frontend.

## Opções a avaliar

| Opção | Adequação a validar | Dependências futuras |
| --- | --- | --- |
| Sanity | Conteúdo estruturado e ambiente editorial configurável | Projeto, schemas, permissões, quotas e workflow editorial |
| Strapi | CMS com administração e API sob controle da operação | Hospedagem da aplicação, banco, backups, atualizações e permissões |
| WordPress headless | Equipe familiarizada com editor WordPress | Instância WordPress, manutenção, mídia, permissões e consumo da REST API |

Nenhuma opção foi escolhida ou instalada. Custos dependem do plano, volume, usuários, mídia, tráfego e manutenção; solicitar cotação e consultar preços vigentes antes de decidir.

## Migração sugerida

1. Aprovar taxonomia, autoria, revisão jurídica e responsáveis pela publicação.
2. Criar os tipos equivalentes ao contrato `Article` e importar os conteúdos aprovados.
3. Separar rascunhos de conteúdo publicado. Só o conteúdo aprovado deve entrar no build público.
4. Adicionar um adaptador de leitura ao build, com tratamento de falhas e validação de slugs únicos, imagens, datas e campos obrigatórios.
5. Adaptar `src/app/artigos/page.tsx`, `src/app/artigos/[slug]/page.tsx`, `Editorial`, `ArticleGrid`, artigos relacionados e `sitemap.ts` para consumir o adaptador. Manter a busca local com os dados já publicados.
6. Se o corpo evoluir para rich text, criar um renderer explícito dos blocos permitidos. Não injetar HTML arbitrário.
7. Definir pipeline de build acionado após aprovação editorial. O visitante continuará recebendo arquivos estáticos.
8. Treinar o responsável para editar, revisar e publicar pelo CMS escolhido. Somente nessa etapa será correto afirmar que existe publicação sem programação.

## Hostinger e Vercel

A exportação atual pode ser servida como arquivos estáticos. Na Hostinger, validar o plano contratado e a automação para substituir os arquivos após cada build. Um plano que apenas serve arquivos estáticos não deve ser presumido suficiente para hospedar Strapi, banco ou qualquer serviço Node.

Na Vercel, validar repositório, projeto e processo de rebuild. A automação de publicação por webhook seria parte da integração futura, com credenciais e autorização próprias. Se forem necessárias prévias privadas, renderização dinâmica ou atualização sem rebuild, revisar a arquitetura e retirar `output: 'export'` somente nessa etapa, com novo escopo.

## Fontes técnicas

Consultadas em 21/10/2026:

- [Next.js — exportação estática](https://nextjs.org/docs/app/guides/static-exports)
- [Sanity — Content Lake](https://www.sanity.io/docs/content-lake)
- [Strapi — REST API](https://docs.strapi.io/cms/api/rest)
- [WordPress — REST API](https://developer.wordpress.org/rest-api/)

Preços, quotas, condições comerciais e recursos do plano Hostinger atual não foram verificados.
