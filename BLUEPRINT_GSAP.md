# Richard.TI — Blueprint GSAP para plano-sequência

## Objetivo
Implementar a home como um **plano-sequência único controlado pelo scroll**. Não existem seções narrativas independentes, cards de etapa ou cortes de cena. Existe um único `stage`, um único `world` e uma única `camera` que aproxima, acompanha, afasta e transforma a mesma composição.

## Princípios obrigatórios
1. **Um mundo visual só.** Rede, computador, processos, sistema, Controle+ e marca final pertencem ao mesmo palco.
2. **Scroll = playhead.** O `progress` do ScrollTrigger controla uma única timeline.
3. **Sem cortes secos.** Todo elemento nasce de algo que já estava na cena ou é revelado pela câmera.
4. **Texto = legenda.** Uma frase curta por momento, sem caixas ou títulos corporativos.
5. **Controle+ = clímax.** A transição para dark é gradual e acontece apenas quando o sistema amadurece em produto.
6. **Mobile usa o mesmo roteiro, mas outro enquadramento.** Não comprimir desktop; reposicionar câmera e reduzir simultaneidade.

## Estrutura DOM mínima
```html
<section id="film">
  <div id="stage">
    <div id="world">
      <div id="camera">
        <div id="office">...</div>
        <svg id="network">...</svg>
        <div id="computer">...</div>
        <div id="processCloud">...</div>
        <div id="app">...</div>
        <div id="controlePlus">...</div>
      </div>
    </div>
    <div id="caption"></div>
    <div id="finale">...</div>
  </div>
</section>
```

## Timeline normalizada
A timeline usa duração total **100**. Isso torna o storyboard literal e fácil de auditar.

| Faixa | Label | Câmera / ação | Texto |
|---|---|---|---|
| 0–8 | `intro` | empresa funcionando, leve aproximação | Tecnologia para sua empresa funcionar. |
| 8–18 | `network` | zoom no núcleo; fluxo verde percorre a rede | Tudo conectado. |
| 18–28 | `failure` | câmera acompanha a linha que falha até o computador | Até algo parar. |
| 28–40 | `support` | diagnóstico percorre a conexão e restaura estação | Suporte que resolve. |
| 40–52 | `processReveal` | câmera abre e revela planilha, WhatsApp, papel e cobranças | Mas nem todo gargalo é técnico. |
| 52–64 | `convergence` | itens convergem e são absorvidos pela interface | Às vezes, o processo precisa mudar. |
| 64–76 | `uiBuild` | interface se monta e ganha módulos | Foi assim que nasceu o Controle+. |
| 76–88 | `product` | câmera aproxima; fundo escurece; tela real domina o viewport | Uma solução real que virou produto. |
| 88–96 | `pullback` | câmera afasta; Rede + Suporte + Software reaparecem como pilares | — |
| 96–100 | `finale` | convergência para RICHARD.TI + CTA | Tecnologia para sua empresa funcionar. |

## Scroll
Desktop: começar com algo em torno de `+=260%` a `+=300%` de scroll total. Mobile: `+=220%` a `+=250%`.

Não usar `scrub` alto. O objetivo é que o gesto pareça controlar diretamente o playhead:
```js
scrub: 0.15
```

## Texto
Uma função única deve controlar as legendas. O texto não fica em múltiplos nodes sobrepostos.

Entrada:
- `opacity: 0 -> 1`
- `y: 14 -> 0`
- `blur: 8px -> 0`

Saída:
- `opacity: 1 -> 0`
- `y: 0 -> -10`
- `blur: 0 -> 8px`

As legendas devem viver em uma faixa segura do viewport e nunca ocupar a área focal do objeto atual.

## Câmera
A câmera deve ser um único wrapper transformável. Evitar animar dezenas de elementos para simular câmera quando `scale/x/y` no wrapper resolve.

Exemplo conceitual desktop:
```js
camera.to({ scale: 1.00, xPercent: 0, yPercent: 0 }, 0);
camera.to({ scale: 1.20, xPercent: -4, yPercent: 2 }, 8);
camera.to({ scale: 1.55, xPercent: -18, yPercent: -12 }, 18);
camera.to({ scale: 1.35, xPercent: -12, yPercent: -8 }, 28);
camera.to({ scale: 0.90, xPercent: 0, yPercent: 0 }, 40);
camera.to({ scale: 1.08, xPercent: 3, yPercent: -2 }, 64);
camera.to({ scale: 1.20, xPercent: 0, yPercent: 0 }, 76);
camera.to({ scale: 0.72, xPercent: 0, yPercent: 0 }, 88);
```

No mobile, os mesmos marcos usam menos zoom lateral e mais deslocamento vertical.

## Fluxo de rede
O fluxo verde deve ser animado no próprio path SVG via `stroke-dashoffset`. Para o pacote/sinal acompanhar o path, usar `getTotalLength()` e `getPointAtLength()` em um tween de objeto numérico, em vez de um movimento diagonal arbitrário.

## Falha
A falha precisa acontecer **na própria linha ativa**:
- interromper o traçado;
- mudar somente o trecho final para alerta;
- congelar o pacote antes do computador;
- câmera acompanha o ponto de falha;
- computador muda de estado.

Não exibir um card separado dizendo que houve falha.

## Diagnóstico / suporte
O diagnóstico percorre o mesmo path da falha. Quando chega ao computador:
- alerta desaparece;
- linha volta ao verde;
- computador muda para `restabelecida`;
- fluxo normal reaparece.

## Processos dispersos
Planilha, WhatsApp, papel e cobranças devem existir fora do enquadramento inicial. A câmera abre e os revela.

Eles não aparecem como cards de UI. Devem parecer fragmentos/documentos/ícones do processo.

## Convergência
Todos os fragmentos usam trajetórias diferentes, mas terminam no mesmo centro. Ao chegar:
- reduzem escala;
- perdem opacidade;
- são absorvidos pela interface;
- a interface nasce da convergência, não por fade independente.

## Construção da interface
A interface começa como estrutura simples e ganha partes:
1. shell;
2. sidebar;
3. cabeçalho;
4. módulos;
5. métricas;
6. dados.

A tela real do Controle+ só substitui essa construção quando ela já ocupa o enquadramento.

## Dark / Controle+
O fundo não troca para preto de uma vez. Entre 72 e 82 da timeline:
- paper -> cinza -> grafite -> preto;
- grid perde força;
- verde ganha contraste;
- interface cresce;
- marca Controle+ entra por máscara/clip, não por card.

Em 82–88, a tela real deve ocupar aproximadamente 82–90% do viewport útil.

## Finale
O produto recua. Três sinais/pilares aparecem ou retornam:
- Rede
- Suporte
- Software

Eles convergem visualmente para o centro e formam `RICHARD.TI`.

CTA só aparece depois da convergência; não durante a animação principal.

## Mobile
Regras:
- legenda no topo, área visual abaixo;
- `clamp()` agressivo em tipografia;
- sem elementos simultâneos demais;
- zoom menor e crops verticais;
- nenhum texto por cima da screenshot do Controle+;
- o Controle+ deve poder ocupar quase toda a largura, com margem 12–16px.

## Critério de aprovação
Grave a tela rolando devagar, sem áudio. Se parecer:
- slide deck,
- infográfico,
- seção de landing page,
- cards trocando,

está errado.

Se parecer uma única tomada em que a câmera descobre e transforma a mesma cena, está certo.
