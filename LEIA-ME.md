# Richard TI — experiência interativa com 9 cenas

Esta é uma página **funcional, estática e sem dependências de rede para carregar**. Ao abrir o site, a câmera percorre o escritório e seus problemas conforme o visitante rola a página; ao rolar para cima, os movimentos são revertidos.

## Como abrir

- **Publicação:** carregue o conteúdo desta pasta (com `index.html` na raiz) no GitHub Pages, Vercel ou Netlify. Não exige `npm install`, build nem configuração de API.
- **Teste local:** dentro da pasta execute `python -m http.server 8080` e acesse `http://localhost:8080/`.
- **Botão de contato:** links apontam para o número de WhatsApp que constava da versão anterior do seu próprio site. Confira se continua sendo o número comercial correto antes de publicar.

## O que está implementado

- 9 cenas narrativas e progressão do scroll bidirecional, com zoom reversível e sem saltos de câmera;
- zoom no computador travando, foco na rede interna e aviso de armazenamento cheio;
- papéis como camadas visuais independentes, levantando e convergindo para o monitor;
- o monitor mostra, nas cenas finais, a captura da **tela real de acesso do Controle+** que constava do HTML anterior;
- mesa sem chão, paredes ou cenário, arquivo de imagem transparente; layout móvel e desktop;
- botões para saltar diretamente entre cenas, opção de pular apresentação, acesso por teclado e redução de movimento;
- CTAs para WhatsApp e bloco final de serviços.

## Limitações importantes

A experiência exibida é **híbrida (foto recortada com zoom e camadas 2.5D em CSS)**, não uma cena fotorrealista produzida integralmente por ray tracing. O `.glb` incluso é uma **base 3D editável em separado**; ele não é o render visual de alta qualidade mostrado no site. Os documentos não foram removidos pixel a pixel da fotografia enquanto voam, e a animação é uma simulação visual. O Controle+ na tela é uma captura de acesso, não uma conexão funcional ao sistema, nem o dashboard real.

A qualidade final dos materiais 3D, a substituição do monitor pela captura autenticada de dashboard e a integração com um sistema real exigem esses materiais oficiais ou revisão do modelo. Não confundir demonstração com serviço conectado.

## Estrutura

- `index.html` — estrutura semântica
- `styles.css` — direção de arte, responsividade e efeitos
- `script.js` — timeline de câmera, capítulos e animação de papéis
- `assets/escritorio.webp` — base fotográfica isolada, com fundo transparente
- `assets/controle-login.webp` — captura de login do Controle+ extraída do trabalho anterior
- `assets/papel-*.webp` — imagens independentes da papelada
- `assets/escritorio-editavel.glb` — base 3D de geometria (não usada como visual principal)

## Referências de arquitetura

Baseada no padrão de timeline reversível de `scrollytelling-main` da Basement Studio (MIT, licença no projeto de referência) e na organização narrativa por capítulos de `map-scrollytelling-main`. O motor de mapa/Mapbox **não foi copiado nem usado**. A implementação aqui foi escrita sem importar bibliotecas de terceiros para permitir publicação imediata e funcionamento offline.
