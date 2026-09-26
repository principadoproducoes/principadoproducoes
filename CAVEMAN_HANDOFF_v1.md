# CAVEMAN HANDOFF v1

APP:
Principado Produções website / GitHub Pages

WORKSTREAM:
Troca definitiva da logo pelo arquivo enviado pelo usuário

STATE:
Logo do site substituída pelo artwork fornecido pelo usuário; build e deploy verdes

MODE:
WATCH

CANONICAL SOURCE:
GitHub: principadoproducoes/principadoproducoes

CURRENT VERSION / HEAD:
3c70916e073dc214a2f5e5154dd46a5df311223f

BASE:
main

BRANCH / ENV:
main / GitHub Pages

PR / MR / TASK:
Nenhum

SPEC / ADR:
SIGA / Portable Continuation Protocol v1

DONE:
- Reconciliado o estado real antes da alteração.
- Usuário forneceu a logo oficial em PNG e autorizou substituição imediata.
- Arquivo enviado foi inspecionado: 907x620, RGB; conteúdo da marca ocupa exatamente 774x552.
- A arte fornecida foi vetorizada preservando o desenho visual e os textos PRINCIPADO / PRODUÇÕES, sem filtro de cor, sem máscara circular e sem redesign.
- Criado assets/logo-principado-upload.svg a partir diretamente do arquivo enviado.
- index.html agora usa somente assets/logo-principado-upload.svg nas três ocorrências de marca do site: header, hero e footer.
- Removidas as referências de logo-mark.svg do HTML.
- CSS final aplica o asset enviado diretamente, sem filtros, clip-path ou crop.

VERIFY:
- HEAD main: 3c70916e073dc214a2f5e5154dd46a5df311223f.
- index.html contém 3 referências a assets/logo-principado-upload.svg.
- index.html contém 0 referências a logo-mark.svg.
- GitHub Actions no HEAD 3c70916e073dc214a2f5e5154dd46a5df311223f:
  - Deploy site to GitHub Pages: success
  - pages build and deployment: success.
- A URL pública continua inacessível ao verificador web nesta sessão, portanto não declarar captura visual live pós-deploy como evidência.

GATES:
Nenhum gate humano pendente.

BLOCKERS:
Nenhum blocker de GitHub/CI. Resta apenas confirmação visual no navegador do usuário porque o verificador web não consegue abrir a publicação.

INVARIANTS:
- A imagem fornecida pelo usuário é a referência canônica da logo.
- Não usar símbolo alternativo, crop circular, filtro de inversão, deformação ou substituição por logo gerada.
- Não declarar sucesso visual live sem evidência.

NEXT:
No próximo SIGA: reconcilie HEAD/Actions → abra a publicação quando possível → compare visualmente a logo com o arquivo fornecido → corrija qualquer diferença restante → validar deploy → persistir handoff.

VERIFY-FIRST:
1. Ler HEAD da main.
2. Conferir Actions.
3. Ler index.html, style-05.css e assets/logo-principado-upload.svg.
4. Confirmar as 3 referências à nova logo e zero referências a logo-mark.svg.
5. Inspecionar página pública/screenshot quando disponível.
6. Testar navegação e funções principais.
7. Persistir estado e evidências.

MONITORING POLICY:
- Correções automáticas estão autorizadas pelo usuário após análise.
- Frequência desejada: 1 hora.
- A automação desta conta não suporta execução horária; não tratar isso como um agendamento ativo.
- Em cada ciclo: RECONCILE → CLASSIFY → EXECUTE → VERIFY → HANDOFF.