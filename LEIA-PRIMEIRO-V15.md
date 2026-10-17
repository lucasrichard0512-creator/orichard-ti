# Richard TI — V15 · Diagnósticos progressivos e papéis fotográficos

## Alterações

- A primeira dobra **não** mostra diagnósticos. Os quatro cards entram **um por vez**, nas cenas 2, 3, 4 e 5, junto da copy.
- O movimento da câmera foi remapeado para ancorar o ponto de interesse real no centro útil da tela, inclusive no celular.
- Foram extraídos **12 recortes reais da fotografia** para o voo dos documentos. A antiga animação de retângulos artificiais foi removida.
- Uma camada de retoque local revela gradualmente a superfície da mesa à medida que os recortes saem. A mesa, o ambiente, a impressora, a rede e a cadeira continuam no mesmo lugar.
- Durante a entrada dos papéis a tela fica preta; somente depois surge a captura real do Controle+.
- A paleta original preto/branco/verde-limão foi preservada.

## Limitação conhecida

Como o cenário parte de uma única fotografia e não de um modelo 3D ou de uma sessão fotográfica com mesa vazia, a reconstrução da superfície **abaixo** de grandes pilhas é aproximada; algumas áreas retocadas podem ser perceptíveis em zoom. Os papéis animados são recortes da fotografia original, mas a animação ainda é uma composição 2.5D, não uma simulação física de todas as folhas.

## Teste

Abra `index.html` num servidor estático. Use `?scene=1` até `?scene=9` para ir diretamente às nove etapas. O arquivo `index-v11.html` continua preservado. O ZIP não faz deploy automático na Vercel.
