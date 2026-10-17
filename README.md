# Richard TI — Site cinematográfico V15

Esta versão substitui a página inicial pelo cenário cinematográfico da mesa comercial, mantendo a identidade original preto, branco e verde-limão da Richard TI. A V11 original continua preservada em `index-v11.html`.

## O que foi corrigido após o Teste 03

- A tela inicial tem a headline e a fotografia sem os quatro cards sobrepostos.
- Os cards aparecem individualmente, sincronizados com as cenas 2 a 5.
- Os zooms focalizam o monitor, a infraestrutura de rede e os papéis, com composição própria no celular.
- A animação não cria mais folhas retangulares genéricas por CSS: 12 recortes da fotografia original são animados em trajetórias curvas até o monitor.
- Uma versão retocada localmente da mesa é revelada por baixo dos documentos enquanto eles saem.
- A tela fica preta durante a absorção dos papéis; a interface verdadeira do Controle+ aparece antes do zoom final.

## Como abrir

Abra `index.html` a partir de qualquer servidor web estático (incluindo Vercel). A prévia independente `richard-ti-preview-v15.html` é disponibilizada separadamente para testes sem servidor.

Use o parâmetro `?scene=1` a `?scene=9` para acessar uma etapa diretamente. Os pontos à direita do palco também navegam entre cenas.

## Limite visual importante

A animação de papéis parte de uma *única fotografia* da mesa, não de renderização 3D com objetos isolados. A versão da mesa sem papéis usa retoque aproximado, sobretudo nas áreas de documentos grandes. A etapa resolve a continuidade e o comportamento, mas não substitui uma produção com camadas originais separadas ou um modelo 3D, que seria necessário para retirada fisicamente perfeita de cada folha.

## Verificações efetuadas

- `node --check site.js` sem erros de sintaxe.
- Navegação programática pelas 9 cenas no Chromium em 360px de largura, sem erros JS nem rolagem horizontal.
- Capturas visuais em 390px mobile e 1440px desktop.
- Integridade do ZIP e referências dos assets.

O pacote não faz deploy automático no endereço público. Publique os arquivos pelo repositório conectado ao Vercel.
