/*
 * Richard.TI — Motion Blueprint
 * Objetivo: uma única timeline GSAP/ScrollTrigger, normalizada em 0..100.
 * Este arquivo é um blueprint de implementação: seletores e helpers devem
 * ser adaptados ao DOM final, mas a ordem narrativa não deve ser reinterpretada.
 */

(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => gsap.utils.toArray(s);

  const stage = $('#stage');
  const film = $('#film');
  const camera = $('#camera');
  const caption = $('#caption');

  const state = { caption: '' };

  function captionTo(tl, text, at, dark = false) {
    tl.to(caption, {
      autoAlpha: 0,
      y: -10,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power2.in',
      onComplete: () => {
        caption.textContent = text;
        caption.classList.toggle('is-dark', dark);
      }
    }, at)
    .to(caption, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.6,
      ease: 'power2.out'
    }, at + 1.2);
  }

  function followPath(pathEl, target, tl, from, to, at, duration) {
    const length = pathEl.getTotalLength();
    const progress = { value: from };
    tl.to(progress, {
      value: to,
      duration,
      ease: 'none',
      onUpdate: () => {
        const p = pathEl.getPointAtLength(length * progress.value);
        gsap.set(target, { x: p.x, y: p.y });
      }
    }, at);
  }

  const mm = gsap.matchMedia();

  mm.add({ desktop: '(min-width: 901px)', mobile: '(max-width: 900px)' }, (ctx) => {
    const mobile = ctx.conditions.mobile;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: film,
        start: 'top top',
        end: mobile ? '+=240%' : '+=285%',
        pin: stage,
        scrub: 0.15,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Timeline auditável: total 100.
    tl.addLabel('intro', 0)
      .addLabel('network', 8)
      .addLabel('failure', 18)
      .addLabel('support', 28)
      .addLabel('processReveal', 40)
      .addLabel('convergence', 52)
      .addLabel('uiBuild', 64)
      .addLabel('product', 76)
      .addLabel('pullback', 88)
      .addLabel('finale', 96);

    // 0–8 | empresa funcionando
    caption.textContent = 'Tecnologia para sua empresa funcionar.';
    gsap.set(caption, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
    tl.fromTo('#office',
      { scale: mobile ? 0.96 : 0.92, autoAlpha: 0.75 },
      { scale: 1, autoAlpha: 1, duration: 8, ease: 'power1.out' },
      0
    );

    // 8–18 | câmera aproxima / fluxo verde
    captionTo(tl, 'Tudo conectado.', 8);
    tl.to(camera, {
      scale: mobile ? 1.10 : 1.22,
      xPercent: mobile ? 0 : -4,
      yPercent: mobile ? 4 : 2,
      duration: 10,
      ease: 'power2.inOut'
    }, 8)
      .fromTo('#networkFlow', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 9 }, 8.5);

    // O pacote deve seguir o mesmo path, não uma diagonal inventada.
    const networkPath = $('#networkPath');
    const packet = $('#networkPacket');
    if (networkPath && packet) followPath(networkPath, packet, tl, 0, 1, 8.5, 9);

    // 18–28 | falha e câmera segue o computador
    captionTo(tl, 'Até algo parar.', 18);
    tl.to(camera, {
      scale: mobile ? 1.28 : 1.58,
      xPercent: mobile ? -5 : -18,
      yPercent: mobile ? -8 : -12,
      duration: 10,
      ease: 'power2.inOut'
    }, 18)
      .to('#faultSegment', { stroke: '#d95d47', strokeDashoffset: 0.48, duration: 3 }, 19)
      .to('#networkPacket', { autoAlpha: 0, duration: 1 }, 20)
      .to('#computer', { scale: 1.04, duration: 2 }, 21)
      .to('#computerAlert', { autoAlpha: 1, scale: 1, duration: 2, ease: 'back.out(1.7)' }, 21.5);

    // 28–40 | diagnóstico percorre o path e restaura
    captionTo(tl, 'Suporte que resolve.', 28);
    const diagnosticPath = $('#diagnosticPath');
    const diagnosticSignal = $('#diagnosticSignal');
    if (diagnosticPath && diagnosticSignal) followPath(diagnosticPath, diagnosticSignal, tl, 0, 1, 28.5, 8);
    tl.to('#diagnosticSignal', { autoAlpha: 1, duration: 1 }, 28)
      .to('#computerAlert', { autoAlpha: 0, scale: 0.5, duration: 2 }, 35)
      .to('#faultSegment', { stroke: '#73a600', strokeDashoffset: 0, duration: 2 }, 35)
      .to('#computer', { scale: 1, duration: 2 }, 35)
      .to('#diagnosticSignal', { autoAlpha: 0, duration: 1.5 }, 38);

    // 40–52 | câmera abre e revela os processos dispersos
    captionTo(tl, 'Mas nem todo gargalo é técnico.', 40);
    tl.to(camera, {
      scale: mobile ? 0.92 : 0.82,
      xPercent: 0,
      yPercent: 0,
      duration: 12,
      ease: 'power2.inOut'
    }, 40)
      .to('#processCloud', { autoAlpha: 1, duration: 3 }, 41)
      .fromTo('.process-fragment',
        { autoAlpha: 0, scale: 0.72 },
        { autoAlpha: 1, scale: 1, stagger: 1.1, duration: 2.5, ease: 'back.out(1.4)' },
        42
      );

    // 52–64 | fragmentos convergem para o mesmo centro
    captionTo(tl, 'Às vezes, o processo precisa mudar.', 52);
    tl.to('.process-fragment', {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.45,
      autoAlpha: 0.16,
      stagger: 0.35,
      duration: 8,
      ease: 'power3.inOut'
    }, 52)
      .to('#app', { autoAlpha: 1, scale: 1, duration: 7, ease: 'power3.out' }, 55)
      .to('.process-fragment', { autoAlpha: 0, duration: 2 }, 61);

    // 64–76 | interface se monta
    captionTo(tl, 'Foi assim que nasceu o Controle+.', 64);
    tl.to(camera, {
      scale: mobile ? 1.05 : 1.16,
      xPercent: 0,
      yPercent: mobile ? 2 : -2,
      duration: 12,
      ease: 'power2.inOut'
    }, 64)
      .fromTo('.ui-shell', { scale: 0.86, autoAlpha: 0.7 }, { scale: 1, autoAlpha: 1, duration: 4 }, 64)
      .fromTo('.ui-sidebar', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 3 }, 66)
      .fromTo('.ui-module', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.8, duration: 2.5 }, 67)
      .fromTo('.ui-metric', { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, stagger: 0.7, duration: 2.5 }, 69);

    // 72–82 | fundo escurece progressivamente, sem corte.
    tl.to('#stage', { backgroundColor: '#080d09', color: '#fff', duration: 10, ease: 'power1.inOut' }, 72)
      .to('#lightGrid', { autoAlpha: 0.18, duration: 8 }, 72)
      .to('#app', { scale: mobile ? 1.12 : 1.20, duration: 8, ease: 'power2.inOut' }, 72);

    // 76–88 | produto assume o viewport
    captionTo(tl, 'Uma solução real que virou produto.', 76, true);
    tl.to('#controlePlus', { autoAlpha: 1, duration: 3 }, 76)
      .to('#realProductScreen', {
        autoAlpha: 1,
        scale: 1,
        width: mobile ? 'calc(100vw - 24px)' : '86vw',
        height: mobile ? '58vh' : '78vh',
        duration: 10,
        ease: 'power3.inOut'
      }, 78)
      .to('#app', { autoAlpha: 0, duration: 4 }, 80);

    // 88–96 | câmera afasta; produto deixa de ser o mundo inteiro
    tl.to(camera, {
      scale: mobile ? 0.82 : 0.72,
      xPercent: 0,
      yPercent: 0,
      duration: 8,
      ease: 'power2.inOut'
    }, 88)
      .to('#capabilities', { autoAlpha: 1, duration: 4 }, 89)
      .to('#realProductScreen', { scale: 0.72, autoAlpha: 0.45, duration: 6 }, 89);

    // 96–100 | convergência para a marca + CTA
    tl.to('#capabilities .cap', {
      x: 0,
      y: 0,
      scale: 0.6,
      autoAlpha: 0,
      stagger: 0.3,
      duration: 3,
      ease: 'power3.in'
    }, 96)
      .to('#brandFinal', { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 3, ease: 'power3.out' }, 96.5)
      .to('#brandTagline', { autoAlpha: 1, y: 0, duration: 2 }, 97.2)
      .to('#brandCta', { autoAlpha: 1, y: 0, duration: 1.8 }, 98.2);

    return () => {};
  });
})();
