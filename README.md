# Richard TI — V27 | Experiência cinematográfica

## Comece aqui

- Abra `index.html` em um navegador para visualizar o site.
- Para publicar, envie **o arquivo `index.html` e a pasta `assets/` juntos**, preservando a estrutura de pastas.
- O projeto é estático, sem dependências externas, e pode ser publicado na Vercel ou no GitHub Pages.
- A versão demonstrativa autossuficiente (`richard-ti-v27-preview.html`) acompanha a entrega separadamente, para testar sem instalar nada.

## O que mudou nesta versão

1. Câmera com trajetória contínua e direção de movimento específica para as quatro dores do roteiro.
2. Movimento vertical do cenário ao longo da rolagem, sem travar os gestos.
3. Cards com menos poluição visual, linha conectada ao objeto e tipografia revisada.
4. Captura **real** da tela de login do Controle+, recortada sem inventar outra interface e com projeção no vidro do monitor.
5. Caneta frontal preservada na frente da tela e papéis independentes desaparecendo por completo no final.
6. Melhor equilíbrio de iluminação, contraste, sombras e uso do espaço, com atenção especial ao celular.

## Roteiro

1. Mesa completa e sistema antigo.
2. Computador lento ou travando.
3. Rede interna com problemas de comunicação.
4. Falta de espaço e risco para arquivos.
5. Papéis, fiados e controles manuais.
6. Retorno à mesa, papéis levantando.
7. Papéis indo para o monitor, que fica preto.
8. Tela de login real do Controle+.
9. Zoom final no monitor e convite para conversar.

## Limites de produção

A mesa continua sendo uma base fotográfica de **941 × 1672 pixels** com camadas 2.5D. Não é uma modelagem 3D real. A câmera e a UI podem ser refinadas pelo código, mas novos detalhes fotográficos não aparecem magicamente quando há zoom extremo. Para ultrapassar esse limite seria necessário fotografar/renderizar os objetos separadamente em alta resolução ou criar a cena 3D.

## Testes

Validação automatizada em Chromium: 320×650, 360×740, 390×844 e 1440×900; rolagem para frente e para trás; estados intermediários de câmera; ausência de rolagem horizontal, imagens ausentes e erros de JavaScript; ocultação dos cinco grupos de documentos na conclusão; botão de contato alcançável. **Não substitui o teste no Safari/Instagram do iPhone real.**

Consulte `PLANO-E-VALIDACAO.md` para o raciocínio de implementação e os critérios de aceitação.
