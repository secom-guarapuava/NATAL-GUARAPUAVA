/* Natal em Guarapuava 2026 — gerador de postal
   Tudo acontece no aparelho de quem usa: a foto e a mensagem não saem do navegador
   e não são guardadas. A foto fica só na memória da página e some ao recarregar. */
(function () {
  "use strict";

  var D = window.NATAL || {}, P = D.postal;
  var sec = document.getElementById("postal");
  if (!sec) return;
  var menu = document.getElementById("menuPostal");
  if (!P) { sec.hidden = true; if (menu) menu.hidden = true; return; }
  sec.hidden = false;

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var C = {
    vermelho: "#A3262A", vermelhoFundo: "#8E1F22", vinho: "#5A1013", verde: "#2F5D45", verdeEsc: "#1F3D2B",
    creme: "#F6EFD9", papel: "#F4EADC", ouro: "#C9A04E", ouroClaro: "#F2D58A", tinta: "#1F2350", tinta2: "#4A4C70", marrom: "#3A2418"
  };
  var F = { serifa: '"Young Serif", Georgia, serif', texto: '"Atkinson Hyperlegible", system-ui, sans-serif', mao: 'Kalam, "Segoe Print", cursive' };
  var MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  var MOLDURAS = [C.verde, C.vermelho, C.ouro];

  /* ---------- estado ---------- */
  var E = {
    formato: "story", frente: 0, selo: 0,
    para: "", msg: (P.frases || [])[0] || "", de: "",
    foto: null,            // canvas com a foto original (reduzida), só na memória
    zoom: 1, cx: 0.5, cy: 0.42, efeito: "aquarela",
    fotoPronta: null       // canvas 3x4 com o efeito aplicado
  };

  var tela = $("gerCanvas"), ctx = tela.getContext("2d");
  var frentes = P.frentes || [], selos = P.selos || [];
  var cache = {}, prontoAssets = false;

  /* ---------- carregamento ---------- */
  function carrega(src) {
    if (cache[src]) return cache[src];
    cache[src] = new Promise(function (ok) {
      var im = new Image();
      im.decoding = "async";
      im.onload = function () { ok(im); };
      im.onerror = function () { ok(null); };
      im.src = src;
    });
    return cache[src];
  }
  // SVG sem largura/altura não desenha em alguns navegadores: injeta o tamanho antes
  function carregaSvg(src) {
    if (cache[src]) return cache[src];
    var pr = (window.fetch ? fetch(src).then(function (r) { return r.text(); }).then(function (txt) {
      txt = txt.replace(/<svg\b([^>]*)>/, function (m, a) {
        return /\swidth=/.test(a) ? m : "<svg" + a + ' width="600" height="569">';
      });
      return URL.createObjectURL(new Blob([txt], { type: "image/svg+xml" }));
    }) : Promise.reject()).then(function (url) {
      return new Promise(function (ok) {
        var im = new Image();
        im.onload = function () { ok(im); };
        im.onerror = function () { ok(null); };
        im.src = url;
      });
    }).catch(function () {
      return new Promise(function (ok) { var im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { ok(null); }; im.src = src; });
    });
    cache[src] = pr;
    return pr;
  }
  var IMG = {};
  function urlSelo(i) { return "assets/img/selos-natal/" + selos[i] + ".svg"; }

  function preparaAssets() {
    if (prontoAssets) return Promise.resolve();
    var fontes = document.fonts && document.fonts.load ? Promise.all([
      document.fonts.load('40px "Young Serif"'),
      document.fonts.load('40px Kalam'),
      document.fonts.load('700 40px Kalam'),
      document.fonts.load('700 30px "Atkinson Hyperlegible"'),
      document.fonts.load('30px "Atkinson Hyperlegible"')
    ]).catch(function () {}) : Promise.resolve();
    return Promise.all([
      fontes,
      carrega("assets/img/papel.webp").then(function (i) { IMG.papel = i; }),
      carrega("assets/img/logo-natal.webp").then(function (i) { IMG.logoNatal = i; }),
      carrega("assets/img/logo-prefeitura.webp").then(function (i) { IMG.logoPref = i; }),
      carrega("assets/img/logo-prefeitura-branca.webp").then(function (i) { IMG.logoPrefBranca = i; }),
      carregaFrente(E.frente), carregaSelo(E.selo)
    ]).then(function () { prontoAssets = true; });
  }
  function carregaFrente(i) { return carrega(frentes[i].imagem).then(function (im) { IMG["f" + i] = im; }); }
  function carregaSelo(i) { return carregaSvg(urlSelo(i)).then(function (im) { IMG["s" + i] = im; }); }

  /* ---------- utilidades de desenho ---------- */
  function sorteio(semente) {
    var a = semente >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function retRed(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function cobre(c, im, x, y, w, h, fx, fy) {
    if (!im) { c.fillStyle = "#2a1414"; c.fillRect(x, y, w, h); return; }
    var iw = im.width || im.naturalWidth, ih = im.height || im.naturalHeight;
    var e = Math.max(w / iw, h / ih), sw = w / e, sh = h / e;
    var sx = (iw - sw) * (fx == null ? 0.5 : fx), sy = (ih - sh) * (fy == null ? 0.5 : fy);
    c.drawImage(im, sx, sy, sw, sh, x, y, w, h);
  }
  function contem(c, im, x, y, w, h) {
    if (!im) return;
    var iw = im.width || im.naturalWidth, ih = im.height || im.naturalHeight;
    var e = Math.min(w / iw, h / ih), dw = iw * e, dh = ih * e;
    c.drawImage(im, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  }
  function quebra(c, texto, larg) {
    var linhas = [];
    String(texto || "").split(/\n/).forEach(function (par) {
      var palavras = par.split(/\s+/).filter(Boolean), atual = "";
      palavras.forEach(function (p) {
        var t = atual ? atual + " " + p : p;
        if (c.measureText(t).width <= larg || !atual) atual = t;
        else { linhas.push(atual); atual = p; }
      });
      if (atual) linhas.push(atual);
    });
    return linhas;
  }
  // escolhe o maior tamanho de fonte que cabe no número de linhas
  function cabe(c, texto, larg, maxLinhas, tam, min, familia, peso) {
    for (var t = tam; t >= min; t -= 2) {
      c.font = (peso || "") + " " + t + "px " + familia;
      var l = quebra(c, texto, larg);
      if (l.length <= maxLinhas) return { linhas: l, tam: t };
    }
    c.font = (peso || "") + " " + min + "px " + familia;
    return { linhas: quebra(c, texto, larg).slice(0, maxLinhas), tam: min };
  }
  function papel(c, x, y, w, h) {
    c.fillStyle = C.creme; c.fillRect(x, y, w, h);
    if (IMG.papel) { c.save(); c.globalAlpha = 0.85; cobre(c, IMG.papel, x, y, w, h); c.restore(); }
    c.save(); c.globalAlpha = 0.22; c.fillStyle = "#FFFAF0"; c.fillRect(x, y, w, h); c.restore();
  }
  function sombra(c, blur, oy, cor) { c.shadowColor = cor || "rgba(30,8,8,.45)"; c.shadowBlur = blur; c.shadowOffsetX = 0; c.shadowOffsetY = oy; }
  function semSombra(c) { c.shadowColor = "transparent"; c.shadowBlur = 0; c.shadowOffsetY = 0; }

  function textoArco(c, txt, cx, cy, r, embaixo) {
    var larguras = [], total = 0;
    for (var i = 0; i < txt.length; i++) { var w = c.measureText(txt[i]).width; larguras.push(w); total += w; }
    var ang = total / r, acum = 0;
    c.textAlign = "center"; c.textBaseline = "middle";
    for (var k = 0; k < txt.length; k++) {
      var meio = (acum + larguras[k] / 2) / r; acum += larguras[k];
      var a = embaixo ? Math.PI / 2 + ang / 2 - meio : -Math.PI / 2 - ang / 2 + meio;
      c.save();
      c.translate(cx + r * Math.cos(a), cy + r * Math.sin(a));
      c.rotate(embaixo ? a - Math.PI / 2 : a + Math.PI / 2);
      c.fillText(txt[k], 0, 0);
      c.restore();
    }
  }
  function hojeCarimbo() { var d = new Date(); return d.getDate() + " " + MESES[d.getMonth()]; }

  function carimbo(c, cx, cy, r, cor, giro) {
    c.save();
    c.translate(cx, cy); c.rotate(giro || -0.2);
    c.globalAlpha = 0.78; c.strokeStyle = cor; c.fillStyle = cor;
    c.lineWidth = r * 0.05; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.stroke();
    c.lineWidth = r * 0.028; c.beginPath(); c.arc(0, 0, r * 0.58, 0, Math.PI * 2); c.stroke();
    c.font = "700 " + Math.round(r * 0.2) + "px " + F.texto;
    textoArco(c, "GUARAPUAVA", 0, 0, r * 0.78, false);
    c.font = "700 " + Math.round(r * 0.17) + "px " + F.texto;
    textoArco(c, "NATAL ✦ 2026", 0, 0, r * 0.79, true);
    c.textAlign = "center"; c.textBaseline = "middle";
    c.font = Math.round(r * 0.3) + "px " + F.serifa;
    c.fillText(hojeCarimbo(), 0, 0);
    // ondas do carimbo
    c.lineWidth = r * 0.045;
    for (var i = 0; i < 4; i++) {
      var y = -r * 0.45 + i * r * 0.3;
      c.beginPath();
      for (var x = r * 1.12; x <= r * 2.5; x += 2) {
        var yy = y + Math.sin((x - r) / (r * 0.22)) * r * 0.08;
        if (x === r * 1.12) c.moveTo(x, yy); else c.lineTo(x, yy);
      }
      c.stroke();
    }
    c.restore();
  }

  function selo(c, x, y, w, h, i, giro) {
    var o = document.createElement("canvas"); o.width = w; o.height = h;
    var s = o.getContext("2d");
    s.fillStyle = MOLDURAS[i % 3]; s.fillRect(0, 0, w, h);
    var passo = w / 11, furo = passo * 0.32;
    s.globalCompositeOperation = "destination-out";
    for (var px = passo / 2; px < w; px += passo) { s.beginPath(); s.arc(px, 0, furo, 0, 7); s.arc(px, h, furo, 0, 7); s.fill(); }
    for (var py = passo / 2; py < h; py += passo) { s.beginPath(); s.arc(0, py, furo, 0, 7); s.arc(w, py, furo, 0, 7); s.fill(); }
    s.globalCompositeOperation = "source-over";
    var m = w * 0.09;
    s.fillStyle = "#FBF5E6"; s.fillRect(m, m, w - 2 * m, h - m - h * 0.17);
    contem(s, IMG["s" + i], m + 4, m + 4, w - 2 * m - 8, h - m - h * 0.17 - 8);
    s.fillStyle = (i % 3 === 2) ? "#4A3010" : C.creme;
    s.font = "700 " + Math.round(w * 0.085) + "px " + F.texto;
    s.textAlign = "center"; s.textBaseline = "middle";
    s.fillText("NATAL 2026", w / 2, h - h * 0.085);
    c.save(); c.translate(x + w / 2, y + h / 2); c.rotate(giro || 0.04);
    sombra(c, 6, 3, "rgba(40,20,10,.3)");
    c.drawImage(o, -w / 2, -h / 2);
    c.restore();
  }

  function fita(c, x, y, w, h, giro) {
    c.save(); c.translate(x, y); c.rotate(giro);
    c.fillStyle = "rgba(246,239,217,.82)";
    sombra(c, 3, 1, "rgba(0,0,0,.18)");
    c.fillRect(-w / 2, -h / 2, w, h);
    semSombra(c);
    c.fillStyle = "rgba(255,255,255,.25)"; c.fillRect(-w / 2, -h / 2, w, h * 0.3);
    c.restore();
  }

  /* ---------- peças ---------- */
  function verso(c, w, h) {
    papel(c, 0, 0, w, h);
    var div = w * 0.575;
    // título miúdo
    c.fillStyle = C.tinta2; c.textAlign = "left"; c.textBaseline = "alphabetic";
    c.font = "700 " + Math.round(h * 0.034) + "px " + F.texto;
    if (c.letterSpacing !== undefined) c.letterSpacing = "4px";
    c.fillText("CARTÃO POSTAL", w * 0.055, h * 0.11);
    if (c.letterSpacing !== undefined) c.letterSpacing = "0px";
    // divisória
    c.strokeStyle = "rgba(31,35,80,.28)"; c.lineWidth = 2;
    c.beginPath(); c.moveTo(div, h * 0.09); c.lineTo(div, h * 0.91); c.stroke();
    // recado
    var x0 = w * 0.055, larg = div - x0 - w * 0.04, y = h * 0.2;
    c.fillStyle = C.tinta;
    var maxL = 6;
    var m = cabe(c, E.msg || "", larg, maxL, Math.round(h * 0.08), Math.round(h * 0.052), F.mao);
    var lh = m.tam * 1.28;
    m.linhas.forEach(function (l, i) { c.fillText(l, x0, y + m.tam + i * lh); });
    y += m.tam + (m.linhas.length - 1) * lh;
    if (E.de) {
      c.font = "700 " + Math.round(h * 0.066) + "px " + F.mao;
      c.textAlign = "right";
      c.fillText("— " + E.de, div - w * 0.04, Math.min(y + h * 0.13, h * 0.9));
      c.textAlign = "left";
    }
    // selo e carimbo
    var sw = w * 0.15, sh = sw * 1.2;
    selo(c, w - sw - w * 0.05, h * 0.07, sw, sh, E.selo, 0.05);
    carimbo(c, w - sw - w * 0.06, h * 0.07 + sh * 0.62, h * 0.12, C.vermelho, -0.22);
    // linhas do endereço
    c.strokeStyle = "rgba(31,35,80,.35)"; c.lineWidth = 2;
    var lx = div + w * 0.045, lw = w - lx - w * 0.05;
    [0.62, 0.74, 0.86].forEach(function (f) { c.beginPath(); c.moveTo(lx, h * f); c.lineTo(lx + lw, h * f); c.stroke(); });
    c.fillStyle = C.tinta2; c.font = Math.round(h * 0.046) + "px " + F.mao;
    c.fillText("Para:", lx, h * 0.62 - h * 0.075);
    if (E.para) { c.fillStyle = C.tinta; c.font = "700 " + Math.round(h * 0.062) + "px " + F.mao; c.fillText(E.para, lx + 4, h * 0.62 - h * 0.018); }
    c.fillStyle = C.tinta; c.font = Math.round(h * 0.05) + "px " + F.mao;
    c.fillText("Guarapuava – PR", lx + 4, h * 0.74 - h * 0.018);
  }

  function frente(c, w, h, comNome) {
    var b = Math.round(Math.min(w, h) * 0.03);
    c.fillStyle = "#FFFDF8"; c.fillRect(0, 0, w, h);
    cobre(c, IMG["f" + E.frente], b, b, w - 2 * b, h - 2 * b, 0.5, 0.5);
    if (comNome && frentes[E.frente]) {
      var nome = frentes[E.frente].nome;
      c.font = "700 " + Math.round(h * 0.04) + "px " + F.texto;
      var tw = c.measureText(nome).width, ph = h * 0.075, pw = tw + h * 0.08;
      c.save(); c.translate(b + h * 0.04, h - b - h * 0.04 - ph); c.rotate(-0.02);
      sombra(c, 8, 3, "rgba(0,0,0,.35)");
      c.fillStyle = C.creme; retRed(c, 0, 0, pw, ph, 6); c.fill(); semSombra(c);
      c.fillStyle = C.vermelho; c.textBaseline = "middle"; c.textAlign = "left";
      c.fillText(nome, h * 0.04, ph / 2 + 1);
      c.restore();
    }
  }

  function fotinho(c, cx, cy, w, giro) {
    if (!E.fotoPronta) return;
    var h = w * 4 / 3, b = w * 0.06, bb = w * 0.2;
    c.save(); c.translate(cx, cy); c.rotate(giro);
    sombra(c, 22, 10, "rgba(20,5,5,.5)");
    c.fillStyle = "#FFFDF8"; c.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + b + bb);
    semSombra(c);
    c.drawImage(E.fotoPronta, -w / 2, -h / 2, w, h);
    c.restore();
    fita(c, cx + Math.sin(giro) * h * 0.5, cy - Math.cos(giro) * (h / 2 + b) , w * 0.6, w * 0.13, giro - 0.08);
  }

  function peca(c, x, y, w, h, giro, desenha) {
    c.save(); c.translate(x, y); c.rotate(giro);
    sombra(c, 40, 18, "rgba(20,4,4,.55)");
    c.fillStyle = "#000"; c.fillRect(-w / 2, -h / 2, w, h);
    semSombra(c);
    c.translate(-w / 2, -h / 2);
    c.beginPath(); c.rect(0, 0, w, h); c.clip();
    desenha(c, w, h);
    c.restore();
  }

  function fundoNoite(c, W, H) {
    var g = c.createRadialGradient(W / 2, H * 0.12, 0, W / 2, H * 0.3, H * 0.9);
    g.addColorStop(0, "#9A2428"); g.addColorStop(0.55, "#6E1518"); g.addColorStop(1, "#4A0D10");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var r = sorteio(2026);
    for (var i = 0; i < 90; i++) {
      var x = r() * W, y = r() * H, s = r() * 2.4 + 0.6;
      c.globalAlpha = 0.25 + r() * 0.55; c.fillStyle = r() < 0.8 ? "#FFE3A1" : "#FFFFFF";
      c.beginPath(); c.arc(x, y, s, 0, 7); c.fill();
    }
    c.globalAlpha = 1;
    for (var k = 0; k < 9; k++) estrela(c, r() * W, r() * H, 8 + r() * 10, "rgba(255,227,161," + (0.5 + r() * 0.4) + ")");
  }
  function estrela(c, x, y, s, cor) {
    c.save(); c.translate(x, y); c.fillStyle = cor;
    c.beginPath(); c.moveTo(0, -s); c.quadraticCurveTo(0, 0, s, 0); c.quadraticCurveTo(0, 0, 0, s); c.quadraticCurveTo(0, 0, -s, 0); c.quadraticCurveTo(0, 0, 0, -s);
    c.fill(); c.restore();
  }

  // logo oficial em versão negativa (branca), direto no fundo escuro, com o @ embaixo
  function logoPrefNegativa(c, cx, y, w) {
    var im = IMG.logoPrefBranca, lh = im ? w * im.height / im.width : w * 0.2;
    if (im) c.drawImage(im, cx - w / 2, y, w, lh);
    c.fillStyle = C.creme; c.font = "700 " + Math.round(w * 0.075) + "px " + F.texto;
    c.textAlign = "center"; c.textBaseline = "alphabetic";
    c.fillText(P.instagram || "", cx, y + lh + w * 0.13);
  }

  // logo da campanha como adesivo: contorno creme recortado no formato das letras + brilho quente
  var adesivoCache = null;
  function logoAdesivo(c, cx, cy, w) {
    var im = IMG.logoNatal; if (!im) return;
    var h = w * im.height / im.width, borda = Math.round(w * 0.028), pad = borda * 3;
    if (!adesivoCache || adesivoCache.w !== w) {
      var o = document.createElement("canvas"); o.width = Math.ceil(w + pad * 2); o.height = Math.ceil(h + pad * 2);
      var a = o.getContext("2d");
      // silhueta engordada
      for (var k = 0; k < 32; k++) {
        var ang = k / 32 * Math.PI * 2;
        a.drawImage(im, pad + Math.cos(ang) * borda, pad + Math.sin(ang) * borda, w, h);
      }
      a.drawImage(im, pad, pad, w, h);
      a.globalCompositeOperation = "source-in";
      a.fillStyle = C.creme; a.fillRect(0, 0, o.width, o.height);
      a.globalCompositeOperation = "source-over";
      a.drawImage(im, pad, pad, w, h);
      adesivoCache = { w: w, canvas: o };
    }
    // brilho quente atrás
    var g = c.createRadialGradient(cx, cy, 0, cx, cy, w * 0.75);
    g.addColorStop(0, "rgba(255,214,140,.38)"); g.addColorStop(0.5, "rgba(255,190,110,.14)"); g.addColorStop(1, "rgba(255,190,110,0)");
    c.fillStyle = g; c.fillRect(cx - w, cy - w * 0.8, w * 2, w * 1.6);
    c.save();
    sombra(c, 22, 8, "rgba(20,4,4,.5)");
    c.drawImage(adesivoCache.canvas, cx - adesivoCache.canvas.width / 2, cy - adesivoCache.canvas.height / 2);
    c.restore();
  }

  /* ---------- formatos ---------- */
  function story(c) {
    var W = 1080, H = 1920;
    fundoNoite(c, W, H);
    logoAdesivo(c, W / 2, 238, 500);
    peca(c, W / 2, 690, 950, 560, -0.035, verso);
    peca(c, W / 2, 1238, 950, 600, 0.028, function (cc, w, h) { frente(cc, w, h, true); });
    fotinho(c, 846, 1290, 250, 0.09);
    // assinatura da Prefeitura
    c.fillStyle = C.ouroClaro; c.textAlign = "center"; c.textBaseline = "alphabetic";
    cabe(c, P.assinatura || "", W - 100, 1, 46, 30, F.mao, "700");
    c.fillText(P.assinatura || "", W / 2, 1626);
    c.fillStyle = C.creme; c.font = "700 30px " + F.texto;
    c.fillText(P.assinaturaLinha2 || "", W / 2, 1672);
    logoPrefNegativa(c, W / 2, 1712, 400);
  }

  function postal(c) {
    var W = 1800, H = 1200;
    // frente inteira, com borda branca
    frente(c, W, H, false);
    // nome do lugar no canto
    var nome = frentes[E.frente] ? frentes[E.frente].nome : "";
    c.font = "700 34px " + F.texto;
    var txt = "Lembrança de Guarapuava · " + nome, tw = c.measureText(txt).width;
    c.save(); c.translate(84, H - 150); c.rotate(-0.02);
    sombra(c, 10, 4, "rgba(0,0,0,.4)");
    c.fillStyle = C.creme; retRed(c, 0, 0, tw + 56, 64, 8); c.fill(); semSombra(c);
    c.fillStyle = C.vermelho; c.textBaseline = "middle"; c.fillText(txt, 28, 33);
    c.restore();
    // cartão do recado à direita
    var cw = 560, ch = 1060, cx = 1460, cy = 600;
    c.save(); c.translate(cx, cy); c.rotate(0.018);
    sombra(c, 34, 14, "rgba(20,4,4,.5)");
    c.fillStyle = "#000"; c.fillRect(-cw / 2, -ch / 2, cw, ch); semSombra(c);
    c.translate(-cw / 2, -ch / 2);
    papel(c, 0, 0, cw, ch);
    contem(c, IMG.logoNatal, 30, 30, 230, 115);
    var sw = 118, sh = sw * 1.2;
    selo(c, cw - sw - 30, 26, sw, sh, E.selo, 0.06);
    carimbo(c, cw - sw - 40, 26 + sh * 0.7, 62, C.vermelho, -0.25);
    var x0 = 40, larg = cw - 80, y = 230;
    c.textAlign = "left"; c.textBaseline = "alphabetic"; c.fillStyle = C.tinta;
    if (E.para) { c.font = "700 44px " + F.mao; c.fillText(E.para + ",", x0, y); y += 18; }
    var m = cabe(c, E.msg || "", larg, 7, 46, 32, F.mao);
    var lh = m.tam * 1.3;
    m.linhas.forEach(function (l, i) { c.fillText(l, x0, y + m.tam + 14 + i * lh); });
    y += m.tam + 14 + (m.linhas.length - 1) * lh;
    if (E.de) { c.font = "700 42px " + F.mao; c.textAlign = "right"; c.fillText("— " + E.de, cw - 40, y + 70); c.textAlign = "left"; }
    // assinatura e etiqueta
    c.strokeStyle = "rgba(31,35,80,.25)"; c.lineWidth = 2; c.setLineDash([8, 8]);
    c.beginPath(); c.moveTo(40, 760); c.lineTo(cw - 40, 760); c.stroke(); c.setLineDash([]);
    c.fillStyle = C.vermelho; c.textAlign = "center";
    var ta = cabe(c, P.assinatura || "", cw - 70, 1, 32, 20, F.mao, "700"); c.fillText(ta.linhas[0] || "", cw / 2, 808);
    c.fillStyle = C.tinta2; cabe(c, P.assinaturaLinha2 || "", cw - 70, 1, 22, 16, F.texto, "700"); c.fillText(P.assinaturaLinha2 || "", cw / 2, 842);
    contem(c, IMG.logoPref, 70, 872, cw - 140, (cw - 140) * 295 / 1400);
    c.fillStyle = C.vermelho; c.font = "700 30px " + F.texto; c.fillText(P.instagram || "", cw / 2, 1010);
    c.restore();
    fotinho(c, 1050, 470, 230, -0.09);
  }

  /* ---------- desenho com fila ---------- */
  var pend = false;
  function agenda() {
    if (pend) return; pend = true;
    requestAnimationFrame(function () { pend = false; desenha(); });
  }
  function desenha() {
    var W = E.formato === "postal" ? 1800 : 1080, H = E.formato === "postal" ? 1200 : 1920;
    if (tela.width !== W) { tela.width = W; tela.height = H; }
    tela.parentNode.className = "ger-tela " + (E.formato === "postal" ? "f-postal" : "f-story");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (E.formato === "postal") postal(ctx); else story(ctx);
  }

  /* ---------- foto: recorte e efeito (no aparelho) ---------- */
  var FW = 480, FH = 640;
  function recorteFonte() {
    var f = E.foto, sw = f.width, sh = f.height, bw, bh;
    if (sw / sh > 3 / 4) { bh = sh; bw = sh * 3 / 4; } else { bw = sw; bh = sw * 4 / 3; }
    var w = bw / E.zoom, h = bh / E.zoom;
    var x = E.cx * sw - w / 2, y = E.cy * sh - h / 2;
    x = Math.max(0, Math.min(sw - w, x)); y = Math.max(0, Math.min(sh - h, y));
    E.cx = (x + w / 2) / sw; E.cy = (y + h / 2) / sh;
    return { x: x, y: y, w: w, h: h };
  }
  function processaFoto() {
    if (!E.foto) { E.fotoPronta = null; return; }
    var r = recorteFonte();
    var o = E.fotoPronta && E.fotoPronta.width === FW ? E.fotoPronta : document.createElement("canvas");
    o.width = FW; o.height = FH;
    var c = o.getContext("2d", { willReadFrequently: true });
    c.drawImage(E.foto, r.x, r.y, r.w, r.h, 0, 0, FW, FH);
    if (E.efeito === "aquarela") aquarela(c);
    else if (E.efeito === "luzes") luzinhas(c);
    E.fotoPronta = o;
    var rc = $("gerRecorteCanvas"), rx = rc.getContext("2d");
    rx.clearRect(0, 0, rc.width, rc.height);
    rx.drawImage(o, 0, 0, rc.width, rc.height);
  }

  function aquarela(c) {
    // 1) cores suavizadas: reduz e amplia (desfoque barato)
    var p = document.createElement("canvas"); p.width = FW / 6; p.height = FH / 6;
    var pc = p.getContext("2d"); pc.imageSmoothingQuality = "high";
    pc.drawImage(c.canvas, 0, 0, p.width, p.height);
    var orig = c.getImageData(0, 0, FW, FH), od = orig.data;
    var m = document.createElement("canvas"); m.width = FW; m.height = FH;
    var mc = m.getContext("2d", { willReadFrequently: true }); mc.imageSmoothingQuality = "high";
    var q = document.createElement("canvas"); q.width = FW / 2; q.height = FH / 2;
    q.getContext("2d").drawImage(c.canvas, 0, 0, q.width, q.height);
    mc.drawImage(q, 0, 0, FW, FH);
    var suave = mc.getImageData(0, 0, FW, FH).data;
    mc.drawImage(p, 0, 0, FW, FH);
    var borrao = mc.getImageData(0, 0, FW, FH).data;
    // 2) luminância para as bordas (traço de tinta)
    var lum = new Float32Array(FW * FH);
    for (var i = 0, j = 0; i < suave.length; i += 4, j++) lum[j] = suave[i] * 0.299 + suave[i + 1] * 0.587 + suave[i + 2] * 0.114;
    var out = c.createImageData(FW, FH), d = out.data;
    for (var y = 0; y < FH; y++) {
      for (var x = 0; x < FW; x++) {
        var k = y * FW + x, n = k * 4;
        var gx = 0, gy = 0;
        if (x > 0 && y > 0 && x < FW - 1 && y < FH - 1) {
          gx = -lum[k - FW - 1] - 2 * lum[k - 1] - lum[k + FW - 1] + lum[k - FW + 1] + 2 * lum[k + 1] + lum[k + FW + 1];
          gy = -lum[k - FW - 1] - 2 * lum[k - FW] - lum[k - FW + 1] + lum[k + FW - 1] + 2 * lum[k + FW] + lum[k + FW + 1];
        }
        var borda = Math.min(1, Math.max(0, (Math.sqrt(gx * gx + gy * gy) - 60) / 160));
        // mistura detalhe + mancha de aquarela
        var r = suave[n] * 0.55 + borrao[n] * 0.45, g = suave[n + 1] * 0.55 + borrao[n + 1] * 0.45, b = suave[n + 2] * 0.55 + borrao[n + 2] * 0.45;
        // camadas de tinta (posterização suave)
        r = Math.round(r / 36) * 36 * 0.7 + r * 0.3; g = Math.round(g / 36) * 36 * 0.7 + g * 0.3; b = Math.round(b / 36) * 36 * 0.7 + b * 0.3;
        // clima quente do postal
        var r2 = r * 1.06 + 14, g2 = g * 0.99 + 6, b2 = b * 0.84 + 4;
        // clareia em direção ao papel creme
        r2 = r2 * 0.86 + 246 * 0.14; g2 = g2 * 0.86 + 239 * 0.14; b2 = b2 * 0.86 + 217 * 0.14;
        // traço
        r2 = r2 * (1 - borda * 0.75) + 58 * borda * 0.75; g2 = g2 * (1 - borda * 0.75) + 36 * borda * 0.75; b2 = b2 * (1 - borda * 0.75) + 24 * borda * 0.75;
        d[n] = r2; d[n + 1] = g2; d[n + 2] = b2; d[n + 3] = 255;
      }
    }
    c.putImageData(out, 0, 0);
    // textura do papel
    if (IMG.papel) { c.save(); c.globalCompositeOperation = "multiply"; c.globalAlpha = 0.55; cobre(c, IMG.papel, 0, 0, FW, FH); c.restore(); }
    // bordas que se desmancham como aquarela
    var v = c.createRadialGradient(FW / 2, FH / 2, FW * 0.42, FW / 2, FH / 2, FW * 0.85);
    v.addColorStop(0, "rgba(246,239,217,0)"); v.addColorStop(1, "rgba(246,239,217,.85)");
    c.fillStyle = v; c.fillRect(0, 0, FW, FH);
  }

  function luzinhas(c) {
    var im = c.getImageData(0, 0, FW, FH), d = im.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i], g = d[i + 1], b = d[i + 2];
      r = (r - 128) * 1.08 + 128; g = (g - 128) * 1.08 + 128; b = (b - 128) * 1.08 + 128;
      d[i] = r * 1.07 + 10; d[i + 1] = g * 0.98 + 2; d[i + 2] = b * 0.82;
    }
    c.putImageData(im, 0, 0);
    var v = c.createRadialGradient(FW / 2, FH * 0.55, FW * 0.3, FW / 2, FH / 2, FW * 0.95);
    v.addColorStop(0, "rgba(60,10,10,0)"); v.addColorStop(1, "rgba(60,10,10,.6)");
    c.fillStyle = v; c.fillRect(0, 0, FW, FH);
    var r0 = sorteio(15), cores = ["255,214,120", "255,190,90", "230,70,60", "120,200,120", "255,240,200"];
    c.save(); c.globalCompositeOperation = "lighter";
    for (var k = 0; k < 34; k++) {
      var x = r0() * FW, y = (r0() < 0.75 ? r0() * FH * 0.3 : FH - r0() * FH * 0.16), s = 8 + r0() * 26;
      var gg = c.createRadialGradient(x, y, 0, x, y, s);
      var cor = cores[Math.floor(r0() * cores.length)];
      gg.addColorStop(0, "rgba(" + cor + ",.55)"); gg.addColorStop(0.6, "rgba(" + cor + ",.25)"); gg.addColorStop(1, "rgba(" + cor + ",0)");
      c.fillStyle = gg; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill();
    }
    c.restore();
  }

  /* ---------- filtro de palavras ---------- */
  var BLOQ = ["porra", "caralho", "carai", "buceta", "boceta", "cu", "cuzao", "puta", "puto", "putaria", "merda", "foda", "foder", "fodase", "fdp", "pqp", "vsf", "vtnc", "viado", "veado", "bicha", "arrombado", "arrombada", "desgraca", "desgracado", "desgracada", "cacete", "piroca", "xoxota", "xereca", "vagabunda", "vagabundo", "otario", "otaria", "corno", "bosta", "babaca", "escroto", "escrota", "ladrao", "ladroes", "ladra", "corrupto", "corrupta", "corruptos", "safado", "safada", "nazista", "macaco", "pau no", "toma no", "vai se"];
  function normaliza(t) {
    return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/0/g, "o").replace(/1/g, "i").replace(/3/g, "e").replace(/4|@/g, "a").replace(/5|\$/g, "s").replace(/7/g, "t")
      .replace(/[^a-z\s]/g, " ").replace(/(.)\1{2,}/g, "$1$1");
  }
  function textoOk() {
    var t = " " + normaliza([E.para, E.msg, E.de].join(" ")).replace(/\s+/g, " ") + " ";
    var junto = t.replace(/\s/g, "");
    return !BLOQ.some(function (w) {
      if (w.indexOf(" ") > 0) return t.indexOf(" " + w + " ") >= 0;
      return t.indexOf(" " + w + " ") >= 0 || (w.length >= 6 && junto.indexOf(w) >= 0);
    });
  }

  /* ---------- montagem da interface ---------- */
  $("postalTexto").textContent = P.texto || "";

  $("gerFrentes").innerHTML = frentes.map(function (f, i) {
    return '<button type="button" class="ger-frente" aria-pressed="' + (i === E.frente) + '" data-i="' + i + '">' +
      '<img src="' + esc(f.miniatura || f.imagem) + '" alt="" loading="lazy"><span>' + esc(f.nome) + "</span></button>";
  }).join("");
  $("gerSelos").innerHTML = selos.map(function (s, i) {
    return '<button type="button" class="ger-selo m' + (i % 3) + '" aria-pressed="' + (i === E.selo) + '" data-i="' + i + '" aria-label="Selo ' + esc(s.replace(/-/g, " ")) + '">' +
      '<img src="' + urlSelo(i) + '" alt="" loading="lazy"></button>';
  }).join("");
  $("gerFrases").innerHTML = (P.frases || []).map(function (f, i) {
    return '<button type="button" class="ger-frase" data-i="' + i + '">' + esc(f) + "</button>";
  }).join("");

  var msg = $("gerMsg"), conta = $("gerConta");
  msg.value = E.msg;
  function atualizaConta() { conta.textContent = msg.value.length + "/140"; }
  atualizaConta();

  function marca(box, i) {
    Array.prototype.forEach.call(box.querySelectorAll("[aria-pressed]"), function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-i") === i)); });
  }
  function radio(box, attr, val) {
    Array.prototype.forEach.call(box.querySelectorAll("[role=radio]"), function (b) { b.setAttribute("aria-checked", String(b.getAttribute(attr) === val)); });
  }
  function escondeErro() { $("gerErro").hidden = true; }

  $("gerFrentes").addEventListener("click", function (e) {
    var b = e.target.closest(".ger-frente"); if (!b) return;
    E.frente = +b.getAttribute("data-i"); marca(this, E.frente);
    carregaFrente(E.frente).then(agenda);
  });
  $("gerSelos").addEventListener("click", function (e) {
    var b = e.target.closest(".ger-selo"); if (!b) return;
    E.selo = +b.getAttribute("data-i"); marca(this, E.selo);
    carregaSelo(E.selo).then(agenda);
  });
  $("gerFrases").addEventListener("click", function (e) {
    var b = e.target.closest(".ger-frase"); if (!b) return;
    msg.value = E.msg = (P.frases || [])[+b.getAttribute("data-i")] || ""; atualizaConta(); escondeErro(); agenda();
  });
  msg.addEventListener("input", function () { E.msg = msg.value; atualizaConta(); escondeErro(); agenda(); });
  $("gerPara").addEventListener("input", function () { E.para = this.value.trim(); escondeErro(); agenda(); });
  $("gerDe").addEventListener("input", function () { E.de = this.value.trim(); escondeErro(); agenda(); });
  $("gerForm").addEventListener("submit", function (e) { e.preventDefault(); });

  $("gerFormatos").addEventListener("click", function (e) {
    var b = e.target.closest("[data-formato]"); if (!b) return;
    E.formato = b.getAttribute("data-formato"); radio(this, "data-formato", E.formato); agenda();
  });
  $("gerEfeitos").addEventListener("click", function (e) {
    var b = e.target.closest("[data-efeito]"); if (!b) return;
    E.efeito = b.getAttribute("data-efeito"); radio(this, "data-efeito", E.efeito);
    processaFoto(); agenda();
  });

  // foto: lida só na memória; o arquivo original é descartado logo depois
  $("gerFoto").addEventListener("change", function () {
    var arq = this.files && this.files[0];
    this.value = "";
    if (!arq || !/^image\//.test(arq.type || "image/")) return;
    var url = URL.createObjectURL(arq), im = new Image();
    im.onload = function () {
      var max = 1400, e = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
      var c = document.createElement("canvas");
      c.width = Math.round(im.naturalWidth * e); c.height = Math.round(im.naturalHeight * e);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      im.onload = im.onerror = null; URL.revokeObjectURL(url); escondeErro();
      E.foto = c; E.zoom = 1; E.cx = 0.5; E.cy = 0.42; $("gerZoom").value = 1;
      $("gerAjuste").hidden = false; $("gerFotoRot").textContent = "Trocar foto";
      processaFoto(); agenda();
    };
    im.onerror = function () {
      URL.revokeObjectURL(url);
      mostraErro("Não foi possível abrir essa foto. Tente outra imagem (JPG ou PNG).");
    };
    im.src = url;
  });
  $("gerTirar").addEventListener("click", function () {
    E.foto = null; E.fotoPronta = null;
    $("gerAjuste").hidden = true; $("gerFotoRot").textContent = "Escolher foto";
    agenda();
  });
  var filaFoto = false;
  function agendaFoto() {
    if (filaFoto) return; filaFoto = true;
    requestAnimationFrame(function () { filaFoto = false; processaFoto(); desenha(); });
  }
  $("gerZoom").addEventListener("input", function () { E.zoom = +this.value; agendaFoto(); });
  (function () {
    var rc = $("gerRecorteCanvas"), ini = null;
    rc.addEventListener("pointerdown", function (e) { if (!E.foto) return; ini = { x: e.clientX, y: e.clientY, cx: E.cx, cy: E.cy }; rc.setPointerCapture(e.pointerId); });
    rc.addEventListener("pointermove", function (e) {
      if (!ini) return;
      var r = recorteFonte(), b = rc.getBoundingClientRect();
      E.cx = ini.cx - (e.clientX - ini.x) / b.width * r.w / E.foto.width;
      E.cy = ini.cy - (e.clientY - ini.y) / b.height * r.h / E.foto.height;
      agendaFoto();
    });
    var fim = function () { ini = null; };
    rc.addEventListener("pointerup", fim); rc.addEventListener("pointercancel", fim);
  })();

  /* ---------- exportar ---------- */
  function mostraErro(t) { var p = $("gerErro"); p.textContent = t; p.hidden = false; }
  function nomeArquivo() { return "postal-natal-guarapuava" + (E.formato === "postal" ? "-15x10" : "-story") + ".jpg"; }
  function gera() {
    return new Promise(function (ok, falha) {
      if (!textoOk()) { falha("texto"); return; }
      desenha();
      try {
        if (tela.toBlob) tela.toBlob(function (b) { b ? ok(b) : falha("imagem"); }, "image/jpeg", 0.93);
        else {
          var bin = atob(tela.toDataURL("image/jpeg", 0.93).split(",")[1]), arr = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          ok(new Blob([arr], { type: "image/jpeg" }));
        }
      } catch (e) { falha("imagem"); }
    });
  }
  function trataFalha(motivo) {
    if (motivo === "texto") mostraErro("Esse recado tem palavras que não podem sair no postal. Que tal escrever de outro jeito?");
    else mostraErro("Não foi possível gerar a imagem neste navegador. Tente atualizar a página.");
  }
  function brilho(el) { if (!reduz && window.magia && window.magia.burstEm) window.magia.burstEm(el, 26); }

  // navegadores que não baixam arquivo: iPhone/iPad e navegadores internos de apps (Instagram, Facebook etc.)
  var ua = navigator.userAgent || "";
  var ehIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var dentroDeApp = /Instagram|FBAN|FBAV|FB_IAB|Line\/|Twitter|TikTok|Snapchat|; wv\)/i.test(ua);
  var semDownload = ehIOS || dentroDeApp || !("download" in document.createElement("a"));

  // janela com a imagem pronta, para salvar tocando e segurando
  var janela = null, janelaUrl = null;
  function mostraParaSalvar(blob) {
    if (!janela) {
      janela = document.createElement("dialog");
      janela.className = "visor ger-salvar";
      janela.setAttribute("aria-label", "Seu postal pronto");
      janela.innerHTML = '<figure class="visor-foto"><img alt="Seu postal de Natal pronto"><figcaption>' +
        '<b>Seu postal está pronto!</b> Toque e segure a imagem e escolha <b>Salvar imagem</b> (ou <b>Adicionar às Fotos</b>).' +
        '<a class="bt bt-ouro ger-salvar-link" target="_blank" rel="noopener">Abrir a imagem</a></figcaption></figure>' +
        '<button class="visor-bt visor-fechar" type="button" aria-label="Fechar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg></button>';
      document.body.appendChild(janela);
      janela.querySelector(".visor-fechar").addEventListener("click", function () { janela.close(); });
      janela.addEventListener("click", function (e) { if (e.target === janela) janela.close(); });
      janela.addEventListener("close", function () { document.documentElement.classList.remove("visor-aberto"); });
    }
    if (janelaUrl) URL.revokeObjectURL(janelaUrl);
    janelaUrl = URL.createObjectURL(blob);
    var im = janela.querySelector("img"); im.className = "ok"; im.src = janelaUrl;
    var ln = janela.querySelector(".ger-salvar-link"); ln.href = janelaUrl; ln.setAttribute("download", nomeArquivo());
    if (typeof janela.showModal === "function") { janela.showModal(); document.documentElement.classList.add("visor-aberto"); }
    else window.open(janelaUrl, "_blank");
  }

  $("gerBaixar").addEventListener("click", function () {
    var bt = this;
    escondeErro();
    if (location.protocol === "file:") {
      mostraErro("O navegador não deixa salvar a imagem com o site aberto direto do computador. No site publicado, o botão funciona normalmente.");
      return;
    }
    gera().then(function (blob) {
      if (semDownload) { mostraParaSalvar(blob); brilho(bt); return; }
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = nomeArquivo(); a.rel = "noopener";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      brilho(bt);
    }, trataFalha);
  });

  var podeCompartilhar = false;
  try {
    podeCompartilhar = !!(navigator.share && navigator.canShare &&
      navigator.canShare({ files: [new File([new Blob(["x"], { type: "image/jpeg" })], "x.jpg", { type: "image/jpeg" })] }));
  } catch (e) { podeCompartilhar = false; }
  if (podeCompartilhar) {
    $("gerEnviar").hidden = false;
    $("gerEnviar").addEventListener("click", function () {
      var bt = this;
      gera().then(function (blob) {
        var arq = new File([blob], nomeArquivo(), { type: "image/jpeg" });
        return navigator.share({ files: [arq], title: "Postal de Natal", text: "Um postal de Natal de Guarapuava pra você. ✉️" }).then(function () { brilho(bt); });
      }, function (m) { trataFalha(m); }).catch(function () { /* compartilhamento cancelado */ });
    });
  }

  /* ---------- começa quando a seção chega perto da tela ---------- */
  var iniciou = false;
  function inicia() {
    if (iniciou) return; iniciou = true;
    desenha();
    preparaAssets().then(desenha);
    // desenha de novo se alguma fonte terminar de carregar depois
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(agenda);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) { if (ents[0].isIntersecting) { io.disconnect(); inicia(); } }, { rootMargin: "800px 0px" });
    io.observe(sec);
  } else inicia();
  sec.addEventListener("focusin", inicia);
})();
