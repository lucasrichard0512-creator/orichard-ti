# Teste 01: câmera da mesa

Abra `camera-test.html` em um servidor local ou na Vercel. O `index.html` original da V11 não foi modificado.

## O que foi implementado
- Mesa de referência preservada, sem gerar novos objetos.
- Aproximação da câmera até o monitor e retorno à mesa, comandados pelo scroll.
- Alerta de travamento como camada sobre a imagem.
- Enquadramento específico para celular e respeito ao movimento reduzido (ainda requer aperfeiçoamento para acessibilidade).
- Barra de progresso e textos comerciais curtos.

## Limitações explícitas
- A mesa de referência é JPEG com quadriculado embutido, não PNG com alfa. O arquivo definitivo deve ser recortado.
- A camada de travamento é uma sobreposição aproximada: antes da produção final, a tela deve ser isolada e retificada para casar perfeitamente com a perspectiva.
- Não são as nove cenas completas. É um protótipo da fundação da câmera.
- O GSAP depende de internet para carregar via CDN.
