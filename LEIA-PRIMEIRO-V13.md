# Richard TI — V13 Cinematográfica / página principal

## O que foi alterado

- O `index.html` agora carrega o layout cinematográfico definido em 17/10/2026, usando a fotografia vertical do escritório aprovada na conversa.
- As frases, a CTA e os quadros de diagnóstico são HTML/CSS reais (não letras gravadas na foto).
- O scroll controla uma câmera virtual e nove etapas na **mesma imagem**: rotina, computador lento, rede interna, arquivos, papelada, papéis começando a voar, absorção, Controle+, zoom final.
- `site.css` e `site.js` foram recriados com adaptações para celular e desktop, suporte a movimento reduzido, navegação por etapas, botões WhatsApp e rastreamento de clique quando habilitado.
- A captura real do Controle+ foi incluída em `assets/controle-original.webp` para a revelação no monitor.
- A V11 está preservada em `index-v11.html`.

## O que NÃO foi feito (importante)

- Este arquivo ZIP **não publica automaticamente** no Vercel. É preciso substituir os arquivos do repositório e fazer o deploy.
- Não é uma cena 3D verdadeira. É scrollytelling 2,5D sobre a fotografia aprovada, uma escolha para ter fidelidade visual no celular.
- Os documentos fotografados ainda estão gravados na imagem original. Papéis flutuantes são camadas extras, portanto **o desaparecimento físico dos documentos ainda exige fotografia-base sem os papéis ou máscaras cuidadosas**. Não apresentar como animação final realista.
- As sobreposições do monitor são aproximadas à geometria da fotografia. Para fidelidade perfeita, precisa de captura/câmera 3D ou retoque quadro a quadro.

## Como abrir e testar

Na pasta do projeto, execute `python -m http.server 8000` e acesse `http://localhost:8000` (ou publique no seu ambiente de pré-visualização). Role a página e verifique também em tela de celular.

O HTML não depende de build nem frameworks para funcionar. Fonts do Google são opcionais: há fontes alternativas de sistema.
