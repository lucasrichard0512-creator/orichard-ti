# Richard TI — versão V18, experiência 2.5D

## Como abrir

- **Teste imediato:** abra o arquivo `richard-ti-preview-v18.html` disponibilizado separadamente (inclui imagens incorporadas).
- **Projeto completo:** extraia este ZIP e abra `index.html` no navegador ou sirva a pasta com `python -m http.server 8000`.
- Para publicar no Vercel, atualize o repositório conectado com **o conteúdo da pasta raiz**, incluindo o diretório `assets/`. Baixar o ZIP não atualiza o endereço público.

## O que mudou

1. **Scroll reduzido:** 335svh mobile / 365svh desktop. Há navegação direta entre as nove etapas pelos números e setas.
2. **Monitor:** começa com a captura de cadastro de produtos de um PDV antigo fornecida pelo usuário. Uma transformação de perspectiva ajusta o conteúdo à área visível do monitor AOC sem colocar textos fora do vidro.
3. **Roteiro preservado:** mesa completa, computador travando, falha na rede interna, armazenamento cheio, controles manuais, papéis se levantando, papéis sendo absorvidos com tela preta, Controle+ revelado e zoom final.
4. **Cards contextuais:** apenas o problema atual recebe um diagnóstico e uma copy; a abertura não mostra cartões.
5. **Papéis:** os grupos de documentos são camadas PNG independentes, sincronizadas com a mesa de base reconstruída sem papéis. No ponto final da absorção todos os sprites têm opacidade zero. Incluímos também um comprovante da impressora.
6. **Identidade:** preto, branco e verde-limão da Richard TI. Vermelho aparece somente em alertas ou no acabamento físico já presente na mesa.
7. **Contato:** botão WhatsApp com o número definido no código original Richard TI.

## Observação importante de qualidade

A versão é uma **composição 2.5D** que usa fotografias e reconstrução digital, não um modelo 3D nativo. A mesa depois da absorção não terá papéis animados ou sombras deles, mas o acabamento dos materiais reconstruídos é propositalmente mais simples do que uma cena modelada e renderizada de raiz. A fidelidade de um 3D real e interações físicas complexas exigiriam assets 3D criados individualmente.

## Testes feitos

- Chromium headless nas resoluções **360×740, 390×844 e 1440×900**.
- Nenhum erro de JavaScript relatado e nenhuma rolagem horizontal nas amostras.
- Tela preta confirmada antes do Controle+ e 12 sprites de documento com opacidade zero no fim da absorção.

O projeto antigo não foi publicado nem alterado. Um ZIP da V11 original está incluído na pasta `historico` como backup.
