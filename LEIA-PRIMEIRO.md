# Richard TI | Teste 02: página inicial corrigida

**IDENTIFICAÇÃO:** Ao abrir a nova página você verá o título **Seu comércio não pode parar.** sobre a **mesa de escritório** e, no alto, a identificação **EXPERIÊNCIA DA MESA · TESTE 02**. Se ainda aparecer um diagrama de rede, o deploy antigo não foi substituído.

**O que mudou:** Agora `index.html` abre o cenário da mesa e os movimentos da câmera. A V11 antiga foi preservada em `index-v11.html`. O antigo `camera-test.html` redireciona para a nova página inicial.

## Teste local

1. Extraia o ZIP.
2. Dentro da pasta `orichard-ti-main`, use um servidor local, por exemplo `python -m http.server 8000`, e abra `http://localhost:8000`.
3. Arraste a rolagem; para pular para um quadro use `?scene=1` até `?scene=9` na URL.
4. Para testar no celular, publique os arquivos em uma URL de testes (Vercel ou outra hospedagem estática). Teste a URL real.

## Publicação

O vídeo `Teste01.mp4` mostra `richard-ti.vercel.app` ainda servindo a V11. Baixar o ZIP não altera a hospedagem.
Para a hospedagem mostrar o novo site, substitua os arquivos publicados pelo **conteúdo inteiro da pasta `orichard-ti-main`** e confirme que a raiz da publicação contém este novo `index.html`, `site.css`, `site.js` e a pasta `assets`.
Se Vercel estiver ligado ao GitHub, atualize o repositório e faça deploy da branch usada em produção. Se não, faça deploy por arrastar a pasta ao Vercel.

## Limitações honestas do protótipo

- Imagem-mestre é um recorte programático do JPEG com quadriculado desenhado; o novo WebP tem alfa verdadeiro. O recorte ainda tem arestas pequenas que exigem retoque manual para publicação.
- Cenas do monitor usam os mesmos pixels da mesa, com sobreposição em perspectiva, inclusive a captura real de Controle+.
- Os papéis ainda não foram removidos fisicamente da textura de mesa-mestre quando saem voando; a animação dos papéis é uma prova de conceito. Uma versão sem os papéis e seus recortes individuais são necessários para finalizar a transformação.
- O visual deve ser aprovado e testado em diferentes celulares antes de usar tráfego pago.

Não alteramos a V11 original, que segue acessível em `index-v11.html`.
