# Richard TI • V24 premium

## O que mudou

**Correção das telas dentro do monitor:** foi removida a projeção `matrix3d` do navegador. As cinco telas (sistema antigo, travamento, aviso de armazenamento, tela preta e captura REAL do Controle+) agora são texturas de alta resolução pré-mapeadas nos quatro cantos internos do monitor. Cada textura possui canal alfa com recorte exato da superfície. A moldura e o pé físicos continuam da mesma fotografia, sem peças artificiais em cima da mesa.

**Direção de arte:** novos ajustes de cor/contraste do equipamento, fundo com iluminação discreta de estúdio, textura sutil, tipografia refinada, card redesenhado e CTA melhor acabado. Os elementos principais não mudaram de lugar.

**O que permaneceu:** o controlador contínuo da V23, timings dos zooms, nove quadros, conexão dos cards, mobilidade dos papéis, textos de diagnóstico e resposta à rolagem. O botão de pular fica oculto depois da revelação do Controle+.

## Testar

- Abra `preview.html` no navegador (autossuficiente, imagens incorporadas).
- Role continuamente, experimente voltar e focalize o monitor nos quadros 02, 04 e 09.
- Teste também num iPhone, especialmente pelo navegador interno do Instagram.

## Publicar na Vercel

Publique `index.html` e a pasta `assets/` na raiz de um projeto estático; mantenha os caminhos originais. `preview.html` é apenas uma prévia e não precisa estar publicada. O endereço público da Richard TI **não foi modificado** por esta entrega.

## Fontes visuais

Em `sources/` estão preservadas as capturas originais e a mesa de referência. As texturas de tela em `assets/screen-*.webp` foram geradas a partir delas. O código de reconstrução das texturas está em `tools/build_screens.py`. A imagem Controle+ foi usada sem inventar outro dashboard.

## Limites conhecidos

A cena de equipamentos continua sendo uma composição fotográfica 2.5D. A melhoria de nitidez nas texturas da tela não adiciona detalhes reais à fotografia da mesa. Testes automatizados foram feitos em Chromium com larguras de 360, 390 e 1440 px. O Safari interno do Instagram no iPhone exige validação no aparelho real.
