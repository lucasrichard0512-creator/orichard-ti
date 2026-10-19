# Richard TI — V21 | Reconstrução da cena

## Abrir

- Abra `index.html` no navegador depois de extrair todos os arquivos em uma pasta ou publique a pasta em um servidor estático, por exemplo na Vercel.
- `index.html` usa arquivos na subpasta `assets/`.
- Existe uma prévia autossuficiente (`richard-ti-v21-preview.html`) entregue separadamente na conversa que incorpora seus próprios recursos.

## O que mudou

1. **Mesa sem papéis desde o início:** o tampo escuro é feito em SVG com uma textura própria, não uma foto cheia de papéis que são apagados depois.
2. **Elementos físicos independentes:** impressora, roteador, teclado, mouse, leitor e cadeira são objetos fotográficos isolados. A bandeja lateral foi removida.
3. **Documentos independentes:** dez grupos reais de imagens transparentes, cada qual com sua transformação e opacidade. As folhas extras aparecem apenas em voo. O fundo do tampo não muda quando desaparecem.
4. **Monitor em camadas:** interfaces pré-renderizadas em alta resolução ficam em uma camada separada da moldura do monitor. Há cinco estados (antigo, travamento, armazenamento, preto e Controle+). O Controle+ é a captura de login disponibilizada no projeto anterior, não um dashboard novo inventado.
5. **Câmera em estados:** aproxima, para com card e linha, volta à mesa antes de aproximar o próximo objeto.
6. **Navegação:** um gesto de rolagem ou deslize por etapa, com trava durante as animações. Rajadas longas de trackpad não pulam cenas.
7. **Mobile:** a linha de conexão continua visível no celular; cards ocupam espaço reservado acima do equipamento.

## Roteiro 01–09

1. Mesa completa com sistema antigo
2. Zoom no monitor travando + card
3. Retorno e zoom na rede interna + card
4. Retorno e zoom no armazenamento + card
5. Retorno e zoom nos papéis, fiados e controles manuais + card
6. Mesa completa, papéis começando a subir
7. Todos os documentos se deslocam para o monitor, que fica preto
8. Monitor exibe Controle+ e mesa está vazia
9. Zoom final no mesmo monitor e chamada para WhatsApp

## Testes executados neste ambiente

- Chromium em larguras 360, 390 e 1440 px: sem erro de JavaScript e sem rolagem horizontal.
- Rajada de 45 eventos de roda: avançou só uma etapa.
- Navegação reversa: voltou ao diagnóstico anterior.
- Na cena final, os dez grupos de papel têm opacidade igual a zero.
- Imagens da mesa limpa e do monitor conferidas em capturas reais do Chromium.

## Limitações honestas

- Cena **2.5D híbrida**, não modelo 3D físico. Os equipamentos são recortes fotográficos e o tampo é desenhado por SVG; iluminação e perspectiva ainda podem se beneficiar de refinamento artístico.
- As telas foram separadas da moldura e usam imagens rasterizadas de alta resolução; não são aplicativos HTML vivos. Um redesenho vetorial completo da interface legada seria um trabalho adicional.
- Não foi possível executar o navegador interno do Instagram no iPhone neste ambiente. É fundamental conferir nele antes de substituir o site publicado.
- Esta entrega não publica nem altera o domínio `richard-ti.vercel.app`.

## Publicar

Extraia o ZIP completo; envie `index.html` e `assets/` ao repositório de implantação ou projeto Vercel, mantendo os caminhos relativos.
