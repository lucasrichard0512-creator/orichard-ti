# Richard.TI — V6 Cinematic Scrollytelling

Esta versão muda a arquitetura do site para uma narrativa contínua controlada pelo scroll.

## Estrutura

1. Um único palco (`.film`) de longa duração.
2. O scroll controla a timeline em JavaScript.
3. Frases curtas aparecem como legendas de um vídeo.
4. A animação explica conexão, falha, suporte, processo, software e Controle+.
5. Depois da história há apenas prova compacta e CTA.

## Controle+

As imagens atuais ainda são temporárias e ficam em `assets/projeto/`. Substitua mantendo os mesmos nomes ou altere os `src` no `index.html`.

## Performance

Não há biblioteca de animação externa. A timeline usa `requestAnimationFrame` e transforms/opacity para reduzir custo. `prefers-reduced-motion` possui fallback.
