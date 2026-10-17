(()=>{
'use strict';
const $=(s)=>document.querySelector(s);
const camera=$('#camera'),film=$('#narrativa'),stage=$('#stage'),caption=$('#story');
const title=$('#title'),description=$('#description'),kicker=$('#kicker');
const progress=$('#progress-fill'),number=$('#currentScene'),action=$('#final-action'),note=$('#scroll-note');
const screenState={freeze:$('#frame-freeze'),disk:$('#frame-disk'),black:$('#frame-black'),controle:$('#frame-controle')};
const network=$('#network-svg'),netLabel=$('#net-label');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scenes=[
 {label:'01 / O COTIDIANO',title:'Seu comércio não pode parar.',desc:'Por trás de cada venda, existe uma operação que precisa funcionar.',focus:null},
 {label:'02 / COMPUTADOR LENTO',title:'O sistema travou. O caixa parou.',desc:'Cada minuto esperando é tempo perdido no atendimento.',focus:[.60,.19]},
 {label:'03 / REDE INTERNA',title:'Sua equipe precisa estar conectada.',desc:'Computadores, impressoras e servidores precisam se comunicar.',focus:[.87,.33]},
 {label:'04 / SEUS ARQUIVOS',title:'E se você perdesse tudo?',desc:'Arquivos de vendas, clientes e estoque merecem proteção.',focus:[.60,.19]},
 {label:'05 / CONTROLES MANUAIS',title:'Quanto trabalho cabe nesses papéis?',desc:'Fiados, cobranças e informações espalhadas pela mesa.',focus:[.83,.51]},
 {label:'06 / UMA NOVA POSSIBILIDADE',title:'Existe outro jeito de trabalhar.',desc:'Tecnologia que acompanha a rotina do seu comércio.',focus:null},
 {label:'07 / TRANSFORMAÇÃO',title:'Do papel para o controle.',desc:'A organização começa quando o trabalho deixa de ficar espalhado.',focus:null},
 {label:'08 / CONTROLE+',title:'Seu negócio. Mais organizado.',desc:'Conheça o Controle+: PDV, fiado, estoque e gestão comercial.',focus:null},
 {label:'09 / CONHEÇA O CONTROLE+',title:'Tudo em um só lugar.',desc:'Conheça o Controle+ e as soluções da Richard TI.',focus:[.60,.19]}
];
const paperLayer=$('#paper-layer');const papers=[];
const from=[[.75,.46],[.8,.52],[.83,.56],[.88,.55],[.72,.55],[.63,.53],[.51,.45],[.33,.44],[.2,.43],[.18,.40],[.7,.63],[.8,.61],[.86,.63],[.54,.51],[.78,.42],[.37,.34],[.43,.42],[.92,.49],[.3,.49],[.56,.57],[.7,.49],[.34,.48],[.49,.49],[.65,.55]];
from.forEach(([x,y],i)=>{const node=document.createElement('div');node.className='paper';node.style.left=(x*100)+'%';node.style.top=(y*100)+'%';paperLayer.appendChild(node);papers.push({node,x,y,i})});
function clamp(x,a=0,b=1){return Math.min(b,Math.max(a,x))}
function smooth(x){x=clamp(x);return x*x*(3-2*x)}
function around(t,center,span=.74){return smooth((t-center+span)/.46)* (1-smooth((t-center)/.46))}
function makePos(p){
 let w=camera.clientWidth || window.innerWidth,h=w*(2/3);
 let mobile=window.innerWidth<700;
 let scale=1,x=0,y=0;
 if(p.focus){
  scale=mobile?(p===scenes[4]?3.23:p===scenes[2]?3.32:3.22):(p===scenes[4]?2.15:p===scenes[2]?2.12:2.05);
  x=(.5-p.focus[0])*w*scale;
  y=(.5-p.focus[1])*h*scale;
  if(mobile)y-=stage.clientHeight*.055; // keep focus above caption
  else y-=stage.clientHeight*.06;
 }
 return {scale,x,y};
}
function cameraFor(t){let from=Math.min(8,Math.floor(t)),to=Math.min(8,from+1),k=smooth(t-from);const a=makePos(scenes[from]),b=makePos(scenes[to]);return {scale:a.scale+(b.scale-a.scale)*k,x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k}}
let previous=-1,progressFromScroll=0,rendered=0,first=true;
function updateText(i){if(i===previous)return;previous=i;kicker.textContent=scenes[i].label;title.textContent=scenes[i].title;description.textContent=scenes[i].desc;number.textContent=String(i+1).padStart(2,'0');caption.classList.toggle('is-final',i===8)}
function paint(t){
 const c=cameraFor(t);
 camera.style.transform=`translate3d(calc(-50% + ${c.x.toFixed(2)}px), calc(-50% + ${c.y.toFixed(2)}px), 0) scale(${c.scale.toFixed(4)})`;
 // The screen changes on the SAME monitor, without replacing the office or its equipment.
 screenState.freeze.style.opacity=around(t,1,.68).toFixed(3);
 screenState.disk.style.opacity=around(t,3,.68).toFixed(3);
 screenState.black.style.opacity=(smooth((t-5.85)/.7)*(1-smooth((t-6.8)/.42))).toFixed(3);
 screenState.controle.style.opacity=smooth((t-6.92)/.32).toFixed(3);
 let net=around(t,2,.74);network.style.opacity=net.toFixed(3);netLabel.style.opacity=net.toFixed(3);
 const w=camera.clientWidth||1,h=w*2/3;
 for(const p of papers){
   let delay=(p.i%7)*.075;
   let lift=smooth((t-5.1-delay)/.62),travel=smooth((t-5.8-delay)/.82);
   let q=Math.max(lift,travel);
   let dx=(.60-p.x)*w*travel;
   let dy=-(29+(p.i%6)*18)*lift+(.19-p.y)*h*travel;
   p.node.style.transform=`translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) rotate(${(p.i%2?-1:1)*q*(17+p.i*9)}deg) scale(${Math.max(.28,1-travel*.7).toFixed(3)})`;
   p.node.style.opacity=(smooth((t-5.15-delay)/.26)*(1-smooth((t-6.22-delay)/.62))*.93).toFixed(3);
 }
 updateText(Math.round(t));
 const a=smooth((t-7.61)/.25);action.style.opacity=a;action.style.pointerEvents=a>.9?'auto':'none';note.style.opacity=1-smooth((t-1.0)/1.3);
 progress.style.width=(t/8*100).toFixed(2)+'%';
}
function frame(){const end=Math.max(1,film.offsetHeight-innerHeight),rect=film.getBoundingClientRect();progressFromScroll=clamp(-rect.top/end)*8;
 if(first){rendered=progressFromScroll;first=false}
 else rendered=reduced?progressFromScroll:rendered+(progressFromScroll-rendered)*.18;
 paint(rendered);requestAnimationFrame(frame)}
// On direct open in a browser, navigation works even without GSAP/CDNs.
function ensureImages(){for(const item of Object.values(screenState)){if(!item.complete) item.loading='eager'}}
ensureImages();requestAnimationFrame(frame);
const campaignKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'];
const usp=new URLSearchParams(location.search);const campaign={};campaignKeys.forEach(k=>{if(usp.get(k))campaign[k]=usp.get(k)});
document.querySelectorAll('[data-wa]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();let subject=a.dataset.wa==='controle'?'Tenho interesse em conhecer o Controle+ e as soluções da Richard TI.':'Quero conversar sobre uma necessidade de TI do meu comércio.';
 const msg='Olá, Richard! Vim pelo site. '+subject+(campaign.utm_campaign?' Campanha: '+campaign.utm_campaign+'.':'');
 if(window.gtag)gtag('event','generate_lead',{lead_source:'whatsapp',cta:a.dataset.wa,...campaign});
 if(window.fbq)fbq('track','Lead',{content_name:a.dataset.wa});
 location.href='https://wa.me/5562999407334?text='+encodeURIComponent(msg)}));
window.addEventListener('keydown',e=>{if((e.key==='ArrowRight'||e.key==='ArrowLeft')&&!(e.target instanceof HTMLInputElement)){e.preventDefault();const i=Math.round(progressFromScroll),next=clamp(i+(e.key==='ArrowRight'?1:-1),0,8);const end=film.offsetHeight-innerHeight;window.scrollTo({top:film.offsetTop+(next/8)*end,behavior:'smooth'})}});
const sceneParam=Number(new URLSearchParams(location.search).get('scene'));
if(Number.isInteger(sceneParam)&&sceneParam>=1&&sceneParam<=9){addEventListener('load',()=>{const end=film.offsetHeight-innerHeight;scrollTo(0,film.offsetTop+((sceneParam-1)/8)*end)},{once:true})}
})();
