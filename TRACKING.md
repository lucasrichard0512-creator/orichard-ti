# Rastreamento de conversão

O site já está preparado para registrar as principais ações de conversão.

## Eventos implementados

- `whatsapp_click`: clique em qualquer CTA de WhatsApp, com identificação do botão e do serviço.
- `service_view`: visualização de cada etapa do scrollytelling de serviços.
- `case_step_view`: visualização das etapas do case Controle+.
- `scroll_depth`: profundidade de rolagem em 25%, 50%, 75% e 90%.

## Atribuição de campanha

O site captura e preserva na sessão:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `fbclid`

Quando existir `utm_campaign` ou `utm_source`, uma referência curta é adicionada à mensagem do WhatsApp. Isso ajuda a identificar a origem do lead mesmo antes da configuração completa do analytics.

## Ativar GA4 e Meta Pixel

No final de `index.html`, procure por:

```js
const TRACKING = {
  ga4Id: '',
  metaPixelId: ''
};
```

Preencha os IDs reais. Não use IDs de exemplo.

Com os campos vazios, nenhum script externo de analytics é carregado.

### GA4

Ao preencher `ga4Id`, o clique no WhatsApp é enviado como `generate_lead`. Os demais eventos usam seus nomes próprios.

### Meta Pixel

Ao preencher `metaPixelId`, o site registra `PageView` e envia `Lead` ao clicar no WhatsApp.

## UTMs sugeridas para o primeiro anúncio

Exemplo de parâmetros para Meta Ads:

```
utm_source=instagram
utm_medium=paid_social
utm_campaign=infra_suporte_local
utm_content=criativo_01
```

Use nomes consistentes para conseguir comparar campanhas e criativos depois.
