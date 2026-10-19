# Richard TI – V19 | Scrollytelling em camadas

## Para abrir
Abra `index.html` em um servidor local (por exemplo, `python -m http.server 8000`) ou hospede a pasta inteira. Há também uma versão de visualização sem dependências externas no arquivo `richard-ti-v19-preview.html` entregue separadamente.

## Correções aplicadas
- Abertura com somente uma frase curta e indicação de rolagem.
- Nove etapas narrativas. Nas quatro dores, a câmera aproxima, mantém o objeto centralizado e o diagnóstico visível, depois retorna ao plano geral antes da próxima dor.
- Um único card com texto curto por dor, ligado ao equipamento pelo conector visual. Sem quatro cards na abertura.
- Tela de software comercial antigo em imagem de alta resolução e tela real de login do Controle+, projetadas nas mesmas quatro coordenadas internas do monitor; moldura independente desenhada acima das telas.
- Papéis em grupos PNG separados sobre uma mesa de base reconstruída, com 24 pequenas folhas saindo dos locais dos documentos e convergindo ao monitor. Na cena seguinte os grupos ficam invisíveis, a impressora troca para a versão sem comprovante e as bandejas ficam vazias.
- Menos distância de rolagem e navegação direta pelos números 01–09.
- Cores da marca preservadas (preto, branco, verde-limão), vermelho apenas para alertas.

## Limitações conhecidas
A base usa uma reconstrução 2.5D da fotografia e não um modelo 3D completo. A textura nas áreas anteriormente cobertas por papéis é sintetizada, podendo apresentar diferença visual sob inspeção próxima. Os papéis animados são sprites PNG em perspectiva, não simulação física. O monitor continua com o mesmo enquadramento e suas telas usam fontes nítidas, mas não representam uma aplicação real funcionando.

## Testes efetuados
Prévia autossuficiente renderizada com Chromium em 390 × 844 e 1440 × 900, com navegação por cenas, ausência de exceções JS e sem overflow horizontal. Publicação no Vercel não executada.

## Arquivo de segurança
O ZIP original da V18 está preservado no diretório `backup`.
