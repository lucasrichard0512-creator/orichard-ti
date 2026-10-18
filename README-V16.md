# Richard TI · V16 Cinematográfica

Esta versão reconstrói a experiência do site original para a história da mesa de comércio.

## Como abrir

- **Mais simples:** abra o arquivo `PREVIEW-V16.html` (distribuído separadamente) em um navegador atual. Ele contém CSS, JavaScript e imagens embutidos.
- **Para desenvolver/publicar:** extraia o ZIP, abra a pasta pelo VS Code e use Live Server, ou no Windows rode `py -m http.server 8000` na pasta extraída. Depois acesse `http://localhost:8000`.
- **Para colocar no ar:** envie o conteúdo extraído para a raiz do repositório GitHub ligado ao seu projeto Vercel. O arquivo inicial é **`index.html`**. O ZIP não publica automaticamente.

## Alterações da V16

1. Abertura cinematográfica sem cards antecipados, com a identidade preto, branco e verde-limão.
2. Uma única fotografia-mestre para todos os movimentos de câmera, com focos específicos para celular e desktop.
3. Painéis de diagnóstico aparecem somente na dor correspondente e são ligados por linha ao ponto analisado.
4. A tela do computador recebe estados de interface renderizados em HTML/CSS, mantendo texto nítido no zoom.
5. Rede interna representada como falha de comunicação entre equipamentos locais, não como queda de internet do provedor.
6. Papéis em movimento com texturas extraídas da própria fotografia, recortes com transparência e substituição localizada das regiões de onde saem.
7. Monitor escurece na transformação; só então surge a captura **real** do Controle+.
8. Copy de cada quadro sincronizada à rolagem, com chamada para WhatsApp no fechamento.
9. Respeita a preferência de movimento reduzido.

## Roteiro preservado

Mesa inteira → computador travando → problema de rede interna → armazenamento cheio/arquivos em risco → fiados e controles manuais → papéis levantando → papéis entrando no monitor preto → Controle+ → zoom final no monitor.

## Limites conhecidos

A fotografia aprovada tem apenas **941 × 1672 pixels**, com relativamente poucos pixels reais no monitor e nos documentos. A V16 usa sobreposições nítidas para os avisos e o produto, mas o cenário fotográfico não vira 3D nativo. A retirada dos papéis também exige reconstruir regiões antes encobertas por eles; a reconstrução é uma aproximação, não uma segunda fotografia autêntica do mesmo ambiente.

Para eliminar completamente esse limite visual, será necessária uma cena com **camadas originais independentes** ou um cenário 3D/modelado com os documentos como objetos distintos, ou ainda uma sessão fotográfica com e sem papéis no mesmo tripé.

## Preservação

- `index-v11.html`: HTML da V11 anterior.
- `historico/v15-original.zip`: cópia integral da V15 de origem para recuperação.
- O novo `index.html` é a página principal V16.

## Testes executados

Testes visuais reais via Chromium com prévia HTML autossuficiente: viewport de **390 × 844** e **1440 × 900**. As etapas inspecionadas não apresentaram erros de JavaScript nem rolagem horizontal. Arquivos do projeto verificados com `node --check` e inventário de ativos.
