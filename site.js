(()=>{
 'use strict';
 const el=s=>document.querySelector(s);
 const film=el('#experiencia'),stage=el('#stage'),art=el('#scene-art');
 const intro=el('#intro'),diag=el('#diagnostics'),chapter=el('#chapter');
 const label=el('#chapter-label'),title=el('#chapter-title'),detail=el('#chapter-text'),tag=el('#chapter-tag');
 const number=el('#scene-number'),bar=el('#progress-fill'),nav=el('#scene-nav');
 const screen=el('#screen-effect'),loading=el('#screen-loading'),storage=el('#screen-storage'),black=el('#screen-dark'),control=el('#screen-control');
 const network=el('#network-beam'),hint=el('#scroll-hint');
 const motion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const scenes=[
  {name:'O cotidiano',eyebrow:'01 / A ROTINA DO COMÉRCIO',title:'Sua operação depende da tecnologia.',desc:'Todos os dias, computadores, rede e informações precisam funcionar juntos.',tag:'UM NEGÓCIO, MUITAS DEPENDÊNCIAS'},
  {name:'Computador lento',eyebrow:'02 / COMPUTADOR LENTO',title:'Seu sistema travou. Seu cliente espera.',desc:'Máquinas lentas e sistemas sem resposta atrapalham vendas e atendimento.',tag:'DIAGNÓSTICO: SISTEMA SEM RESPOSTA'},
  {name:'Rede interna',eyebrow:'03 / REDE INTERNA',title:'Seu comércio precisa estar conectado.',desc:'Falhas entre computadores, impressoras e equipamentos prejudicam a operação, mesmo com internet funcionando.',tag:'DIAGNÓSTICO: COMUNICAÇÃO LOCAL'},
  {name:'Arquivos em risco',eyebrow:'04 / PROTEÇÃO DE DADOS',title:'O que acontece se seus arquivos sumirem?',desc:'Armazenamento cheio e ausência de backup colocam informações importantes em risco.',tag:'ALERTA: ARMAZENAMENTO ESGOTADO'},
  {name:'Controles manuais',eyebrow:'05 / ROTINA MANUAL',title:'Fiados, cobranças e papéis por toda parte.',desc:'Anotações espalhadas consomem tempo e dificultam acompanhar o negócio.',tag:'DIAGNÓSTICO: INFORMAÇÕES DISPERSAS'},
  {name:'A transformação começa',eyebrow:'06 / UMA NOVA FORMA DE TRABALHAR',title:'E se fosse possível simplificar?',desc:'Os papéis começam a dar lugar a uma organização mais prática.',tag:'TRANSFORMAÇÃO EM ANDAMENTO'},
  {name:'Papéis se transformam',eyebrow:'07 / TRANSFORMAÇÃO DIGITAL',title:'Da papelada para a tecnologia.',desc:'A gestão manual abre espaço para um sistema pensado para o comércio.',tag:'PROCESSANDO TRANSFORMAÇÃO'},
  {name:'Controle+ aparece',eyebrow:'08 / CONHEÇA O CONTROLE+',title:'O controle do negócio em um só lugar.',desc:'Conheça o Controle+: PDV, fiado, estoque e gestão comercial.',tag:'CONTROLE+ / SISTEMA REAL'},
  {name:'Veja o Controle+',eyebrow:'09 / RICHARD TI + CONTROLE+',title:'Tecnologia para o seu comércio evoluir.',desc:'Suporte técnico, redes e software sob medida. Vamos conversar sobre a sua operação.',tag:'PRONTO PARA O PRÓXIMO PASSO'}
 ];
 const desktop=[
  [1,0,0],[1.65,-14,9],[2.2,-30,-3],[1.7,-15,9],[1.65,-8,-17],[1.05,0,0],[1.1,0,0],[1.38,-8,7],[2.5,-19,17]
 ];
 const mobile=[
  [1,0,0],[2.15,3,12],[2.4,-38,3],[2.15,3,12],[1.85,-5,-20],[1,0,0],[1.07,0,0],[1.35,0,4],[2.55,1,15]
 ];
 const papers=[];const holder=el('#flying-papers');
 const origins=[[.13,.59],[.22,.56],[.31,.60],[.38,.61],[.50,.59],[.65,.58],[.74,.54],[.82,.52],[.87,.56],[.27,.64],[.47,.64],[.68,.62],[.17,.67],[.31,.69],[.52,.68],[.60,.65],[.78,.64],[.91,.58],[.23,.61],[.37,.57],[.48,.56],[.56,.61],[.71,.63],[.84,.59]];
 origins.forEach(([x,y],i)=>{let p=document.createElement('span');p.className='fly-paper';p.style.left=x*100+'%';p.style.top=y*100+'%';holder.appendChild(p);papers.push({node:p,x,y,i})});
 const navBtns=[];scenes.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.title=`Cena ${i+1}: ${s.name}`;b.setAttribute('aria-label',`Ir para cena ${i+1}: ${s.name}`);b.addEventListener('click',()=>{let max=film.offsetHeight-stage.clientHeight;window.scrollTo({top:film.offsetTop+max*i/8,behavior:motion?'instant':'smooth'})});nav.appendChild(b);navBtns.push(b)});
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 const lerp=(a,b,t)=>a+(b-a)*t;
 const pulse=(t,center,radius=.76)=>ease((t-center+radius)/.3)*(1-ease((t-center)/.3));
 let displayed=0,started=false,lastScene=-1,stopped=false;
 function paint(t){
  let idx=Math.min(8,Math.floor(t)),next=Math.min(8,idx+1),phase=ease(t-idx);
  let arr=innerWidth<=700?mobile:desktop;
  let a=arr[idx],b=arr[next];
  let scale=lerp(a[0],b[0],phase),x=lerp(a[1],b[1],phase),y=lerp(a[2],b[2],phase);
  art.style.transform=`translate3d(${x.toFixed(3)}%,${y.toFixed(3)}%,0) scale(${scale.toFixed(4)})`;
  let introAlpha=1-ease((t-.1)/.6),hudAlpha=1-ease((t-.13)/.6);
  intro.style.setProperty('--intro-opacity',introAlpha.toFixed(3));intro.style.setProperty('--intro-y',(-20*(1-introAlpha)).toFixed(1)+'px');
  intro.style.opacity=introAlpha;intro.style.pointerEvents=introAlpha>.4?'auto':'none';
  diag.style.opacity=hudAlpha;diag.style.transform=`translateY(${(-18*(1-hudAlpha)).toFixed(1)}px)`;
  const chapterAlpha=ease((t-.54)/.42);
  chapter.style.opacity=chapterAlpha;chapter.style.transform=`translateY(${(15*(1-chapterAlpha)).toFixed(1)}px)`;
  let showFreeze=pulse(t,1,.75);let showDisk=pulse(t,3,.72), showNetwork=pulse(t,2,.73);
  let showBlack=ease((t-5.48)/.45)*(1-ease((t-6.94)/.3));
  let showControl=ease((t-6.96)/.34);
  screen.style.opacity=Math.max(showFreeze,showDisk,showBlack,showControl).toFixed(3);
  loading.style.opacity=showFreeze.toFixed(3);storage.style.opacity=showDisk.toFixed(3);black.style.opacity=showBlack.toFixed(3);control.style.opacity=showControl.toFixed(3);
  network.style.opacity=showNetwork.toFixed(3);
  for(const p of papers){
    const lag=(p.i%8)*.046;
    const lift=ease((t-5.12-lag)/.62),travel=ease((t-6.0-lag)/.90);
    const dx=(.47-p.x)*art.clientWidth*travel;
    const dy=-(30+(p.i%6)*16)*lift+(.47-p.y)*art.clientHeight*travel;
    const r=(p.i%2?1:-1)*(9+p.i*4)*lift;
    p.node.style.transform=`translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) rotate(${r.toFixed(1)}deg) scale(${(1-.75*travel).toFixed(3)})`;
    p.node.style.opacity=(ease((t-5.16-lag)/.37)*(1-ease((t-6.55-lag)/.38))*.94).toFixed(3);
  }
  const n=Math.round(t);
  if(n!==lastScene){
    lastScene=n;
    stage.classList.toggle('is-resolving',n>=5);
    label.textContent=scenes[n].eyebrow;
    title.textContent=scenes[n].title;
    detail.textContent=scenes[n].desc;
    tag.textContent=scenes[n].tag;
    number.textContent=String(n+1).padStart(2,'0');
    navBtns.forEach((btn,i)=>{btn.classList.toggle('active',i===n);btn.setAttribute('aria-current',i===n?'step':'false')});
  }
  hint.style.opacity=(1-ease((t-.2)/1.1)).toFixed(3);
  bar.style.width=(t/8*100).toFixed(3)+'%';
 }
 function tick(){
   if(stopped)return;
   let rect=film.getBoundingClientRect(),span=Math.max(1,film.offsetHeight-stage.clientHeight);
   const target=clamp(-rect.top/span)*8;
   if(!started){displayed=target;started=true}
   else displayed=motion?target:displayed+(target-displayed)*.16;
   if(Math.abs(target-displayed)<.0001)displayed=target;
   paint(displayed);
   requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!stopped)paint(displayed)});
 const params=new URLSearchParams(location.search);let u=[];
 ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'].forEach(k=>{if(params.get(k))u.push(`${k}: ${params.get(k)}`)});
 document.querySelectorAll('[data-wa]').forEach(a=>{
  const forControl=a.dataset.wa==='controle';
  const msg=forControl?'Olá! Vi o Controle+ no site da Richard TI e gostaria de saber como ele pode ajudar meu comércio.':'Olá! Vi o site da Richard TI e gostaria de conversar sobre tecnologia para o meu comércio.';
  a.href='https://wa.me/5562999407334?text='+encodeURIComponent(msg);
  a.addEventListener('click',()=>{
    try{if(window.gtag)window.gtag('event','generate_lead',{event_category:'contact',lead_source:a.dataset.wa});if(window.fbq)window.fbq('track','Lead',{content_name:a.dataset.wa})}catch(e){}
  });
 });
 const param=Number(params.get('scene'));if(Number.isInteger(param)&&param>=1&&param<=9){addEventListener('load',()=>{const max=film.offsetHeight-stage.clientHeight;scrollTo({top:film.offsetTop+(param-1)/8*max,behavior:'instant'})},{once:true})}
})();
