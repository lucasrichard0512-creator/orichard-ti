# Richard TI — V26 (monitor com perspectiva e parallax)

Esta versão mantém o roteiro, a rolagem contínua, os cards e a mesa fotográfica da V25. Alterações:

1. Todas as telas são projetadas diretamente na área interna real do monitor (quadrilátero da fotografia), com textura de origem em 3x e bordas transparentes para não invadir a moldura.
2. A imagem final é a captura **real** do formulário de login Controle+, não o dashboard de PDV fictício.
3. O objeto `pen-foreground.png` recoloca, na frente da tela, a ponta da caneta que cruza o vidro.
4. A câmera acrescenta um deslocamento vertical progressivo do conjunto conforme a rolagem. Nos zooms, a compensação reduz o deslocamento para preservar o enquadramento.
5. Os cinco estados do monitor podem ser regenerados pelo script `make_monitor.py` (Python com Pillow, NumPy e OpenCV).

## Como publicar

Publique o conteúdo desta pasta, deixando `index.html` e `assets/` lado a lado. Também existe uma prévia HTML autossuficiente fora deste ZIP.

## Limitações conhecidas

- A tela do Controle+ é uma captura real de 1600×900 de uma interface com muitos detalhes finos. Numa imagem pequena na abertura, elementos minúsculos não serão perfeitamente legíveis. A nova projeção evita reenquadramento incorreto e recompressões repetidas, mas não pode criar detalhes inexistentes na fonte.
- Esta é uma cena 2.5D e não um modelo 3D completo.
- A validação automatizada foi no Chromium com larguras de 360, 390 e 1440 pixels. A experiência ainda deve ser avaliada no Safari e no navegador do Instagram em iPhone.
- O site publicado na Vercel não foi modificado.
