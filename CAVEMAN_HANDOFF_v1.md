# CAVEMAN HANDOFF v1

APP:
Principado Produções website / GitHub Pages

WORKSTREAM:
Fidelidade visual da logo

STATE:
Favicon corrigido usando exatamente o PNG transparente fornecido pelo usuário como arte-base, embutido em SVG para permitir publicação via GitHub Contents API. Cache bust v=5 aplicado. Deploy e Pages build verdes.

MODE:
WATCH

CANONICAL SOURCE:
GitHub: principadoproducoes/principadoproducoes
User-supplied logo attachment is the visual reference.

CURRENT VERSION / HEAD:
62e7d3c0f5131a2ccbdf596a075cfd7d3e420a07

BASE:
main

BRANCH / ENV:
main / GitHub Pages

PR / MR / TASK:
Nenhum

SPEC / ADR:
SIGA / Portable Continuation Protocol v1

DONE:
- VERIFY-FIRST executado.
- O screenshot anterior mostrou que o desenho do favicon ainda não correspondia à marca.
- A causa foi confirmada: os favicons anteriores eram aproximações/arte alternativa.
- O PNG exato fornecido pelo usuário (128x128, RGBA, somente P/orbital branco em fundo transparente) foi usado como fonte literal.
- Criado assets/favicon-principado-exact.svg contendo o PNG exato embutido como data:image/png; nenhuma geometria foi redesenhada.
- index.html agora usa favicon-principado-exact.svg?v=5 e shortcut icon apontando para o mesmo asset.
- Header/hero/footer permanecem com a logo principal canônica.

VERIFY:
- HEAD main: c5b18461d634ba63c41b513207a97188e7b3308c.
- index.html tem 2 tags de favicon, ambas apontando para favicon-principado-exact.svg?v=5.
- SVG do favicon contém data:image/png;base64 e não contém rect/circle de fundo.
- GitHub Actions no HEAD:
  - Deploy site to GitHub Pages: success.
  - pages build and deployment: success.
- A inspeção visual da aba após esta troca ainda depende da captura do navegador do usuário; o verificador web não consegue confirmar a aba real desta publicação.

GATES:
- HEAD main: aa291fb33b76bcbc2e8aa3d74ec02e3e382a4a82.
- index.html contém favicon-principado-p.png?v=3.
- GitHub Actions no HEAD:
  - Deploy site to GitHub Pages: success.
  - pages build and deployment: success.
- O PNG foi gerado localmente e inspecionado visualmente; corresponde ao P/orbital da marca original e possui fundo transparente.
- Confirmação visual do favicon na aba do navegador ainda depende da atualização do cache do navegador do usuário.

GATES:
Nenhum.

BLOCKERS:
Nenhum GitHub/CI blocker. Favicon é armazenado em cache pelo navegador.

INVARIANTS:
- Favicon = somente símbolo P/orbital.
- Cor do símbolo = branco.
- Fundo = transparente.
- Desenho deve vir da logo original, não de um redesenho.
- Não declarar confirmação visual live da aba sem screenshot.

NEXT:
No próximo SIGA: reconciliar HEAD/Actions → revisar captura da aba e site → verificar novos erros visuais/funcionais → corrigir automaticamente conforme autorização → validar deploy → handoff.

VERIFY-FIRST:
1. HEAD main.
2. Actions.
3. index.html favicon ref.
4. asset PNG e dimensões.
5. screenshot live da aba quando disponível.
6. demais testes visuais/funcionais.
7. handoff.
- HEAD main: 1e550897f19562e320211a61eca69de680e57ebc.
- favicon-principado-p.svg: viewBox 0 0 765 600, fill branco, sem rect/circle de fundo.
- index.html: favicon aponta para favicon-principado-p.svg?v=2.
- GitHub Actions no HEAD:
  - Deploy site to GitHub Pages: success.
  - pages build and deployment: success.
- A captura visual live da aba após cache refresh ainda depende do navegador do usuário.

GATES:
Nenhum gate humano pendente.

BLOCKERS:
Nenhum blocker de GitHub/CI. Resta confirmação visual no navegador após recarregar, porque favicons podem permanecer em cache.

INVARIANTS:
- Desenho da marca deve ser preservado.
- Favicon é somente o símbolo P/orbital, em branco, fundo transparente.
- Não usar o wordmark no favicon.
- Não declarar confirmação visual live sem screenshot.

NEXT:
No próximo SIGA: reconciliar HEAD/Actions → revisar favicon/logo em screenshot → procurar outros erros visuais e funcionais → corrigir automaticamente → validar deploy → handoff.

VERIFY-FIRST:
1. HEAD main.
2. Actions.
3. index.html e favicon-principado-p.svg.
4. Confirmar favicon P/orbital branco e transparente.
5. Atualizar/limpar cache se necessário.
6. Inspecionar screenshot.
7. Testar funções do site.
8. Persistir estado/evidências.

MONITORING POLICY:
- Correção automática autorizada após análise.
- Frequência desejada: 1 hora, porém a automação disponível não suporta essa cadência.
- Fluxo: RECONCILE → CLASSIFY → EXECUTE → VERIFY → HANDOFF.
- HEAD main: 0cf307d591171b80c2d845eda3eeaf58bbc6798f.
- Header, hero and footer reference assets/logo-principado-exact.svg.
- Favicon tag references assets/favicon-principado.svg.
- Favicon contains white fill and the P-only viewBox.
- GitHub Actions for HEAD:
  - Deploy site to GitHub Pages: success.
  - pages build and deployment: success.
- Live visual screenshot of the published page is still supplied by the user; the web verifier does not reliably open this publication.

GATES:
- HEAD main: 62e7d3c0f5131a2ccbdf596a075cfd7d3e420a07.
- GitHub Actions:
  - Deploy site to GitHub Pages: success.
  - pages build and deployment: success.
- CSS contém o ajuste 82%/contain/center para header e hero.

GATES:
Nenhum gate humano pendente.

BLOCKERS:
Nenhum blocker de GitHub/CI.
Confirmação visual live final depende do navegador do usuário porque o verificador web não captura a publicação própria nesta sessão.

INVARIANTS:
- Não alterar a arte fornecida.
- Não introduzir outro símbolo.
- Não aplicar filtro de cor.
- Não permitir que o wordmark seja cortado pelas bordas circulares.
- Validar deploy antes de considerar concluído.

NEXT:
At next SIGA, compare a fresh screenshot against the reference, then inspect non-logo visual and functional regressions.

VERIFY-FIRST:
1. HEAD main.
2. Actions.
3. index.html + style-05.css + asset canônico.
4. Confirmar centralização interna dos círculos.
5. Screenshot live quando disponível.
6. Testar navegação, CTA e funções principais.
7. Persistir estado/evidências.

MONITORING POLICY:
- Correção automática autorizada pelo usuário após análise.
- Frequência desejada: 1 hora.
- A automação disponível não suporta frequência horária; não declarar agendamento horário ativo sem evidência.
- Fluxo: RECONCILE → CLASSIFY → EXECUTE → VERIFY → HANDOFF.