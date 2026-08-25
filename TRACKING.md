# Rastreamento

No final de `index.html`, preencha:

```js
const TRACKING = {
  ga4Id: 'G-XXXXXXXXXX',
  metaPixelId: 'XXXXXXXXXXXXXXX'
};
```

Enquanto os valores estiverem vazios, nenhum script externo de analytics é carregado.

Eventos preparados:
- `whatsapp_click`
- `service_view`
- `scroll_depth`

UTMs, `gclid` e `fbclid` são preservados em `sessionStorage` e associados aos eventos.
