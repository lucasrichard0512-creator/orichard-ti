(()=>{
 'use strict';
 const el=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const film=el('#experiencia'),stage=el('#stage'),art=el('#scene-art');
 const intro=el('#intro'),diag=el('#diagnostics'),chapter=el('#chapter');
 const label=el('#chapter-label'),title=el('#chapter-title'),detail=el('#chapter-text'),tag=el('#chapter-tag');
 const number=el('#scene-number'),bar=el('#progress-fill'),nav=el('#scene-nav');
 const screen=el('#screen-effect'),loading=el('#screen-loading'),storage=el('#screen-storage'),black=el('#screen-dark'),control=el('#screen-control');
 const network=el('#network-beam'),hint=el('#scroll-hint'),clean=el('#desk-clean');
 const holder=el('#flying-papers'),hud=all('.diagnostics .hud');
 const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenes=[
  {name:'O cotidiano',eyebrow:'01 / A ROTINA DO COMÉRCIO',title:'Sua operação depende da tecnologia.',desc:'Todos os dias, computadores, rede e informações precisam funcionar juntos.',tag:'UM NEGÓCIO, MUITAS DEPENDÊNCIAS'},
  {name:'Computador lento',eyebrow:'02 / COMPUTADOR LENTO',title:'Seu sistema travou. Seu cliente espera.',desc:'Máquinas lentas e sistemas sem resposta atrapalham vendas e atendimento.',tag:'DIAGNÓSTICO: SISTEMA SEM RESPOSTA'},
  {name:'Rede interna',eyebrow:'03 / REDE INTERNA',title:'Seu comércio precisa estar conectado.',desc:'Falhas entre computadores, impressoras e equipamentos prejudicam a operação, mesmo com internet funcionando.',tag:'DIAGNÓSTICO: COMUNICAÇÃO LOCAL'},
  {name:'Arquivos em risco',eyebrow:'04 / PROTEÇÃO DE DADOS',title:'O que acontece se seus arquivos sumirem?',desc:'Armazenamento cheio e ausência de backup colocam informações importantes em risco.',tag:'ALERTA: ARMAZENAMENTO ESGOTADO'},
  {name:'Controles manuais',eyebrow:'05 / ROTINA MANUAL',title:'Fiados, cobranças e papéis por toda parte.',desc:'Anotações espalhadas consomem tempo e dificultam acompanhar o negócio.',tag:'DIAGNÓSTICO: INFORMAÇÕES DISPERSAS'},
  {name:'A transformação começa',eyebrow:'06 / UMA NOVA FORMA DE TRABALHAR',title:'E se fosse possível simplificar?',desc:'Os registros manuais começam a abrir espaço para uma gestão mais simples.',tag:'TRANSFORMAÇÃO EM ANDAMENTO'},
  {name:'Papéis se transformam',eyebrow:'07 / TRANSFORMAÇÃO DIGITAL',title:'Da papelada para a tecnologia.',desc:'A gestão manual abre espaço para um sistema pensado para o comércio.',tag:'PROCESSANDO TRANSFORMAÇÃO'},
  {name:'Controle+ aparece',eyebrow:'08 / CONHEÇA O CONTROLE+',title:'O controle do negócio em um só lugar.',desc:'Conheça o Controle+: PDV, fiado, estoque e gestão comercial.',tag:'CONTROLE+ / SISTEMA REAL'},
  {name:'Veja o Controle+',eyebrow:'09 / RICHARD TI + CONTROLE+',title:'Tecnologia para o seu comércio evoluir.',desc:'Suporte técnico, redes e software sob medida. Vamos conversar sobre a sua operação.',tag:'PRONTO PARA O PRÓXIMO PASSO'}
 ];

 // Coordinates are measured from the exact 941 × 1672 photographic master.
 // Focus point, magnification, and on-screen landing point are separate for desktop and mobile.
 const focuses=[
  {x:.47,y:.49,sd:1,sm:1,dx:.73,dy:.54,mx:.50,my:.53},
  {x:.47,y:.47,sd:2.43,sm:2.65,dx:.71,dy:.55,mx:.52,my:.60},
  {x:.76,y:.51,sd:2.55,sm:2.8,dx:.72,dy:.56,mx:.53,my:.61},
  {x:.47,y:.47,sd:2.48,sm:2.7,dx:.71,dy:.55,mx:.52,my:.60},
  {x:.31,y:.59,sd:2.22,sm:2.5,dx:.71,dy:.58,mx:.49,my:.62},
  {x:.48,y:.55,sd:1.07,sm:1.04,dx:.70,dy:.55,mx:.52,my:.55},
  {x:.48,y:.54,sd:1.11,sm:1.12,dx:.70,dy:.56,mx:.52,my:.55},
  {x:.47,y:.47,sd:1.55,sm:1.55,dx:.71,dy:.57,mx:.52,my:.57},
  {x:.47,y:.47,sd:2.65,sm:2.76,dx:.70,dy:.55,mx:.50,my:.59}
 ];
 const manifest=[{"file":"paper-01.png","x":105,"y":912,"w":163,"h":73,"cx":186.5,"cy":948.5,"order":0},{"file":"paper-02.png","x":126,"y":944,"w":145,"h":63,"cx":198.5,"cy":975.5,"order":1},{"file":"paper-03.png","x":274,"y":928,"w":113,"h":60,"cx":330.5,"cy":958.0,"order":2},{"file":"paper-04.png","x":90,"y":985,"w":197,"h":106,"cx":188.5,"cy":1038.0,"order":3},{"file":"paper-05.png","x":226,"y":981,"w":178,"h":128,"cx":315.0,"cy":1045.0,"order":4},{"file":"paper-06.png","x":477,"y":954,"w":175,"h":75,"cx":564.5,"cy":991.5,"order":5},{"file":"paper-07.png","x":736,"y":882,"w":166,"h":71,"cx":819.0,"cy":917.5,"order":6},{"file":"paper-08.png","x":761,"y":918,"w":145,"h":58,"cx":833.5,"cy":947.0,"order":7},{"file":"paper-09.png","x":859,"y":739,"w":82,"h":49,"cx":900.0,"cy":763.5,"order":8},{"file":"paper-10.png","x":863,"y":772,"w":78,"h":48,"cx":902.0,"cy":796.0,"order":9},{"file":"paper-11.png","x":866,"y":805,"w":75,"h":49,"cx":903.5,"cy":829.5,"order":10},{"file":"paper-12.png","x":2,"y":910,"w":97,"h":65,"cx":50.5,"cy":942.5,"order":11}];
 const pieces=[];
 // The paper textures are pixels from the original photograph, not synthetic CSS rectangles.
 manifest.forEach((m,i)=>{
   const node=document.createElement('img');node.className='photo-paper';node.src=m.file.startsWith('data:')?m.file:'assets/'+m.file;
   node.alt='';node.setAttribute('aria-hidden','true');node.draggable=false;
   node.style.left=(m.x/941*100)+'%';node.style.top=(m.y/1672*100)+'%';
   node.style.width=(m.w/941*100)+'%';node.style.height=(m.h/1672*100)+'%';
   node.style.opacity='0';holder.appendChild(node);pieces.push({node,...m,i});
 });
 const navBtns=[];
 scenes.forEach((s,i)=>{
   const b=document.createElement('button');b.type='button';b.title=`Cena ${i+1}: ${s.name}`;
   b.setAttribute('aria-label',`Ir para cena ${i+1}: ${s.name}`);
   b.addEventListener('click',()=>scrollToScene(i,prefersReduced?'instant':'smooth'));
   nav.appendChild(b);navBtns.push(b);
 });
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const ease=v=>{v=clamp(v);return v*v*(3-2*v)};
 const lerp=(a,b,p)=>a+(b-a)*p;
 const bell=(t,on,off,fade=.17)=>ease((t-on)/fade)*(1-ease((t-off)/fade));
 function scrollToScene(i,behavior='smooth'){
   const max=Math.max(0,film.offsetHeight-stage.clientHeight);
   scrollTo({top:film.offsetTop+max*i/8,behavior});
 }
 el('#intro-scroll').addEventListener('click',e=>{e.preventDefault();scrollToScene(1)});
 let lastScene=-1,displayed=0,started=false,visible=true;
 function cameraKey(i,isMobile){
   const f=focuses[i],scale=isMobile?f.sm:f.sd;
   if(i===0)return {scale:1,x:0,y:0};
   const desiredX=stage.clientWidth*(isMobile?f.mx:f.dx);
   const desiredY=stage.clientHeight*(isMobile?f.my:f.dy);
   // Translate, then scale around the image's untransformed upper-left corner.
   const x=desiredX-art.offsetLeft-f.x*art.clientWidth*scale;
   const y=desiredY-art.offsetTop-f.y*art.clientHeight*scale;
   return {scale,x,y};
 }
 function paint(t){
   t=clamp(t,0,8);
   const mobile=stage.clientWidth<=700;
   let i=Math.min(8,Math.floor(t)),j=Math.min(8,i+1),p=ease(t-i);
   const a=cameraKey(i,mobile),b=cameraKey(j,mobile);
   const s=lerp(a.scale,b.scale,p),x=lerp(a.x,b.x,p),y=lerp(a.y,b.y,p);
   art.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;

   // Opening: clean photograph + headline. Never show four error cards up front.
   const introOpacity=1-ease((t-.1)/.62);
   intro.style.opacity=introOpacity.toFixed(3);
   intro.style.transform=`translateY(${-14*(1-introOpacity)}px)`;
   intro.style.pointerEvents=introOpacity>.45?'auto':'none';

   // A card only appears after the camera lands on its own pain point.
   // The next card never appears simultaneously with the previous one.
   const cardWindows=[[.78,1.72],[2.78,3.72],[1.78,2.72],[3.78,4.72]];
   hud.forEach((card,k)=>{
     const [on,off]=cardWindows[k],opacity=bell(t,on,off,.17);
     card.style.opacity=opacity.toFixed(3);
     card.style.transform=`translate3d(0,${(14*(1-opacity)).toFixed(1)}px,0)`;
     card.style.visibility=opacity>.006?'visible':'hidden';
   });

   // Copy enters when the corresponding visual subject is already in focus.
   const chapterOpacity=ease((t-.80)/.25);
   chapter.style.opacity=chapterOpacity.toFixed(3);
   chapter.style.transform=`translateY(${(12*(1-chapterOpacity)).toFixed(1)}px)`;

   const freeze=bell(t,.78,1.78,.20);
   const disk=bell(t,2.78,3.80,.20);
   const net=bell(t,1.78,2.76,.20);
   const blackout=ease((t-5.70)/.24)*(1-ease((t-6.83)/.18));
   const controlVisible=ease((t-6.83)/.17);
   screen.style.opacity=Math.min(1,Math.max(freeze,disk,blackout,controlVisible)*1.5).toFixed(3);
   loading.style.opacity=freeze.toFixed(3);
   storage.style.opacity=disk.toFixed(3);
   black.style.opacity=blackout.toFixed(3);
   control.style.opacity=controlVisible.toFixed(3);
   network.style.opacity=net.toFixed(3);

   // As each real paper cutout lifts, reveal only its region of the retouched table.
   // The photo outside paper masks remains unchanged in every scene.
   const liftState=ease((t-5.40)/1.02)*.83;
   clean.style.opacity=liftState.toFixed(3);
   for (const ppr of pieces){
     const delay=(ppr.i%6)*.065 + Math.floor(ppr.i/6)*.035;
     const u=clamp((t-(5.34+delay))/.96);
     if(u<=0||u>=1){ppr.node.style.opacity='0';continue}
     const q=ease(u);
     const tx=445+((ppr.i%5)-2)*9,ty=773+((ppr.i%4)-2)*7;
     const startX=ppr.cx,startY=ppr.cy;
     const cx=lerp(startX,tx,.49)+(ppr.i%2?52:-38);
     const cy=Math.min(startY,ty)-145-(ppr.i%3)*32;
     const X=(1-q)*(1-q)*startX+2*(1-q)*q*cx+q*q*tx;
     const Y=(1-q)*(1-q)*startY+2*(1-q)*q*cy+q*q*ty;
     const sx=(X-startX)*(art.clientWidth/941),sy=(Y-startY)*(art.clientHeight/1672);
     const scale=lerp(1,.11,q);
     const angle=(ppr.i%2?1:-1)*(16+70*q)*Math.sin(Math.PI*q);
     const tilt=(ppr.i%2?1:-1)*14*Math.sin(Math.PI*q);
     ppr.node.style.transform=`translate3d(${sx.toFixed(1)}px,${sy.toFixed(1)}px,0) rotate(${angle.toFixed(1)}deg) rotateY(${tilt.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
     ppr.node.style.opacity=(ease(u/.10)*(1-ease((u-.77)/.23))).toFixed(3);
   }
   stage.classList.toggle('is-resolving',t>=5.05);
   const n=Math.min(8,Math.floor(t+.12));
   if(n!==lastScene){
     lastScene=n;label.textContent=scenes[n].eyebrow;title.textContent=scenes[n].title;
     detail.textContent=scenes[n].desc;tag.textContent=scenes[n].tag;
     number.textContent=String(n+1).padStart(2,'0');
     navBtns.forEach((btn,k)=>{btn.classList.toggle('active',k===n);if(k===n)btn.setAttribute('aria-current','step');else btn.removeAttribute('aria-current')});
   }
   hint.style.opacity=(1-ease((t-.08)/.9)).toFixed(3);
   bar.style.width=(t/8*100).toFixed(3)+'%';
 }
 function tick(){
   if(!visible){requestAnimationFrame(tick);return}
   const span=Math.max(1,film.offsetHeight-stage.clientHeight);
   const target=clamp(-film.getBoundingClientRect().top/span)*8;
   if(!started){displayed=target;started=true}
   else displayed=prefersReduced?target:lerp(displayed,target,.20);
   if(Math.abs(target-displayed)<.0002)displayed=target;
   paint(displayed);requestAnimationFrame(tick);
 }
 document.addEventListener('visibilitychange',()=>{visible=!document.hidden});
 requestAnimationFrame(tick);
 document.querySelectorAll('[data-wa]').forEach(a=>{
   const forControl=a.dataset.wa==='controle';
   const msg=forControl?'Olá! Vi o Controle+ no site da Richard TI e gostaria de saber como ele pode ajudar meu comércio.':'Olá! Vi o site da Richard TI e gostaria de conversar sobre tecnologia para o meu comércio.';
   a.href='https://wa.me/5562999407334?text='+encodeURIComponent(msg);
   a.addEventListener('click',()=>{try{if(window.gtag)window.gtag('event','generate_lead',{event_category:'contact',lead_source:a.dataset.wa});if(window.fbq)window.fbq('track','Lead',{content_name:a.dataset.wa})}catch(e){}});
 });
 const params=new URLSearchParams(location.search),initial=Number(params.get('scene'));
 if(Number.isInteger(initial)&&initial>=1&&initial<=9){addEventListener('load',()=>scrollToScene(initial-1,'instant'),{once:true});}
})();
