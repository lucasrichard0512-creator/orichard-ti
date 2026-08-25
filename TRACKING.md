# Tracking

No `index.html` existe:

```js
const TRACKING={ga4Id:'',metaPixelId:''};
```

Preencha os IDs quando disponíveis. Eventos mantidos:
- `whatsapp_click`
- `story_scene_view`
- `scroll_depth`

UTMs, `fbclid` e `gclid` são preservados em sessionStorage e incorporados ao fluxo de atribuição.
