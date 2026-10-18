(()=>{
  'use strict';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const film=$('#experiencia'),stage=$('#stage'),art=$('#scene-art'),intro=$('#intro'),hint=$('#scroll-hint');
  const hud=$$('.diagnostics .hud'),chapters=$$('.chapter-panel');
  const leader=$('#diagnostic-leader'),leaderLine=$('#leader-line'),leaderEnd=$('#leader-end');
  const loading=$('#screen-loading'),storage=$('#screen-storage'),dark=$('#screen-dark'),control=$('#screen-control'),pdv=$('#screen-pdv');
  const screenBorder=$('#screen-border'),network=$('#network-overlay'),glow=$('#transfer-glow');
  const number=$('#scene-number'),progress=$('#progress-fill'),nav=$('#scene-nav');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
  const fade=(t,on,off,span=.23)=>smooth((t-on)/span)*(1-smooth((t-off)/span));
  const lerp=(a,b,p)=>a+(b-a)*p;
  const labels=['O cotidiano','Sistema travando','Rede interna','Armazenamento','Controles manuais','Papéis levantando','Papéis no monitor','Controle+','Zoom final'];
  // Zoom is restricted by the photographic source. High-contrast UI is native DOM and remains crisp.
  // Visual landmarks measured on the exact same master photo (941 x 1672).
  const focus=[
    {x:.47,y:.53,sd:1,sm:1,dx:.73,dy:.57,mx:.50,my:.57},
    {x:.468,y:.468,sd:2.03,sm:2.37,dx:.71,dy:.57,mx:.50,my:.60},
    {x:.752,y:.507,sd:2.15,sm:2.46,dx:.70,dy:.58,mx:.51,my:.60},
    {x:.468,y:.468,sd:2.03,sm:2.37,dx:.71,dy:.57,mx:.50,my:.60},
    {x:.300,y:.614,sd:1.82,sm:2.22,dx:.73,dy:.63,mx:.50,my:.64},
    {x:.47,y:.53,sd:1.04,sm:1.04,dx:.73,dy:.57,mx:.50,my:.57},
    {x:.47,y:.53,sd:1.05,sm:1.09,dx:.73,dy:.57,mx:.50,my:.57},
    {x:.468,y:.468,sd:1.53,sm:1.52,dx:.70,dy:.57,mx:.50,my:.59},
    {x:.468,y:.468,sd:2.45,sm:2.75,dx:.70,dy:.57,mx:.50,my:.61}
  ];
  const landmarks=[{x:.47,y:.47},{x:.752,y:.507},{x:.47,y:.47},{x:.30,y:.61}];
  const manifest=[{"file":"folha-real-01.png","x":102,"y":914,"w":173,"h":97,"cx":188.5,"cy":962.5,"i":0,"patch":"vazio-folha-real-01.png","flight_file":"folha-voo-01.png","flight_x":157.5,"flight_y":922.5,"flight_w":62,"flight_h":80},{"file":"folha-real-02.png","x":275,"y":930,"w":107,"h":71,"cx":328.5,"cy":965.5,"i":1,"patch":"vazio-folha-real-02.png","flight_file":"folha-voo-02.png","flight_x":293.0,"flight_y":922.0,"flight_w":71,"flight_h":87},{"file":"folha-real-03.png","x":78,"y":994,"w":234,"h":155,"cx":195.0,"cy":1071.5,"i":2,"patch":"vazio-folha-real-03.png","flight_file":"folha-voo-03.png","flight_x":155.0,"flight_y":1024.5,"flight_w":80,"flight_h":94},{"file":"folha-real-04.png","x":234,"y":965,"w":201,"h":160,"cx":334.5,"cy":1045.0,"i":3,"patch":"vazio-folha-real-04.png","flight_file":"folha-voo-04.png","flight_x":303.5,"flight_y":994.5,"flight_w":62,"flight_h":101},{"file":"folha-real-05.png","x":448,"y":962,"w":206,"h":111,"cx":551.0,"cy":1017.5,"i":4,"patch":"vazio-folha-real-05.png","flight_file":"folha-voo-05.png","flight_x":515.5,"flight_y":977.5,"flight_w":71,"flight_h":80},{"file":"folha-real-06.png","x":776,"y":883,"w":137,"h":73,"cx":844.5,"cy":919.5,"i":5,"patch":"vazio-folha-real-06.png","flight_file":"folha-voo-06.png","flight_x":804.5,"flight_y":876.0,"flight_w":80,"flight_h":87},{"file":"folha-real-07.png","x":856,"y":745,"w":85,"h":58,"cx":898.5,"cy":774.0,"i":6,"patch":"vazio-folha-real-07.png","flight_file":"folha-voo-07.png","flight_x":867.5,"flight_y":727.0,"flight_w":62,"flight_h":94},{"file":"folha-real-08.png","x":849,"y":789,"w":92,"h":77,"cx":895.0,"cy":827.5,"i":7,"patch":"vazio-folha-real-08.png","flight_file":"folha-voo-08.png","flight_x":859.5,"flight_y":777.0,"flight_w":71,"flight_h":101},{"file":"folha-real-09.png","x":0,"y":885,"w":75,"h":91,"cx":37.5,"cy":930.5,"i":8,"patch":"vazio-folha-real-09.png","flight_file":"folha-voo-09.png","flight_x":-2.5,"flight_y":890.5,"flight_w":80,"flight_h":80},{"file":"folha-real-10.png","x":1,"y":938,"w":101,"h":91,"cx":51.5,"cy":983.5,"i":9,"patch":"vazio-folha-real-10.png","flight_file":"folha-voo-10.png","flight_x":20.5,"flight_y":940.0,"flight_w":62,"flight_h":87},{"file":"folha-real-11.png","x":365,"y":964,"w":233,"h":109,"cx":481.5,"cy":1018.5,"i":10,"patch":"vazio-folha-real-11.png","flight_file":"folha-voo-11.png","flight_x":446.0,"flight_y":971.5,"flight_w":71,"flight_h":94},{"file":"folha-real-12.png","x":708,"y":897,"w":191,"h":80,"cx":803.5,"cy":937.0,"i":11,"patch":"vazio-folha-real-12.png","flight_file":"folha-voo-12.png","flight_x":763.5,"flight_y":886.5,"flight_w":80,"flight_h":101}];
  const flying=$('#flying-papers'),pieces=[];
  manifest.forEach((p,i)=>{
    const hole=new Image();hole.src='assets/'+p.patch;hole.alt='';hole.className='paper-void';hole.setAttribute('aria-hidden','true');
    const sheet=new Image();sheet.src='assets/'+p.flight_file;sheet.alt='';sheet.className='photo-paper';sheet.setAttribute('aria-hidden','true');
    for(const n of [hole,sheet]){
      n.draggable=false;n.style.left=(n===sheet?p.flight_x:p.x)/941*100+'%';n.style.top=(n===sheet?p.flight_y:p.y)/1672*100+'%';
      n.style.width=(n===sheet?p.flight_w:p.w)/941*100+'%';n.style.height=(n===sheet?p.flight_h:p.h)/1672*100+'%';flying.appendChild(n);
    }
    hole.style.position='absolute';hole.style.opacity='0';hole.style.zIndex=1;hole.style.pointerEvents='none';
    sheet.style.opacity='0';sheet.style.zIndex=2;
    pieces.push({...p,hole,sheet});
  });
  let lastNum=-1,played=false,displayed=0,frameToken=0;
  const navBtns=[];
  function scrollToScene(i,behavior='smooth'){
    const range=Math.max(1,film.offsetHeight-stage.clientHeight);
    window.scrollTo({top:film.offsetTop+range*(i/8),behavior});
  }
  labels.forEach((s,i)=>{
    const b=document.createElement('button');b.type='button';b.title=`${i+1}. ${s}`;
    b.setAttribute('aria-label',`Ir para etapa ${i+1}: ${s}`);
    b.addEventListener('click',()=>scrollToScene(i,reduced?'instant':'smooth'));
    nav.appendChild(b);navBtns.push(b);
  });
  $('#intro-scroll').addEventListener('click',e=>{e.preventDefault();scrollToScene(1)});
  function cameraKey(i,mobile){
    if(i===0||reduced)return {x:0,y:0,s:1};
    const f=focus[i],s=mobile?f.sm:f.sd;
    const desiredX=stage.clientWidth*(mobile?f.mx:f.dx),desiredY=stage.clientHeight*(mobile?f.my:f.dy);
    return {s,x:desiredX-art.offsetLeft-f.x*art.clientWidth*s,y:desiredY-art.offsetTop-f.y*art.clientHeight*s};
  }
  function posOnScreen(pt,x,y,s){return {x:art.offsetLeft+x+pt.x*art.clientWidth*s,y:art.offsetTop+y+pt.y*art.clientHeight*s};}
  function transformStage(t){
    t=clamp(t,0,8);const mobile=stage.clientWidth<=700;
    const i=Math.min(8,Math.floor(t)),j=Math.min(8,i+1),p=smooth(t-i);
    const a=cameraKey(i,mobile),b=cameraKey(j,mobile);
    const sc=lerp(a.s,b.s,p),camX=lerp(a.x,b.x,p),camY=lerp(a.y,b.y,p);
    art.style.transform=`translate3d(${camX.toFixed(2)}px,${camY.toFixed(2)}px,0) scale(${sc.toFixed(4)})`;
    // The opening is an unobstructed hero. Diagnostics have their own narrative moments.
    const introOp=1-smooth((t-.06)/.53);
    intro.style.opacity=introOp.toFixed(3);intro.style.pointerEvents=introOp>.3?'auto':'none';
    intro.style.transform=`translate3d(0,${(-9*(1-introOp)).toFixed(1)}px,0)`;
    chapters.forEach((ch,k)=>{
      const scene=k+1,op=fade(t,scene-.42,scene+.28,.37);
      ch.style.opacity=op.toFixed(3);ch.style.visibility=op>.007?'visible':'hidden';
      ch.style.transform=`translateY(${(14*(1-op)).toFixed(1)}px)`;
    });
    const introCards=[hud[0],hud[1],hud[2],hud[3]];
    let active=-1,maxOp=0;
    introCards.forEach((card,k)=>{
      const n=k+1,op=fade(t,n-.21,n+.34,.21);
      card.style.opacity=op.toFixed(3);card.style.visibility=op>.009?'visible':'hidden';
      if(op>maxOp){maxOp=op;active=k;}
    });
    if(active>=0&&maxOp>.009){
      const card=hud[active],landmark=landmarks[active];
      const point=posOnScreen(landmark,camX,camY,sc);
      const sw=stage.clientWidth,sh=stage.clientHeight;
      const cw=mobile?Math.min(232,sw-44):Math.min(290,sw*.21);
      const ch=mobile?79:93;
      // A short callout line links each physical device to the copy panel, not to the page footer.
      let bx,by;
      if(mobile){bx=clamp(point.x-75,19,sw-cw-21);by=clamp(point.y+95,sh*.52,sh-ch-84);}
      else {bx=point.x>sw*.65?point.x-cw-42:point.x+40;bx=clamp(bx,sw*.46,sw-cw-37);by=clamp(point.y-105,sh*.24,sh-ch-85);}
      card.style.width=cw+'px';card.style.left=Math.round(bx)+'px';card.style.top=Math.round(by)+'px';
      card.style.transform=`translate3d(0,${(10*(1-maxOp)).toFixed(1)}px,0)`;
      const qx=clamp(point.x,bx+6,bx+cw-6),qy=by>point.y?by:by+ch;
      const midY=(point.y+qy)/2;
      leader.setAttribute('viewBox',`0 0 ${sw} ${sh}`);
      leaderLine.setAttribute('d',`M ${qx.toFixed(1)} ${qy.toFixed(1)} C ${qx.toFixed(1)} ${midY.toFixed(1)} ${point.x.toFixed(1)} ${midY.toFixed(1)} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`);
      leaderEnd.setAttribute('cx',point.x.toFixed(1));leaderEnd.setAttribute('cy',point.y.toFixed(1));
      leader.style.opacity=(maxOp*.93).toFixed(3);
    }else leader.style.opacity='0';
    // True overlays on the source monitor: crisp text at high zoom, same physical display.
    const freeze=fade(t,.70,1.44,.27),disk=fade(t,2.71,3.44,.26);
    const blackout=smooth((t-5.72)/.32)*(1-smooth((t-6.83)/.18));
    const controlOp=smooth((t-6.67)/.25);
    pdv.style.opacity=clamp(1-Math.max(freeze,disk,blackout,controlOp)).toFixed(3);
    loading.style.opacity=freeze.toFixed(3);storage.style.opacity=disk.toFixed(3);
    dark.style.opacity=blackout.toFixed(3);control.style.opacity=controlOp.toFixed(3);
    screenBorder.style.opacity=Math.max(freeze,disk,controlOp*.43).toFixed(3);
    network.style.opacity=fade(t,1.69,2.52,.23).toFixed(3);
    // Exactly the same photograph remains behind individual lifted pieces.
    // Each void/photographic cutout shares its source pixel coordinates.
    let intensity=0;
    pieces.forEach((o,k)=>{
      const start=5.10+(k%4)*.045+Math.floor(k/4)*.035;
      const u=clamp((t-start)/1.52),q=smooth(u);
      if(u<=0){o.hole.style.opacity='0';o.sheet.style.opacity='0';return;}
      o.hole.style.opacity=smooth(u/.28).toFixed(3);
      const paperOp=(smooth(u/.14))*(1-smooth((u-.75)/.22));
      o.sheet.style.opacity=paperOp.toFixed(3);
      // Cubic bezier flight, restrained twists and perspective reduction into one monitor.
      const originX=o.cx,originY=o.cy,targetX=435+(k%3-1)*10,targetY=791+(k%4-1.5)*6;
      const bendX=originX+(targetX-originX)*.55+((k%2)?-55:45);
      const bendY=Math.min(originY,targetY)-112-(k%4)*20;
      const x=(1-q)**2*originX+2*(1-q)*q*bendX+q*q*targetX;
      const y=(1-q)**2*originY+2*(1-q)*q*bendY+q*q*targetY;
      const tx=(x-originX)*art.clientWidth/941,ty=(y-originY)*art.clientHeight/1672;
      const tiny=lerp(1,.08,q),roll=(k%2?-1:1)*18*Math.sin(Math.PI*q),pitch=(k%2?1:-1)*12*Math.sin(Math.PI*q);
      o.sheet.style.transform=`translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) rotate(${roll.toFixed(1)}deg) rotateY(${pitch.toFixed(1)}deg) scale(${tiny.toFixed(3)})`;
      intensity=Math.max(intensity,paperOp);
    });
    glow.style.opacity=(intensity*.24*(1-smooth((t-6.6)/.35))).toFixed(3);
    const current=Math.min(8,Math.floor(t+.18));
    if(current!==lastNum){
      lastNum=current;number.textContent=String(current+1).padStart(2,'0');
      navBtns.forEach((btn,k)=>{btn.classList.toggle('active',k===current);if(k===current)btn.setAttribute('aria-current','step');else btn.removeAttribute('aria-current');});
    }
    hint.style.opacity=(1-smooth((t-.05)/.8)).toFixed(3);
    progress.style.width=(t/8*100).toFixed(3)+'%';
  }
  function update(){
    const span=Math.max(1,film.offsetHeight-stage.clientHeight);
    const target=clamp(-film.getBoundingClientRect().top/span)*8;
    displayed=!played?target:reduced?target:lerp(displayed,target,.23);played=true;
    if(Math.abs(target-displayed)<.0003)displayed=target;
    transformStage(displayed);
    frameToken=requestAnimationFrame(update);
  }
  frameToken=requestAnimationFrame(update);
  addEventListener('pagehide',()=>cancelAnimationFrame(frameToken));
  const url=new URL(location.href),at=Number(url.searchParams.get('scene'));
  if(Number.isInteger(at)&&at>=1&&at<=9){addEventListener('load',()=>scrollToScene(at-1,'instant'),{once:true});}
  $$('[data-wa]').forEach(a=>{
    const ctl=a.dataset.wa==='controle'||a.dataset.wa==='final';
    const msg=ctl?'Olá! Conheci o Controle+ no site da Richard TI e gostaria de saber mais.':'Olá! Vi o site da Richard TI e gostaria de conversar sobre tecnologia para o meu comércio.';
    a.href='https://wa.me/5562999407334?text='+encodeURIComponent(msg);
    a.addEventListener('click',()=>{try{if(window.gtag)window.gtag('event','generate_lead',{event_category:'contact',lead_source:a.dataset.wa});if(window.fbq)window.fbq('track','Lead',{content_name:a.dataset.wa});}catch(e){}});
  });
})();
