# Richard.TI — V11 Plano-sequência

Implementação funcional do blueprint GSAP aprovado na conversa.

## O que mudou
- Uma única timeline normalizada em 0–100.
- Um único palco/câmera: sem cards de etapa, sem contador, sem cortes secos.
- Rede -> falha -> diagnóstico -> processos -> sistema -> Controle+ -> Richard.TI.
- Scroll curto: ~2.85 viewports desktop e ~2.40 mobile.
- Controle+ é o clímax e ocupa quase todo o viewport útil.
- Mobile usa o mesmo roteiro com outro enquadramento.

## Dependência
GSAP 3.13 + ScrollTrigger via CDN. Ao publicar em Vercel, a dependência carrega normalmente.

## Imagens do Controle+
A screenshot atual é provisória, herdada da versão anterior. Basta substituir `assets/projeto/dashboard.png` pela tela atual mantendo o mesmo nome, ou alterar o `src` em `index.html`.
