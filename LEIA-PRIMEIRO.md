# Richard TI — Protótipo 2.5D em camadas

Este pacote é **um experimento funcional para validar a mesa modular**, e não uma substituição da versão atualmente publicada no Vercel.

## Como testar

- Use a prévia HTML autossuficiente compartilhada na conversa; ou
- Abra `index.html` num servidor local, por exemplo `python -m http.server 8000`, e acesse `http://localhost:8000`.
- Role a página para acompanhar quatro momentos: mesa → travamento → papéis → Controle+.
- Os botões no rodapé permitem pular entre os momentos. **Ver camadas** destaca os objetos separados.

## O que está separado de verdade

- Mesa/superfície-base (`assets/desk-clean.png`), derivada da referência aprovada, sem o cenário externo.
- Monitor (`assets/monitor.png`), impressora (`assets/printer.png`) e roteador (`assets/router.png`) como imagens transparentes independentes, colocadas nas coordenadas originais.
- Tela interna do monitor como HTML transformado em perspectiva. Pode exibir estado de PDV e travamento sem ampliar texto da foto.
- Três recortes reais dos documentos originais com alfa (`assets/paper-*.png`). Esses recortes mudam posição, rotação, profundidade e escala ao serem absorvidos pela tela.
- Captura real do Controle+ (`assets/controle-original.jpg`) como imagem separada, não recriada por IA.

## Limites que ainda não foram resolvidos

- **Apenas três grupos de documentos** estão animados nesta prova de conceito. As pilhas maiores e o caderno continuam na mesa. A narrativa completa exigirá reconstruir os demais objetos, especialmente o espaço encoberto pelas pilhas.
- O preenchimento dos espaços sob as três folhas é aproximado, baseado em uma só fotografia. Ainda não há uma mesa vazia renderizada com a mesma geometria, condição ideal para remover todas as folhas sem artefatos.
- A imagem original tem 941 × 1672 px, o que limita texturas do monitor, teclado e objetos em aproximações extremas.
- Esta versão é **2.5D**, não um modelo 3D editável. Os objetos são recortes de imagem reais e a tela é renderizada no navegador.

## Produção completa

Para finalizar as nove cenas com continuidade perfeita, criar a cena com todos os objetos separados desde a origem (Blender ou render 3D equivalente), incluindo uma mesa sem papéis, e manter as mesmas coordenadas/câmera em todas as saídas. Os sprites deste protótipo servem de referência funcional e técnica, não como prova de fotorrealismo definitivo.

## Compatibilidade

Testes no Chromium com 360 × 740, 390 × 844 e 1440 × 900. Sem erros de JavaScript ou rolagem horizontal nos estados avaliados. A V11, V15, V16 e o trabalho publicado não foram alterados.
