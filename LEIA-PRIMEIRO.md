# Richard TI • V25 • Correção concentrada no monitor

## O que foi corrigido

- **Tela REAL do Controle+:** a cena final utiliza a captura verdadeira enviada pelo usuário, com tela de login, logo controle+, usuário/senha e botão "Entrar no sistema". Nenhum dashboard novo foi criado.
- **Enquadramento óptico:** o mesmo arquivo original foi recortado apenas para eliminar espaço vazio, barra de tarefas e margens externas que reduziam o formulário a um pequeno bloco ilegível. Os controles e a identidade não foram substituídos. Arquivo de auditoria: `sources/controle-original-real.jpg`.
- **Nitidez:** cinco superfícies de monitor são mapeadas em 1792×1096 px e têm recorte alfa restrito ao vidro real. No HTML, cada imagem mantém sua dimensão nativa e é reduzida dentro da abertura, antes de receber o zoom de câmera. Isso evita uma renderização intermediária com apenas 448 px.
- **Fidelidade:** as telas antiga, travamento e armazenamento usam a interface antiga de referência e avisos discretos; não há IA criando novas telas de computador. O monitor preto permanece apenas na transformação.
- **Integração física:** as máscaras respeitam os quatro cantos do monitor, com queda suave de luminosidade nas bordas e um reflexo de vidro muito discreto. A moldura e a base vêm da mesma fotografia em todas as cenas.

## O que foi preservado

Toda a lógica JS da V24 foi mantida **idêntica**, incluindo rolagem contínua, os quatro diagnósticos, cards com linhas e o roteiro integral das nove cenas. Também não alteramos a mesa nem as posições dos papéis. O site publicado não foi modificado.

## Verificação

- `preview.html`: prévia em um arquivo HTML com as imagens incorporadas. Não precisa de servidor.
- `index.html` + pasta `assets/`: conteúdo para publicação estática, incluindo Vercel.
- `sources/controle-original-real.jpg`: captura original, para comparar a autenticidade da interface.
- `sources/controle-enquadramento-fiel.png`: crop óptico da mesma captura para priorizar a leitura.
- `tools/build_monitor_v25.py`: script reproduzível da projeção das telas no monitor.
- `qa/`: capturas verificadas em Chromium, com celular e desktop.

## Limitação visual importante

Os textos minúsculos de um aplicativo desktop não podem ficar tão legíveis num monitor pequeno quanto numa captura em tela cheia. O novo recorte aumenta a área útil, mas não cria detalhes inexistentes. Um zoom final mais próximo da interface poderia ampliar a leitura, porém foi intencionalmente preservado o enquadramento de câmera da V24, que já estava aprovado. Validação final no Safari integrado ao Instagram no iPhone ainda é necessária.
