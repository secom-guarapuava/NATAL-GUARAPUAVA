/* Natal em Guarapuava 2026 — a magia
   Céu com estrelas e pó de estrela, acendimento da árvore, rastro da varinha,
   cordão de luzes, postais que chegam voando, selo que carimba, vaga-lumes e neve.
   Tudo é desligado para quem pediu menos movimento no sistema. */
(function () {
  "use strict";

  var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var html = document.documentElement;
  if (!reduz) html.classList.add("magia");

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var finoPonteiro = window.matchMedia && matchMedia("(pointer: fine)").matches;
  var r = function (a, b) { return a + Math.random() * (b - a); };
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- sprites pré-desenhados (brilho e estrela de 4 pontas) ---------- */
  function sprite(tam, desenha) {
    var c = document.createElement("canvas"); c.width = c.height = tam;
    desenha(c.getContext("2d"), tam); return c;
  }
  function brilho(cor) {
    return sprite(64, function (g, t) {
      var gr = g.createRadialGradient(t / 2, t / 2, 0, t / 2, t / 2, t / 2);
      gr.addColorStop(0, "rgba(255,255,255,1)");
      gr.addColorStop(0.18, cor);
      gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr; g.fillRect(0, 0, t, t);
    });
  }
  function estrela4(cor) {
    return sprite(64, function (g, t) {
      var m = t / 2;
      var gr = g.createRadialGradient(m, m, 0, m, m, m);
      gr.addColorStop(0, "rgba(255,255,255,.9)"); gr.addColorStop(0.3, cor); gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr; g.fillRect(0, 0, t, t);
      g.fillStyle = "rgba(255,252,240,1)";
      g.beginPath();
      g.moveTo(m, 2); g.quadraticCurveTo(m + 3, m - 3, t - 2, m); g.quadraticCurveTo(m + 3, m + 3, m, t - 2);
      g.quadraticCurveTo(m - 3, m + 3, 2, m); g.quadraticCurveTo(m - 3, m - 3, m, 2); g.fill();
    });
  }
  var SPR = {
    ouro: brilho("rgba(255,205,110,.85)"),
    ouroClaro: brilho("rgba(255,236,190,.9)"),
    cobre: brilho("rgba(214,120,60,.85)"),
    branco: brilho("rgba(235,240,255,.85)"),
    estrela: estrela4("rgba(255,214,130,.65)"),
    estrelaBranca: estrela4("rgba(220,230,255,.55)"),
    floco: sprite(64, function (g, t) {
      var m = t / 2, gr = g.createRadialGradient(m, m, 0, m, m, m);
      gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.32, "rgba(255,255,255,.95)");
      gr.addColorStop(0.5, "rgba(160,175,220,.4)"); gr.addColorStop(1, "rgba(160,175,220,0)");
      g.fillStyle = gr; g.fillRect(0, 0, t, t);
    })
  };

  /* ========================================================================
     VARINHA — rastro de brilho do cursor/dedo e explosões de faíscas
     ======================================================================== */
  var cvV = $("#varinha"), gV = cvV && cvV.getContext("2d");
  var parts = [], rodandoV = false, wV = 0, hV = 0;
  function tamV() { if (!cvV) return; wV = innerWidth; hV = innerHeight; cvV.width = wV * DPR; cvV.height = hV * DPR; gV.setTransform(DPR, 0, 0, DPR, 0, 0); }
  function solta(x, y, o) {
    if (reduz || !gV) return;
    o = o || {};
    if (parts.length > 260) parts.splice(0, parts.length - 260);
    var a = o.ang != null ? o.ang : r(0, Math.PI * 2), v = o.vel != null ? o.vel : r(0.2, 1.2);
    parts.push({
      x: x, y: y, vx: Math.cos(a) * v + (o.vx || 0), vy: Math.sin(a) * v + (o.vy || 0),
      g: o.g != null ? o.g : 0.012, vida: 0, max: o.max || r(40, 80), t: o.t || r(5, 12),
      spr: o.spr || (Math.random() < 0.35 ? SPR.estrela : SPR.ouro), rot: r(0, 6.28), vr: r(-0.08, 0.08)
    });
    if (!rodandoV) { rodandoV = true; requestAnimationFrame(passoV); }
  }
  function passoV() {
    gV.clearRect(0, 0, wV, hV);
    gV.globalCompositeOperation = "lighter";
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.vida++; p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.985; p.vy *= 0.985; p.rot += p.vr;
      var k = p.vida / p.max;
      if (k >= 1) { parts.splice(i, 1); continue; }
      var al = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
      var tam = p.t * (1 - k * 0.5) * (0.85 + 0.3 * Math.sin(p.vida * 0.5));
      gV.globalAlpha = Math.max(0, al);
      if (p.spr === SPR.estrela || p.spr === SPR.estrelaBranca) {
        gV.save(); gV.translate(p.x, p.y); gV.rotate(p.rot); gV.drawImage(p.spr, -tam, -tam, tam * 2, tam * 2); gV.restore();
      } else gV.drawImage(p.spr, p.x - tam, p.y - tam, tam * 2, tam * 2);
    }
    gV.globalAlpha = 1; gV.globalCompositeOperation = "source-over";
    if (parts.length) requestAnimationFrame(passoV); else { rodandoV = false; gV.clearRect(0, 0, wV, hV); }
  }
  function burst(x, y, n, o) {
    o = o || {};
    for (var i = 0; i < n; i++) {
      solta(x, y, {
        ang: r(0, Math.PI * 2), vel: r(o.vmin || 1, o.vmax || 4.2), g: o.g != null ? o.g : 0.05, max: r(45, 95),
        t: r(o.tmin || 5, o.tmax || 14), spr: o.spr || (Math.random() < 0.45 ? SPR.estrela : (Math.random() < 0.5 ? SPR.ouro : SPR.ouroClaro))
      });
    }
  }
  function centro(el) { var b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; }
  window.magia = {
    burst: burst,
    burstEm: function (el, n) { var c = centro(el); burst(c.x, c.y, n || 24, { vmax: 5 }); },
    faisca: function (el) { var b = el.getBoundingClientRect(); burst(b.left + b.width / 2, b.top + 4, 12, { vmin: 0.6, vmax: 2.6, tmax: 10, g: 0.03 }); }
  };
  if (cvV && !reduz) {
    tamV();
    var ultimo = null;
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType === "mouse" || e.pressure > 0 || e.pointerType === "pen") {
        if (ultimo) {
          var dx = e.clientX - ultimo.x, dy = e.clientY - ultimo.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 5) return;
          var n = Math.min(3, Math.ceil(d / 14));
          for (var i = 0; i < n; i++) {
            var k = i / n;
            solta(ultimo.x + dx * k + r(-3, 3), ultimo.y + dy * k + r(-3, 3), {
              vel: r(0.1, 0.7), vx: -dx * 0.02, vy: -dy * 0.02 + 0.2, g: 0.02, max: r(30, 60), t: r(4, 10)
            });
          }
        }
        ultimo = { x: e.clientX, y: e.clientY };
      }
    }, { passive: true });
    window.addEventListener("pointerdown", function (e) {
      ultimo = { x: e.clientX, y: e.clientY };
      if (e.pointerType !== "mouse") burst(e.clientX, e.clientY, 8, { vmin: 0.4, vmax: 2, tmax: 9, g: 0.02 });
    }, { passive: true });
    window.addEventListener("pointerleave", function () { ultimo = null; });
  }

  /* ========================================================================
     CÉU — estrelas piscando, pó de estrela subindo e estrela cadente
     ======================================================================== */
  var hero = $("#inicio"), cvC = $("#ceu"), gC = cvC && cvC.getContext("2d");
  var estrelas = [], po = [], cadente = null, proxCadente = 0, wC = 0, hC = 0, ceuVisivel = true, rodandoC = false;
  function tamC() {
    if (!cvC) return;
    wC = hero.clientWidth; hC = hero.clientHeight;
    cvC.width = wC * DPR; cvC.height = hC * DPR; gC.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = Math.round(wC * hC / 6500);
    estrelas = [];
    for (var i = 0; i < n; i++) {
      var y = Math.pow(Math.random(), 1.5) * hC * 0.78;
      estrelas.push({ x: r(0, wC), y: y, t: r(0.5, 1.6) * (1 - y / hC * 0.6), f: r(0.6, 2.4), fase: r(0, 6.28), b: Math.random() < 0.08 });
    }
    var m = wC < 700 ? 22 : 46;
    po = []; for (var j = 0; j < m; j++) po.push(novoPo(true));
  }
  function novoPo(espalhar) {
    return { x: r(0, wC), y: espalhar ? r(hC * 0.2, hC) : hC + r(0, 40), vy: r(0.18, 0.55), sw: r(0.4, 1.4), fase: r(0, 6.28), t: r(1.5, 4.2), a: r(0.35, 0.9) };
  }
  function desenhaCeu(tempo) {
    gC.clearRect(0, 0, wC, hC);
    var s = tempo / 1000;
    gC.globalCompositeOperation = "lighter";
    for (var i = 0; i < estrelas.length; i++) {
      var e = estrelas[i];
      var a = reduz ? 0.7 : 0.45 + 0.55 * Math.sin(s * e.f + e.fase);
      if (a <= 0.02) continue;
      gC.globalAlpha = a;
      var t = e.t * (e.b ? 5 : 3.2);
      gC.drawImage(e.b ? SPR.estrelaBranca : SPR.branco, e.x - t, e.y - t, t * 2, t * 2);
    }
    if (!reduz) {
      for (var j = 0; j < po.length; j++) {
        var p = po[j];
        p.y -= p.vy; p.x += Math.sin(s * p.sw + p.fase) * 0.3;
        if (p.y < hC * 0.12) po[j] = p = novoPo(false);
        var k = Math.min(1, (hC - p.y) / 120) * Math.min(1, (p.y - hC * 0.12) / 160);
        gC.globalAlpha = Math.max(0, p.a * k * (0.6 + 0.4 * Math.sin(s * 3 + p.fase)));
        gC.drawImage(SPR.ouro, p.x - p.t * 2.4, p.y - p.t * 2.4, p.t * 4.8, p.t * 4.8);
      }
      if (!cadente && s > proxCadente) {
        cadente = { x: r(wC * 0.05, wC * 0.6), y: r(10, hC * 0.3), vx: r(7, 11), vy: r(2.5, 4.5), vida: 0, max: r(38, 55) };
        proxCadente = s + r(5, 11);
      }
      if (cadente) {
        var c = cadente; c.vida++; c.x += c.vx; c.y += c.vy;
        var kk = c.vida / c.max, al = kk < 0.2 ? kk / 0.2 : 1 - (kk - 0.2) / 0.8;
        var gr = gC.createLinearGradient(c.x, c.y, c.x - c.vx * 12, c.y - c.vy * 12);
        gr.addColorStop(0, "rgba(255,246,220," + (0.95 * al) + ")"); gr.addColorStop(1, "rgba(255,246,220,0)");
        gC.globalAlpha = 1; gC.strokeStyle = gr; gC.lineWidth = 2; gC.lineCap = "round";
        gC.beginPath(); gC.moveTo(c.x, c.y); gC.lineTo(c.x - c.vx * 12, c.y - c.vy * 12); gC.stroke();
        gC.globalAlpha = al; gC.drawImage(SPR.estrelaBranca, c.x - 9, c.y - 9, 18, 18);
        if (kk >= 1) cadente = null;
      }
    }
    gC.globalAlpha = 1; gC.globalCompositeOperation = "source-over";
  }
  function loopCeu(t) {
    if (!ceuVisivel || document.hidden) { rodandoC = false; return; }
    desenhaCeu(t); requestAnimationFrame(loopCeu);
  }
  function ligaCeu() { if (!rodandoC && !reduz && cvC) { rodandoC = true; requestAnimationFrame(loopCeu); } }
  if (cvC) {
    tamC(); proxCadente = 2.5;
    if (reduz) desenhaCeu(0); else ligaCeu();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { ceuVisivel = en[0].isIntersecting; if (ceuVisivel) ligaCeu(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) { ligaCeu(); ligaVaga(); } });
  }

  /* ========================================================================
     ÁRVORE — acendimento de baixo para cima, estrela e piscadas
     ======================================================================== */
  var arv = $("#arvore"), card = $("#arvoreCard"), pisca = $("#pisca"), acende = $("#acende");
  var letras = [];
  if (acende) {
    var txt = acende.textContent; acende.textContent = "";
    acende.setAttribute("aria-label", txt);
    for (var i = 0; i < txt.length; i++) {
      var sp = document.createElement("span"); sp.className = "l"; sp.setAttribute("aria-hidden", "true"); sp.textContent = txt[i];
      acende.appendChild(sp); letras.push(sp);
    }
    if (!reduz) acende.classList.add("preparada");
  }
  if (pisca) {
    // pontos dentro do cone da árvore (coordenadas relativas ao postal)
    var A = [0.571, 0.2], B = [0.235, 0.92], Cc = [0.785, 0.92];
    var frag = document.createDocumentFragment();
    for (var k = 0; k < 30; k++) {
      var u = Math.random(), v = Math.random(); if (u + v > 1) { u = 1 - u; v = 1 - v; }
      var x = A[0] + u * (B[0] - A[0]) + v * (Cc[0] - A[0]), y = A[1] + u * (B[1] - A[1]) + v * (Cc[1] - A[1]);
      var el = document.createElement("i");
      el.style.left = (x * 100).toFixed(2) + "%"; el.style.top = (y * 100).toFixed(2) + "%";
      el.style.setProperty("--t", r(9, 22).toFixed(0) + "px");
      el.style.setProperty("--d", r(2.6, 5.4).toFixed(2) + "s");
      el.style.setProperty("--dl", r(0, 5).toFixed(2) + "s");
      frag.appendChild(el);
    }
    pisca.appendChild(frag);
  }
  function estrelaBurst(n) {
    var e = arv && arv.querySelector(".a-estrela"); if (!e) return;
    var b = e.getBoundingClientRect();
    burst(b.left + b.width / 2, b.top + b.height / 2, n || 70, { vmin: 1.2, vmax: 6, tmax: 15, g: 0.035 });
  }
  function acendeArvore() {
    if (!arv) return;
    if (reduz) {
      arv.classList.add("acesa", "estrela", "viva"); letras.forEach(function (l) { l.classList.add("on"); });
      return;
    }
    arv.classList.add("acesa");
    // as letras de "acende" se acendem junto com a subida das luzes
    letras.forEach(function (l, i) { setTimeout(function () { l.classList.add("on"); }, 1300 + i * 260); });
    setTimeout(function () { arv.classList.add("estrela", "viva"); estrelaBurst(80); }, 3700);
  }
  if (arv) {
    var imgs = Array.prototype.slice.call(arv.querySelectorAll("img"));
    var prontas = imgs.map(function (im) {
      if (im.decode) return im.decode().catch(function () {});
      return new Promise(function (ok) { if (im.complete) ok(); else { im.onload = im.onerror = ok; } });
    });
    var limite = new Promise(function (ok) { setTimeout(ok, 3500); });
    Promise.race([Promise.all(prontas), limite]).then(function () { setTimeout(acendeArvore, reduz ? 0 : 450); });

    if (card) {
      card.addEventListener("click", function (e) {
        if (reduz) return;
        burst(e.clientX, e.clientY, 22, { vmax: 4 });
        arv.classList.remove("estrela"); void arv.offsetWidth; arv.classList.add("estrela");
        estrelaBurst(50);
      });
      if (finoPonteiro && !reduz) {
        hero.addEventListener("pointermove", function (e) {
          var b = card.getBoundingClientRect();
          var dx = (e.clientX - (b.left + b.width / 2)) / innerWidth, dy = (e.clientY - (b.top + b.height / 2)) / innerHeight;
          card.style.setProperty("--ry", (dx * 14).toFixed(2) + "deg");
          card.style.setProperty("--rx", (-dy * 10).toFixed(2) + "deg");
        });
        hero.addEventListener("pointerleave", function () { card.style.setProperty("--ry", "0deg"); card.style.setProperty("--rx", "0deg"); });
      }
    }
  }

  /* ---------- contagem: o número sobe até o total de noites ---------- */
  var conta = $("[data-conta]");
  if (conta && !reduz) {
    var alvo = +conta.getAttribute("data-conta"); conta.textContent = "0";
    setTimeout(function () {
      var t0 = performance.now(), dur = 1700;
      (function passo(t) {
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        conta.textContent = Math.round(alvo * e);
        if (k < 1) requestAnimationFrame(passo);
      })(t0);
    }, 1400);
  }

  /* ========================================================================
     CORDÃO DE LUZES — acende lâmpada por lâmpada quando a programação aparece
     ======================================================================== */
  var cordao = $("#cordao"), fio = $("#fio"), lamps = [];
  if (cordao && fio && fio.getTotalLength) {
    var CORES = ["#FFD27A", "#FF5A4E", "#62D47F", "#FFF1C9", "#FFB347"];
    var L = fio.getTotalLength(), qtd = Math.round(Math.max(18, Math.min(42, innerWidth / 36)));
    for (var q = 0; q < qtd; q++) {
      var s = (q + 0.5) / qtd * L, pt = fio.getPointAtLength(s);
      if (pt.x < 0 || pt.x > 1440) continue;
      var lp = document.createElement("i"); lp.className = "lampada";
      lp.style.left = (pt.x / 1440 * 100).toFixed(3) + "%"; lp.style.top = (pt.y / 110 * 100).toFixed(3) + "%";
      lp.style.setProperty("--c", CORES[q % CORES.length]);
      lp._s = s; cordao.appendChild(lp); lamps.push(lp);
    }
    var giraLamps = function () {
      var w = cordao.clientWidth, h = cordao.clientHeight;
      lamps.forEach(function (lp) {
        var a = fio.getPointAtLength(Math.max(0, lp._s - 4)), b = fio.getPointAtLength(Math.min(L, lp._s + 4));
        var ang = Math.atan2((b.y - a.y) * h / 110, (b.x - a.x) * w / 1440) * 180 / Math.PI;
        lp.style.setProperty("--a", (ang * 0.5).toFixed(1) + "deg");
      });
    };
    giraLamps();
    var acendeCordao = function () {
      lamps.forEach(function (lp, i) {
        setTimeout(function () {
          lp.classList.add("on");
          if (Math.random() < 0.35) { lp.classList.add("pisca"); lp.style.setProperty("--d", r(1.6, 3.6).toFixed(2) + "s"); }
        }, reduz ? 0 : 200 + i * 70);
      });
    };
    if (reduz || !("IntersectionObserver" in window)) acendeCordao();
    else {
      var ioC = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { acendeCordao(); ioC.disconnect(); }
      }, { threshold: 0.05, rootMargin: "0px 0px -20% 0px" });
      ioC.observe(cordao);
    }
  }

  /* ========================================================================
     POSTAIS chegando e SELO carimbando
     ======================================================================== */
  function quandoVisivel(el, fn, opc) {
    if (!el) return;
    if (reduz || !("IntersectionObserver" in window)) { fn(); return; }
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { io.disconnect(); fn(); }
    }, opc || { threshold: 0.2 });
    io.observe(el);
  }
  var postais = $("#postais");
  quandoVisivel(postais, function () {
    if (!postais) return;
    postais.classList.add("chegou");
    if (reduz) return;
    Array.prototype.forEach.call(postais.querySelectorAll(".postal"), function (p, i) {
      setTimeout(function () {
        var b = p.getBoundingClientRect();
        if (b.top < innerHeight && b.bottom > 0) burst(b.left + b.width / 2, b.bottom - 10, 16, { vmin: 0.6, vmax: 3, g: 0.02, tmax: 10 });
      }, 750 + i * 160);
    });
  }, { threshold: 0.12 });

  /* ---------- CORAL DOS ANJOS: o postal acende e as asas piscam ---------- */
  var coral = $("#coral"), coralPisca = $("#coralPisca"), coralCard = $("#coralCard");
  var CORAL_LEDS = [[208,790],[502,904],[1298,772],[342,644],[921,888],[73,916],[406,681],[1079,636],[754,683],[689,797],[950,906],[62,900],[676,852],[1320,856],[761,624],[1350,882],[180,659],[1392,635],[709,850],[206,905],[1202,638],[637,893],[1067,629],[548,681],[962,625],[852,891],[825,649],[846,683],[236,667],[219,642],[1363,667],[1040,653],[1043,668],[268,802],[456,771],[1282,635],[1319,837],[1255,659],[1294,642],[679,888],[280,856],[305,642],[520,906],[734,904]];
  var CORAL_CHAMAS = [[155,871],[370,863],[585,859],[800,857],[1015,859],[1230,863],[1445,871]];
  if (coralPisca) {
    var ns = "http://www.w3.org/2000/svg", partesSvg = '<defs><radialGradient id="cgTw"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".35" stop-color="#FFE9B0"/><stop offset="1" stop-color="#FFC060" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cgFl"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".4" stop-color="#FFC86A" stop-opacity=".8"/><stop offset="1" stop-color="#FF9A2E" stop-opacity="0"/></radialGradient></defs>';
    CORAL_LEDS.forEach(function (pt) {
      var d = r(2.2, 4.6).toFixed(2), dl = r(0, 5).toFixed(2), s = r(9, 15);
      partesSvg += '<g class="tw" style="--d:' + d + 's;--dl:' + dl + 's"><circle cx="' + pt[0] + '" cy="' + pt[1] + '" r="' + (s * 1.3).toFixed(1) + '" fill="url(#cgTw)"/>' +
        '<path d="M' + pt[0] + ' ' + (pt[1] - s) + 'Q' + (pt[0] + 1.5) + ' ' + (pt[1] - 1.5) + ' ' + (pt[0] + s) + ' ' + pt[1] + 'Q' + (pt[0] + 1.5) + ' ' + (pt[1] + 1.5) + ' ' + pt[0] + ' ' + (pt[1] + s) +
        'Q' + (pt[0] - 1.5) + ' ' + (pt[1] + 1.5) + ' ' + (pt[0] - s) + ' ' + pt[1] + 'Q' + (pt[0] - 1.5) + ' ' + (pt[1] - 1.5) + ' ' + pt[0] + ' ' + (pt[1] - s) + 'Z" fill="#FFFDF2"/></g>';
    });
    CORAL_CHAMAS.forEach(function (pt) {
      partesSvg += '<ellipse class="fl" style="--d:' + r(0.8, 1.5).toFixed(2) + 's;--dl:' + r(0, 1).toFixed(2) + 's" cx="' + pt[0] + '" cy="' + (pt[1] - 6) + '" rx="26" ry="38" fill="url(#cgFl)"/>';
    });
    coralPisca.innerHTML = partesSvg;
  }
  function brilhoCoral(n) {
    if (!coralCard) return;
    var b = coralCard.getBoundingClientRect();
    for (var i = 0; i < 6; i++) {
      var pt = CORAL_LEDS[Math.floor(Math.random() * CORAL_LEDS.length)];
      burst(b.left + pt[0] / 1600 * b.width, b.top + pt[1] / 1108 * b.height, Math.round((n || 40) / 6), { vmin: 0.6, vmax: 3, g: 0.03, tmax: 10 });
    }
  }
  if (coral) {
    quandoVisivel(coral, function () {
      if (reduz) { coral.classList.add("chegou", "acesa", "viva"); return; }
      coral.classList.add("chegou");
      setTimeout(function () { coral.classList.add("acesa"); }, 700);
      setTimeout(function () { coral.classList.add("viva"); brilhoCoral(48); }, 3600);
    }, { threshold: 0.3 });
    if (coralCard && !reduz) coralCard.addEventListener("click", function (e) {
      burst(e.clientX, e.clientY, 18, { vmax: 4 });
      brilhoCoral(36);
    });
  }

  var carta = $("#carta");
  quandoVisivel(carta, function () {
    carta.classList.add("carimbou");
    if (reduz) return;
    setTimeout(function () {
      var s = carta.querySelector(".carimbo-selo"); if (!s) return;
      var c = centro(s);
      burst(c.x, c.y, 26, { vmin: 1, vmax: 4, g: 0.04, spr: SPR.cobre, tmax: 9 });
    }, 420);
  }, { threshold: 0.45 });

  /* ========================================================================
     VAGA-LUMES na seção dos lugares
     ======================================================================== */
  var lug = $("#lugares"), cvL = $("#vagalumes"), gL = cvL && cvL.getContext("2d");
  var vaga = [], wL = 0, hL = 0, vagaVisivel = false, rodandoL = false;
  function tamL() {
    if (!cvL) return;
    wL = lug.clientWidth; hL = lug.clientHeight;
    cvL.width = wL * DPR; cvL.height = hL * DPR; gL.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = wL < 700 ? 18 : 34; vaga = [];
    for (var i = 0; i < n; i++) vaga.push({ x: r(0, wL), y: r(0, hL), a: r(0, 6.28), v: r(0.15, 0.5), f: r(0.6, 1.6), fase: r(0, 6.28), t: r(2, 4.5) });
  }
  function loopVaga(t) {
    if (!vagaVisivel || document.hidden) { rodandoL = false; return; }
    var s = t / 1000; gL.clearRect(0, 0, wL, hL); gL.globalCompositeOperation = "lighter";
    for (var i = 0; i < vaga.length; i++) {
      var f = vaga[i];
      f.a += r(-0.06, 0.06); f.x += Math.cos(f.a) * f.v; f.y += Math.sin(f.a) * f.v * 0.7;
      if (f.x < -20) f.x = wL + 20; if (f.x > wL + 20) f.x = -20; if (f.y < -20) f.y = hL + 20; if (f.y > hL + 20) f.y = -20;
      var al = Math.max(0, Math.sin(s * f.f + f.fase)); al = al * al;
      gL.globalAlpha = al * 0.9; gL.drawImage(SPR.ouro, f.x - f.t * 3, f.y - f.t * 3, f.t * 6, f.t * 6);
    }
    gL.globalAlpha = 1; gL.globalCompositeOperation = "source-over";
    requestAnimationFrame(loopVaga);
  }
  function ligaVaga() { if (!rodandoL && vagaVisivel && !reduz && cvL) { rodandoL = true; requestAnimationFrame(loopVaga); } }
  if (cvL && !reduz && "IntersectionObserver" in window) {
    tamL();
    new IntersectionObserver(function (en) { vagaVisivel = en[0].isIntersecting; ligaVaga(); }).observe(lug);
  }

  /* ========================================================================
     NEVE — de mentirinha, porque em Guarapuava a gente sempre torce
     ======================================================================== */
  var btN = $("#btNeve"), cvN = $("#neve"), gN = cvN && cvN.getContext("2d");
  var flocos = [], nevando = false, rodandoN = false, wN = 0, hN = 0;
  function tamN() { if (!cvN) return; wN = innerWidth; hN = innerHeight; cvN.width = wN * DPR; cvN.height = hN * DPR; gN.setTransform(DPR, 0, 0, DPR, 0, 0); }
  function novoFloco(topo) {
    var t = Math.pow(Math.random(), 1.6) * 4 + 1.2;
    return { x: r(-20, wN + 20), y: topo ? r(-60, -5) : r(-hN * 0.9, hN * 0.15), t: t, vy: 0.55 + t * 0.42, sw: r(0.3, 1.1), fase: r(0, 6.28), a: r(0.6, 1) };
  }
  function loopNeve(tm) {
    var s = tm / 1000; gN.clearRect(0, 0, wN, hN);
    var alvo = nevando ? Math.round(Math.min(220, wN / 6)) : 0;
    if (flocos.length < alvo && Math.random() < 0.6) flocos.push(novoFloco(true));
    for (var i = flocos.length - 1; i >= 0; i--) {
      var f = flocos[i];
      f.y += f.vy; f.x += Math.sin(s * f.sw + f.fase) * 0.6 + 0.15;
      if (f.y > hN + 10) { if (flocos.length > alvo) { flocos.splice(i, 1); continue; } flocos[i] = novoFloco(true); continue; }
      gN.globalAlpha = f.a; gN.drawImage(SPR.floco, f.x - f.t * 2.6, f.y - f.t * 2.6, f.t * 5.2, f.t * 5.2);
    }
    gN.globalAlpha = 1;
    if (flocos.length || nevando) requestAnimationFrame(loopNeve); else { rodandoN = false; gN.clearRect(0, 0, wN, hN); }
  }
  if (btN && cvN && !reduz) {
    tamN();
    btN.addEventListener("click", function () {
      nevando = !nevando;
      btN.setAttribute("aria-pressed", String(nevando));
      btN.querySelector("span").textContent = nevando ? "Parar a neve" : "Fazer nevar";
      if (nevando) {
        window.magia.burstEm(btN, 18);
        var alvoIni = Math.round(Math.min(220, wN / 6) * 0.6);
        while (flocos.length < alvoIni) flocos.push(novoFloco(false));
        if (!rodandoN) { rodandoN = true; requestAnimationFrame(loopNeve); }
      }
    });
  }

  /* ---------- redimensionamento ---------- */
  var tmr;
  window.addEventListener("resize", function () {
    clearTimeout(tmr);
    tmr = setTimeout(function () {
      tamV(); tamN();
      if (cvC) { tamC(); if (reduz) desenhaCeu(0); }
      if (cvL && !reduz) tamL();
      if (lamps.length && typeof giraLamps === "function") giraLamps();
    }, 150);
  });
})();
