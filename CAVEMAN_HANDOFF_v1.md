# CAVEMAN HANDOFF v1

APP:
Principado Produções website / GitHub Pages

WORKSTREAM:
Monitoramento contínuo do site + correção definitiva da marca

STATE:
Logo oficial aplicada como asset raster exato; Pages build/deploy verde

MODE:
WATCH → deploy verde; monitoramento periódico ativo

CANONICAL SOURCE:
GitHub: principadoproducoes/principadoproducoes

CURRENT VERSION / HEAD:
f21f62a8aa0b0e74a54513053398e0d18cff237e

BASE:
main

BRANCH / ENV:
main / GitHub Pages

PR / MR / TASK:
Nenhum

SPEC / ADR:
Handoff operacional fornecido pelo usuário: SIGA / Portable Continuation Protocol v1

DONE:
- Reconciliado estado real do repositório e screenshot do usuário.
- Confirmado que a logo anterior estava visualmente incorreta.
- Substituído o mark incorreto pelo arquivo derivado diretamente do logo oficial fornecido pelo usuário, preservando o desenho original.
- Cabeçalho agora usa o recorte completo do logo oficial com símbolo + PRINCIPADO + PRODUÇÕES.
- Hero usa a logo oficial completa, incluindo os descritores de serviços.
- Footer usa o recorte do logo oficial.
- CSS deixou de aplicar recorte circular/forçado ao logo.

VERIFY:
- index.html aponta para assets/brand-header.webp no favicon/cabeçalho/rodapé e assets/brand-full.webp no hero.
- Assets existem no HEAD f21f62a8aa0b0e74a54513053398e0d18cff237e.
- A imagem local do asset foi inspecionada visualmente e corresponde à logo fornecida pelo usuário.
- GitHub Pages build/deployment para o HEAD f21f62a8aa0b0e74a54513053398e0d18cff237e: success.
- O workflow "Deploy site to GitHub Pages" do mesmo HEAD estava pendente no momento da última consulta, enquanto o job oficial de Pages já concluiu build e deploy com success.

GATES:
Nenhum gate humano pendente para esta correção.

BLOCKERS:
O ambiente desta sessão não consegue realizar uma requisição HTTP/DNS diretamente ao domínio do GitHub Pages, portanto a confirmação visual via navegador externo não foi possível aqui. A evidência disponível é o build/deploy oficial do GitHub Pages concluído com sucesso e a verificação do HTML publicado no HEAD.

INVARIANTS:
- Não declarar sucesso sem evidência.
- Não duplicar trabalho ativo.
- Estado real do GitHub vence histórico do chat.
- Preservar a estrutura e o conteúdo do site ao corrigir assets.
- Não alterar comportamento apenas para mascarar falhas.

NEXT:
Executar análise recorrente de 1 em 1 hora do site público, verificando estado real, regressões visuais e funcionais e corrigindo automaticamente o que for autorizado pelo usuário. Confirmar se os SVGs inline permanecem presentes e se o último deployment está verde. Só então continuar qualquer nova tarefa.

VERIFY-FIRST:
1. Ler HEAD da main.
2. Listar últimos runs de Actions.
3. Ler index.html e confirmar ausência de src para logo e presença dos 3 SVGs inline.
4. Se houver falha de deploy, investigar e corrigir antes de iniciar qualquer nova unidade de trabalho.
5. Persistir o resultado do monitoramento no handoff e registrar apenas estado, evidência, correção e próximo passo.


MONITORING POLICY:
- Frequência: a cada 1 hora.
- Escopo: status real do GitHub Pages, CI/CD, página pública, erros visuais e funcionais.
- Visual: inspecionar a página publicada, incluindo logo, layout, tipografia, responsividade, navegação e elementos quebrados, usando screenshot/inspeção visual quando disponível.
- Funcional: testar navegação, links, formulário/CTA, WhatsApp, assets, scripts e console/build quando a ferramenta permitir.
- Correção: o usuário autorizou previamente correções do site sem nova confirmação, exceto ações destrutivas ou gates explicitamente reservados.
- Após correção: implementar, verificar, aguardar/confirmar deploy, persistir estado e evidências neste handoff.
- Nunca declarar sucesso sem evidência.

AUTOMATION STATUS:
- O usuário solicitou análise automática de 1 em 1 hora.
- A tentativa de criar frequência horária foi rejeitada pelo plano atual; apenas frequências de uma vez, diária, semanal, mensal ou anual estão disponíveis.
- Nenhum agendamento horário foi criado, para não representar uma configuração diferente da solicitada.