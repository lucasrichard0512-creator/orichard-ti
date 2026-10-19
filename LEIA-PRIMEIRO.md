# Richard TI — V22 | Cena contínua

Esta versão substitui a composição reconstruída artificialmente da V21 por uma **única fotografia de mesa vazia** usada do início ao fim. A origem das imagens é a dupla de cenas de mesa criada a pedido do usuário; os documentos foram isolados do estado com papéis e inseridos como camadas móveis.

## Como executar

- Descompacte o projeto e abra `index.html` num servidor estático (Vercel, GitHub Pages, `python -m http.server 8000`, etc.).
- A pasta `assets/` deve permanecer ao lado do `index.html`.
- Para conferir sem servidor nem pasta separada, use o arquivo independente `richard-ti-v22-preview.html` fornecido à parte.

## Novidades

- **Uma única mesa:** não há cortes entre fotografias da mesa, nem reconstrução por grandes remendos pretos.
- **Pé e estrutura do monitor:** fazem parte da fotografia-base original e não são recortes reposicionados.
- **Tela dentro do monitor:** a interface do sistema antigo e a captura real do Controle+ são fontes separadas, projetadas por uma homografia e mantidas dentro dos cantos do vidro.
- **Quatro diagnósticos com zooms, pausa e card conectado:** computador, rede interna, armazenamento e controles manuais.
- **Papéis:** cinco grupos fotográficos de origem e 21 folhas individuais animadas em direção ao monitor. Terminada a animação, todas essas camadas somem, sem modificar a base da mesa.
- **Controles da navegação:** um gesto vertical ou evento de roda avança uma cena; a inércia não pula capítulos. Keyboard: setas, Page Up/Down, barra de espaço. Link discreto de pular no canto inferior.
- **Contato:** utiliza o WhatsApp `5562999407334` presente no código das versões anteriores da Richard TI.

## Roteiro visual (9 etapas)

1. Mesa completa com sistema antigo.
2. Aproximação fixa do computador travando, card conectado.
3. Volta ao geral e aproximação da rede interna, card conectado.
4. Volta ao geral e aproximação da falta de espaço, card conectado.
5. Volta ao geral e aproximação dos papéis/fiado, card conectado.
6. Volta à mesa e documentos começam a se levantar.
7. Folhas entram no monitor enquanto a tela escurece.
8. A mesa fica vazia e aparece a captura real do Controle+.
9. Zoom final no monitor, com chamada para contato.

## Limitações honestas

- É uma **composição 2.5D**, não um ambiente 3D com luz e física simuladas. Os fragmentos dos documentos são extraídos da foto e alguns se repetem durante o voo. Para obter realismo totalmente cinematográfico no movimento individual de cada folha, o próximo nível é um modelo 3D rigado ou renderizações em camadas feitas na mesma câmera.
- A fotografia da mesa tem **941 × 1672 px**; ampliação extrema em telas 4K mostrará a limitação da foto, embora as telas do monitor sejam fontes distintas.
- Testado no Chromium em desktop e emulaçāo móvel (360/390 px), inclusive eventos touch simulados. **Não foi testado diretamente dentro do navegador do Instagram no iPhone físico**.
- Não altera automaticamente o site já publicado em `richard-ti.vercel.app`.
