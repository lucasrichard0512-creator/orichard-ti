/* Richard TI — narrativa com câmera reversível.
 * Inspiração arquitetural: BSMNT Scrollytelling (MIT), progress timeline com scrub;
 * capítulos independentes inspirados em map-scrollytelling, sem copiar o motor Mapbox.
 * Funciona localmente, sem downloads de bibliotecas ou serviços externos.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const film=$('inicio'),track=$('story-track'),world=$('world'),card=$('story-copy');
const h=$('story-heading'),desc=$('story-description'),kicker=$('chapter-kicker'),index=$('chapter-index'),tag=$('story-tag');
const caption=$('scene-caption'),annotation=$('annotation-label'),count=$('scene-count'),progressFill=$('progress-fill');
const screen=$('monitor-lcd'),loader=$('monitor-loader'),storage=$('monitor-storage'),login=$('controle-login'),router=$('router-pulse'),leafLayer=$('floating-papers');
const railButtons=Array.from(document.querySelectorAll('[data-step]'));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[
 {t:0.00,k:'O SEU DIA A DIA',a:'OPERAÇÃO DO DIA A DIA',title:'Seu comércio <em>não pode parar.</em>',desc:'Por trás de cada venda existe uma operação inteira. E a tecnologia deveria ajudar, não atrapalhar.',tag:'Conheça os desafios. Descubra a solução.'},
 {t:.104,k:'01 / COMPUTADOR LENTO',a:'O COMPUTADOR TRAVOU',title:'O computador trava. <em>A rotina também.</em>',desc:'Quando a máquina fica lenta, até uma tarefa simples vira demora. E cliente nenhum gosta de esperar.',tag:'Suporte para manter o trabalho em movimento.'},
 {t:.212,k:'02 / REDE INTERNA',a:'COMPUTADORES + IMPRESSORA + SISTEMA',title:'Não é a internet. <em>É a rede interna.</em>',desc:'Sistemas desconectados, impressora que some e computadores que não se comunicam. O problema está dentro do comércio.',tag:'Uma rede confiável faz diferença todos os dias.'},
 {t:.322,k:'03 / ARQUIVOS',a:'ARMAZENAMENTO EM RISCO',title:'Seus arquivos <em>valem muito.</em>',desc:'Armazenamento lotado, falhas e formatações inesperadas podem colocar anos de informações em risco.',tag:'Organização, prevenção e rotinas de backup.'},
 {t:.432,k:'04 / PAPELADA',a:'FIADOS + COMPROVANTES + ANOTAÇÕES',title:'Muito papel. <em>Pouco controle.</em>',desc:'Fiados no caderno, comprovantes soltos e informações espalhadas. Você trabalha dobrado para encontrar o que precisa.',tag:'A tecnologia deve simplificar, não complicar.'},
 {t:.543,k:'05 / O PONTO DE VIRADA',a:'OS DOCUMENTOS COMEÇAM A SUBIR',title:'E se tudo isso <em>ficasse mais simples?</em>',desc:'Imagine tirar o peso dos controles manuais da sua rotina e enxergar melhor o que acontece no negócio.',tag:'A transformação começa com organização.'},
 {t:.654,k:'06 / TRANSFORMAÇÃO',a:'DOS PAPÉIS PARA A TELA',title:'Do papel <em>para o digital.</em>',desc:'O que antes estava espalhado começa a se conectar. Os registros ganham um só caminho.',tag:'Menos retrabalho. Mais clareza.'},
 {t:.757,k:'07 / CONTROLE+',a:'CONTROLE+ — ACESSO AO SISTEMA',title:'Conheça o <em>Controle+.</em>',desc:'Uma solução para aproximar vendas, fiados, estoque e gestão da realidade do seu comércio.',tag:'Tela de acesso real do Controle+.'},
 {t:.865,k:'08 / O PRÓXIMO PASSO',a:'SEU COMÉRCIO NO CONTROLE',title:'A tecnologia certa <em>trabalha com você.</em>',desc:'A Richard TI ajuda seu comércio a funcionar melhor, com suporte, redes internas, organização e soluções digitais.',tag:'Seu próximo passo está logo abaixo.'}
];
// Cada entrada recebe um alvo de câmera. A interpolação é contínua e bidirecional.
// c = coordenadas do ponto de interesse na imagem-base original (1448 x 1086).
const cameras=[
 {t:0,part:'home'},{t:.075,part:'home'},
 {t:.143,part:'computer'}, {t:.196,part:'computer'},
 {t:.252,part:'network'}, {t:.310,part:'network'},
 {t:.354,part:'storage'}, {t:.416,part:'storage'},
 {t:.468,part:'documents'}, {t:.526,part:'documents'},
 {t:.575,part:'home'}, {t:.632,part:'home'},
 {t:.696,part:'transition'}, {t:.748,part:'transition'},
 {t:.817,part:'product'}, {t:.866,part:'product'},
 {t:.958,part:'final'}, {t:1,part:'final'}
];
const anchors={home:[724,520],computer:[527,277],network:[1129,112],storage:[527,277],documents:[811,459],transition:[690,396],product:[527,277],final:[527,276]};
const easing=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,f)=>a+(b-a)*f;
let target=0,displayed=0,raf=0,prev=0,active=-1,viewW=innerWidth,viewH=innerHeight;
let baseScale=.55;
const fit=()=>{
 viewW=innerWidth;viewH=innerHeight;
 if(viewW<=700) baseScale=Math.min(viewW*.998/1448,viewH*.50/1086);
 else baseScale=Math.min(viewW*.624/1448,viewH*.81/1086);
};
const scaleFor=part=>{
 const mobile=viewW<=700,tablet=viewW>700&&viewW<1050;
 const desktop={home:baseScale,computer:1.52,network:1.56,storage:1.54,documents:1.28,transition:.94,product:1.48,final:2.03};
 const mobileValues={home:baseScale,computer:1.08,network:1.19,storage:1.12,documents:.92,transition:.42,product:1.15,final:1.44};
 const tabletValues={home:baseScale,computer:1.23,network:1.28,storage:1.25,documents:1.04,transition:.70,product:1.30,final:1.75};
 return (mobile?mobileValues:tablet?tabletValues:desktop)[part];
};
const cameraState=part=>{
 const [ax,ay]=anchors[part],s=scaleFor(part);
 let vx,vy;
 if(viewW<=700){vx=viewW*.49;vy=viewH*(part==='home'?.735:part==='transition'?.72:.61)}
 else{vx=viewW*(part==='home'?.70:.69);vy=viewH*(part==='home'?.55:.53)}
 return {x:vx-ax*s,y:vy-ay*s,s};
};
const getCamera=p=>{
 let next=cameras[cameras.length-1];let prevCam=cameras[0];
 for(let i=1;i<cameras.length;i++){if(p<=cameras[i].t){next=cameras[i];break}prevCam=cameras[i]}
 const from=cameraState(prevCam.part),to=cameraState(next.part);
 const t=easing((p-prevCam.t)/Math.max(.00001,next.t-prevCam.t));
 return {x:mix(from.x,to.x,t),y:mix(from.y,to.y,t),s:mix(from.s,to.s,t)};
};
const getActive=p=>{
 let scene=0;for(let i=1;i<scenes.length;i++)if(p>=scenes[i].t)scene=i;return scene;
};
const sceneToMarkup=(n)=>{
 const s=scenes[n];index.textContent=String(n+1).padStart(2,'0');
 kicker.textContent=s.k;h.innerHTML=s.title;desc.textContent=s.desc;
 tag.lastElementChild.textContent=s.tag;caption.textContent=s.a;annotation.textContent=s.a;
 count.textContent=String(n+1).padStart(2,'0')+' / 09';
 railButtons.forEach((b,i)=>{b.classList.toggle('is-current',i===n);if(i===n)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
};
let fadeTimeout=0;
const setScene=n=>{
 if(n===active)return;active=n;
 if(reduced.matches){sceneToMarkup(n);return}
 card.classList.add('is-fading');
 clearTimeout(fadeTimeout);
 fadeTimeout=setTimeout(()=>{sceneToMarkup(n);card.classList.remove('is-fading')},140);
};
const leafSeeds=[
 [679,484,94,0,0],[720,501,108,1,24],[760,482,100,2,-23],[817,511,88,3,42],[859,479,110,4,-19],
 [890,442,111,1,23],[947,411,100,0,-28],[1000,398,96,3,16],[924,470,102,4,-42],
 [676,522,95,2,-23],[783,464,87,3,29],[1017,350,109,1,5],[965,369,88,4,-32],[838,489,90,0,13]
];
const paperElements=leafSeeds.map(([x,y,w,src,spin],i)=>{
 let img=document.createElement('img');img.src=`assets/papel-${src+1}.webp`;img.alt='';img.className='paper-leaf';
 img.loading='lazy';img.decoding='async';img.style.width=w+'px';img.style.left=x+'px';img.style.top=y+'px';
 img.dataset.spin=spin;leafLayer.appendChild(img);return img;
});
const renderPaper=p=>{
 const start=.577,hoverEnd=.684,end=.784;
 const sceneOn=p>start&&p<end;
 if(!sceneOn){leafLayer.style.visibility='hidden';return}
 leafLayer.style.visibility='visible';
 paperElements.forEach((el,i)=>{
 const [x,y,w,src,spin]=leafSeeds[i];
 const u=easing(clamp((p-start-i*.0022)/(hoverEnd-start)));
 const v=easing(clamp((p-(hoverEnd+i*.0018))/(end-hoverEnd-i*.0018)));
 const drift=Math.sin(i*3.7)*172,high=160+(i%5)*43;
 const hx=x+drift,hy=y-high;
 const fx=527+(i%5-2)*9,fy=277+(i%4-1.5)*7;
 const dx=mix(mix(x,hx,u),fx,v)-x;
 const dy=mix(mix(y,hy,u),fy,v)-y;
 const rot=spin+u*(i%2?94:-108)+v*(i%2?-242:227);
 const rotY=u*(i%3-1)*57+v*100;
 const scale=mix(1.04,.2,v);
 const emerge=clamp((p-start-i*.0022)/.023),fade=clamp((end-p)/.017);
 el.style.opacity=(emerge*fade).toFixed(3);
 el.style.transform=`translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,${(u*260+v*130).toFixed(1)}px) rotateZ(${rot.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
 });
};
const render=p=>{
 // Cena física isolada; a câmera aproxima elementos sem introduzir chão/paredes.
 const c=getCamera(p);
 world.style.transform=`translate3d(${c.x.toFixed(2)}px,${(c.y+Math.sin(p*Math.PI)*9).toFixed(2)}px,0) scale(${c.s.toFixed(5)})`;
 progressFill.style.width=(p*100).toFixed(2)+'%';
 const inLoader=clamp((p-.128)/.018)* (1-clamp((p-.200)/.018));
 const inStorage=clamp((p-.337)/.022)*(1-clamp((p-.420)/.022));
 const inLogin=clamp((p-.761)/.045);
 loader.style.opacity=inLoader.toFixed(3);
 storage.style.opacity=inStorage.toFixed(3);
 login.style.opacity=inLogin.toFixed(3);
 screen.style.opacity='1';
 router.style.opacity=(clamp((p-.232)/.032)*(1-clamp((p-.310)/.032))).toFixed(3);
 renderPaper(p);
 film.classList.toggle('is-finishing',p>.975);
};
function frame(now){raf=0;
 const dt=Math.min(.05,Math.max(.001,(now-(prev||now))/1000));prev=now;
 if(reduced.matches){displayed=target}
 else displayed=mix(displayed,target,1-Math.exp(-dt*9));
 if(Math.abs(target-displayed)<.000055)displayed=target;
 render(displayed);
 if(Math.abs(target-displayed)>.000055)raf=requestAnimationFrame(frame);
}
const request=()=>{if(!raf)raf=requestAnimationFrame(frame)};
const updateScroll=()=>{
 // A faixa narrativa tem sua própria duração: rolar mais não congela a última cena.
 const trackHeight=track.getBoundingClientRect().height;
 const y=window.scrollY||document.documentElement.scrollTop;
 target=clamp(y/Math.max(1,trackHeight));
 const after=y>=trackHeight-2;
 film.classList.toggle('is-hidden',after);
 if(after&&raf){cancelAnimationFrame(raf);raf=0;displayed=target}
 else if(!after){setScene(getActive(target));request()}
};
const jumpTo=n=>{const y=scenes[n].t*track.getBoundingClientRect().height;
 window.scrollTo({top:y,behavior:reduced.matches?'instant':'smooth'})};
railButtons.forEach(b=>b.addEventListener('click',()=>jumpTo(Number(b.dataset.step))));
$('skip-film').addEventListener('click',()=>document.querySelector('#depois-da-historia').scrollIntoView({behavior:reduced.matches?'instant':'smooth'}));
window.addEventListener('scroll',updateScroll,{passive:true});
window.addEventListener('resize',()=>{fit();updateScroll();request()},{passive:true});
window.addEventListener('orientationchange',()=>setTimeout(()=>{fit();updateScroll();request()},140),{passive:true});
reduced.addEventListener?.('change',()=>{request()});
$('year').textContent=new Date().getFullYear();
// A marca e o botão de replay voltam ao início mesmo com a primeira cena fixa.
[...document.querySelectorAll('a[href="#inicio"]')].forEach(link=>link.addEventListener('click',e=>{
 e.preventDefault(); window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});
}));
// Início acessível via teclado; setas/PageDown continuam com rolagem nativa.
fit();sceneToMarkup(0);active=0;updateScroll();request();
})();
