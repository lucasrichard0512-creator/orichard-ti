# Richard.TI V12 — Cinematográfica 3D

## Escopo
Preservadas as 10 fases, textos e marcos 0–100 de `BLUEPRINT_GSAP.md`. Mantido um palco, uma câmera, uma timeline controlada por scroll.

## Mudanças implementadas
- Profundidade 3D em CSS com `perspective`, `preserve-3d`, monitor e roteador em planos diferentes.
- Animação GSAP da rotação e eixo Z do roteador; interface nasce com perspectiva 3D e volta à posição frontal.
- Atmosfera luminosa vinculada à timeline, sem adicionar novas cenas.
- Fragmentos convergem com movimentos X/Y recalculáveis e rotação X/Y e profundidade Z.
- Tela real do Controle+ entra inclinada e termina frontal, sem aumentar além do palco de modo descontrolado.
- Mais espaço de scroll para acompanhar a narrativa, principalmente em celulares.
- Desativação de profundidade no modo de movimento reduzido.

## Pendências antes do anúncio
1. Validar visualmente em celulares reais, Chrome Android e Safari iOS. Ajustar a composição conforme capturas.
2. Testar links de WhatsApp e número cadastrado; confirmar que pertence ao negócio.
3. Configurar Meta Pixel e/ou GA4 com IDs próprios (em `TRACKING`).
4. Medir carregamento e conversões; não anunciar antes do teste de ponta a ponta.
5. Caso a intenção seja WebGL/Three.js real, a etapa seguinte é modelar ativos GLB otimizados; esta V12 usa objetos CSS 3D reais, mais leves, sem alegar malhas WebGL.

## Como testar
Abra `index.html` via servidor estático, por exemplo `python -m http.server 8000` dentro da pasta e acesse `http://localhost:8000`. O GSAP vem do CDN e exige conexão. Role a página e verifique as dez fases, o produto e o CTA.
