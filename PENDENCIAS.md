# Pendências para publicação

## Conteúdo e identificação

- Validar nome empresarial, endereço, telefone e titularidade do domínio.
- Confirmar autorização de publicação do logo e do retrato fornecidos.
- Informar nomes completos, registros OAB, biografias e escopos de atuação dos profissionais. Nenhum dado foi deduzido do arquivo `Bruno.png`.
- Confirmar quais das nove áreas propostas, além da apresentação imobiliária atual, devem ser publicadas.
- Revisar textos institucionais, princípios de atendimento e fluxo de contato.
- Substituir os três artigos demonstrativos por textos aprovados, com autoria, datas reais e referências verificadas quando aplicáveis.
- Revisar publicidade profissional, privacidade e termos antes da publicação. O protótipo não é uma certificação de conformidade jurídica.
- Identificar responsável e canal de privacidade; verificar práticas reais do provedor e serviços externos.

## Operação futura

- Não há painel editorial. A publicação atual exige editar dados e executar novo build. O caminho para CMS está documentado separadamente.
- Validar plano Hostinger, cache, domínio, HTTPS, redirecionamentos e comportamento de 404.
- Remover `noindex` apenas após aprovação; a nota SEO do Lighthouse reflete essa restrição deliberada.
- Incluir `LegalService` após confirmar identificação do prestador. Não há OAB ou autor fictício em dados estruturados.
- Rever dependências herdadas: o `npm audit` ainda aponta vulnerabilidades em ferramentas transitivas, principalmente relacionadas a glob/braces/shadcn. Não há pacote servidor em execução na exportação estática, mas o ambiente de desenvolvimento deve ser revisado antes de futuras atualizações.

## Limites da validação

- Capturas e testes em Edge Chromium headless; Safari/iOS e dispositivos físicos ainda devem ser verificados.
- Testes automáticos de acessibilidade não substituem avaliação com leitores de tela e usuários.
- Métricas Lighthouse são de laboratório local, sujeitas ao hardware e às condições da execução. Não há dados de campo.
- A animação entre capítulos foi deliberadamente moderada; ver adaptações em `DECISOES.md`. Não se afirma reprodução literal de todos os efeitos do briefing.
- Não foram fornecidos screenshots separados da referência. Foram usados os assets locais e a leitura do site atual.

Não houve push, deploy, alteração de DNS ou modificação do site atual.
