# Tracking

No final de `index.html` existe:

```js
const TRACKING={ga4Id:'',metaPixelId:''};
```

Preencha os IDs quando estiverem disponíveis.

Eventos atuais:
- clique WhatsApp -> `generate_lead` / Meta `Lead`
- marcos narrativos -> `story_moment`
- UTMs, `fbclid` e `gclid` são preservados na origem do lead.
