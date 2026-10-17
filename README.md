# Richard TI — Site Cinematográfico (V14 · identidade original)

Nova página inicial com a fotografia cinematográfica aprovada, 9 etapas e identidade Richard TI recuperada: preto, branco e verde-limão (#b9ff28). O vermelho permanece apenas como sinal de erro/falha.

## Visualização

Abra `index.html` no navegador. Para testes e publicação, use um servidor estático, por exemplo `python -m http.server 8000`, e visite `http://localhost:8000`.

## Publicação

Substitua no seu repositório as pastas/arquivos por este pacote. O arquivo **`index.html` da raiz** é a nova homepage. Em Vercel, publique a branch/repositório atualizado usando seu fluxo normal de deploy.

**Este ZIP não modifica o endereço hospedado automaticamente.**

## Arquivos principais

- `index.html`: homepage atual.
- `site.css`: tipografia, layout cinematográfico e responsividade.
- `site.js`: scroll narrativo, 9 etapas, transição de câmera, overlays, links WhatsApp.
- `assets/escritorio-cinematografico.webp`: imagem-base aprovada (ambiente realista do comércio).
- `assets/controle-original.webp`: captura real enviada pelo usuário da tela de login do Controle+.
- `index-v11.html`: cópia preservada da homepage original da V11.
- Documentos `BLUEPRINT_GSAP.md`, `DESIGN.md`, `DOM_MAP.md` etc. preservados para referência.

## Verificação

Sintaxe JavaScript, referências locais, paleta e integridade do pacote conferidas. As imagens de navegador registradas no ciclo V13 não equivalem a um teste visual da V14: nesta execução, as políticas de segurança do navegador impediram a captura visual automatizada.

## Limites conhecidos

Este é um protótipo **2.5D** sobre uma fotografia fixa. Os documentos da fotografia ainda não podem desaparecer fisicamente sem uma segunda versão do cenário/máscaras. Os papéis voadores são camadas de animação. A textura e a interface do monitor perdem definição em zooms extremos porque a imagem-mestre tem 941x1672 pixels. A versão de produção final de efeito 3D exigiria recursos separados ou modelagem/captura em qualidade superior.
