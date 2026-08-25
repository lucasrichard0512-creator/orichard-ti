# Richard.TI — Scrollytelling v3

Versão focada em narrativa visual, leitura rápida e comportamento consistente em desktop e mobile.

## Estrutura

1. Hero — proposta de valor
2. Soluções — rede → suporte → sistema
3. Controle+ — necessidade → solução sob medida → produto
4. Richard.TI — prova técnica compacta
5. Contato — CTA final

## Melhorias v3

- Correção do scrollytelling no mobile: cada mensagem agora aparece junto da animação correspondente.
- Rede: fluxo visual de pacotes e pulsos entre os pontos.
- Suporte: chamados entram em sequência e estados ganham feedback visual.
- Sistemas: interface é construída progressivamente e recebe shimmer de atividade.
- Controle+: cada etapa recebe a tela correspondente no mobile e uma linha de progresso no desktop.
- Hero com entrada sequencial e indicadores animados de Redes / Suporte / Sistemas.
- CTA flutuante de WhatsApp virou pill e só aparece depois do hero, reduzindo sobreposição.
- Mantidos UTMs, eventos de WhatsApp, GA4 e Meta Pixel preparados.
- Respeita `prefers-reduced-motion`.

## Antes de publicar

- Trocar as imagens em `assets/projeto/` pelas telas atuais do Controle+.
- Preencher `ga4Id` e `metaPixelId` no objeto `TRACKING` em `index.html`.
