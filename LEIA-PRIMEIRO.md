# Richard TI • V23: rolagem contínua

Esta versão modifica a navegação da V22 sem mudar as nove etapas do roteiro, os objetos, as telas do monitor e a identidade visual.

## O que mudou

- A área rolável usa **rolagem nativa** (`touch-action: pan-y`) e não intercepta nem bloqueia gestos.
- Removemos `scroll-snap: mandatory`, os timers das transições e a lógica de um gesto obrigatório por capítulo.
- A câmera, cards, linhas conectadas ao equipamento, telas do monitor e papéis são interpolados em uma **linha do tempo contínua**, inclusive durante deslizes longos.
- Incluímos amortecimento temporal com limite de velocidade visual para um gesto rápido não fazer os cards desaparecerem instantaneamente.
- A primeira aproximação atinge o foco após aproximadamente **0,53 altura de tela rolada**. Cada diagnóstico tem tempo visual de permanência e retorno ao plano geral.
- Testes no Chromium mobile com gestos de toque simulados confirmaram chegada ao primeiro foco com um único deslize de cerca de 500px; desktop 1440px e celular 390px sem erros de JS.
- Respeita `prefers-reduced-motion`.

## Como abrir

Abra o `index.html` (os arquivos da pasta `assets/` devem permanecer ao lado dele). Para publicar na Vercel, use a pasta deste ZIP com `index.html` na raiz.

`preview.html` é uma prévia autossuficiente com os recursos embutidos, para experimentar sem servidor ou hospedagem.

## Ajustes finos

Em `index.html`, procure:

- `const END=7.05`: quantidade total de alturas de tela que completam o roteiro.
- `const beats=[...]`: posições de início, zoom completo, permanência e retorno de cada dor. O primeiro zoom é `.53`, equivalente a aproximadamente meio deslize de tela.
- `const speed=inFocus?1.04:1.72`: limite de velocidade visual, em alturas de tela por segundo. Valores ligeiramente maiores dão uma animação mais responsiva em rolagens muito rápidas; valores menores prolongam a leitura.
- `1-Math.exp(-12*dt)`: suavidade do acompanhamento. Maior aproxima a câmera da rolagem de forma mais imediata.

Evite ressuscitar `scroll-snap`, `touch-action:none`, o bloqueio por capítulo ou timers entre as cenas: eram as causas do efeito de rolagem por degraus.

## Limitações

A cena continua sendo 2.5D fotográfica, e não 3D modelado. O Safari dentro do Instagram em um iPhone real ainda precisa ser validado após a publicação de teste. Esta versão não altera seu site público automaticamente.
