/* Natal em Guarapuava 2026 — programação, lugares e textos
   Lê os dados de programacao.js (window.NATAL) e monta a página. */
(function () {
  "use strict";

  var D = window.NATAL || { config: {}, categorias: [], locais: [], eventos: [], perguntas: [] };
  var C = D.config || {};
  var FUSO = "America/Sao_Paulo";

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- datas ---------- */
  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var MES_CURTO = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  var DIA_CURTO = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

  function hojeISO() {
    try {
      return new Intl.DateTimeFormat("en-CA", { timeZone: FUSO, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    } catch (e) {
      var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    }
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function partes(iso) { var p = iso.split("-"); return { a: +p[0], m: +p[1] - 1, d: +p[2] }; }
  function diaSemana(iso) { var p = partes(iso); return new Date(Date.UTC(p.a, p.m, p.d)).getUTCDay(); }
  function somaDias(iso, n) {
    var p = partes(iso); var t = new Date(Date.UTC(p.a, p.m, p.d + n));
    return t.getUTCFullYear() + "-" + pad(t.getUTCMonth() + 1) + "-" + pad(t.getUTCDate());
  }
  function diferencaDias(a, b) {
    var pa = partes(a), pb = partes(b);
    return Math.round((Date.UTC(pb.a, pb.m, pb.d) - Date.UTC(pa.a, pa.m, pa.d)) / 864e5);
  }
  function dataLonga(iso) {
    var p = partes(iso); var w = DIAS[diaSemana(iso)];
    return w.charAt(0).toUpperCase() + w.slice(1) + ", " + ord(p.d) + " de " + MESES[p.m];
  }
  function hora(h) {
    if (!h) return "";
    var p = h.split(":"); return (+p[0]) + "h" + (p[1] && p[1] !== "00" ? p[1] : "");
  }
  function ord(d) { return d === 1 ? "1º" : d; }
  function periodoTexto(ev) {
    var a = partes(ev.de), b = partes(ev.ate);
    return "Todos os dias, de " + ord(a.d) + (a.m !== b.m ? " de " + MESES[a.m] : "") + " a " + b.d + " de " + MESES[b.m];
  }
  function horario(ev) {
    if (ev.rotuloHorario) return ev.rotuloHorario;
    if (!ev.inicio) return "Horário a confirmar";
    return ev.fim ? hora(ev.inicio) + " às " + hora(ev.fim) : "a partir das " + hora(ev.inicio);
  }

  var HOJE = hojeISO();
  var AMANHA = somaDias(HOJE, 1);

  /* ---------- índices ---------- */
  var cats = {}; (D.categorias || []).forEach(function (c) { cats[c.id] = c; });
  var locais = {}; (D.locais || []).forEach(function (l) { locais[l.id] = l; });

  // Uma ocorrência por data (eventos de vários dias viram várias ocorrências)
  var ocorrencias = [];
  (D.eventos || []).forEach(function (ev, i) {
    var datas = ev.datas || (ev.data ? [ev.data] : []);
    if (ev.de && ev.ate) { datas = []; for (var dd = ev.de; dd <= ev.ate; dd = somaDias(dd, 1)) datas.push(dd); }
    datas.forEach(function (dt) { ocorrencias.push({ ev: ev, data: dt, id: i + "-" + dt }); });
  });
  ocorrencias.sort(function (a, b) {
    return a.data < b.data ? -1 : a.data > b.data ? 1 : (a.ev.inicio || "") < (b.ev.inicio || "") ? -1 : 1;
  });

  /* ---------- período no hero ---------- */
  (function () {
    var el = $("#periodo"); if (!el) return;
    if (C.periodoTexto) { el.textContent = C.periodoTexto; return; }
    if (!ocorrencias.length) return;
    var ini = partes(ocorrencias[0].data), fim = partes(ocorrencias[ocorrencias.length - 1].data);
    el.textContent = ini.m === fim.m
      ? "de " + ord(ini.d) + " a " + fim.d + " de " + MESES[fim.m]
      : "de " + ord(ini.d) + " de " + MESES[ini.m] + " a " + fim.d + " de " + MESES[fim.m];
  })();

  /* ---------- contagem em noites ---------- */
  (function () {
    var el = $("#contagem"); if (!el) return;
    var natal = C.noiteDeNatal || "2026-12-24";
    var n = diferencaDias(HOJE, natal);
    var html;
    if (n > 1) html = '<i></i><span>Faltam <b data-conta="' + n + '">' + n + "</b> noites para a noite de Natal</span>";
    else if (n === 1) html = "<i></i><span>Amanhã é a noite de Natal</span>";
    else if (n === 0) html = "<i></i><span>Hoje é a noite de Natal</span>";
    else if (n === -1) html = "<i></i><span>Feliz Natal, Guarapuava</span>";
    else if (C.luzesAcesasAte && HOJE <= C.luzesAcesasAte) {
      var p = partes(C.luzesAcesasAte);
      html = "<i></i><span>As luzes ficam acesas até " + ord(p.d) + " de " + MESES[p.m] + "</span>";
    } else html = "<span>Até o próximo Natal, Guarapuava</span>";
    el.innerHTML = html;
  })();

  /* ---------- aviso de programação provisória ---------- */
  if (C.programacaoProvisoria) { var av = $("#aviso"); if (av) av.hidden = false; }

  /* ---------- carimbo postal (SVG) ---------- */
  var nCarimbo = 0;
  function carimbo(iso, classe, topo, centro1, centro2) {
    var k = "c" + (nCarimbo++);
    var p = iso ? partes(iso) : null;
    var t1 = topo || "GUARAPUAVA";
    var c1 = centro1 != null ? centro1 : (p ? p.d : "");
    var c2 = centro2 != null ? centro2 : (p ? MES_CURTO[p.m].toUpperCase() : "");
    return '<svg class="' + classe + '" viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs><path id="' + k + 'a" d="M 21 60 A 39 39 0 0 1 99 60"/><path id="' + k + 'b" d="M 17 60 A 43 43 0 0 0 103 60"/></defs>' +
      '<circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<text font-size="11" letter-spacing="2.2"><textPath href="#' + k + 'a" startOffset="50%" text-anchor="middle">' + esc(t1) + "</textPath></text>" +
      '<text font-size="10" letter-spacing="2.6"><textPath href="#' + k + 'b" startOffset="50%" text-anchor="middle">NATAL ✦ 2026</textPath></text>' +
      '<text class="pm-dia" x="60" y="64" font-size="' + (String(c1).length > 2 ? 15 : 30) + '" text-anchor="middle">' + esc(c1) + "</text>" +
      '<text x="60" y="80" font-size="11" letter-spacing="1.5" text-anchor="middle">' + esc(c2) + "</text>" +
      "</svg>";
  }

  /* ---------- links úteis ---------- */
  function linkAgenda(o) {
    var ev = o.ev, l = locais[ev.local] || {};
    var d = o.data.replace(/-/g, "");
    var datas;
    if (!ev.inicio) { datas = d + "/" + somaDias(o.data, 1).replace(/-/g, ""); }
    var ini = (ev.inicio || "19:00").replace(":", "") + "00";
    var fimH = ev.fim;
    if (!fimH) { var h = +(ev.inicio || "19:00").split(":")[0] + 2; fimH = pad(Math.min(h, 23)) + ":" + (ev.inicio || "19:00").split(":")[1]; }
    var fim = fimH.replace(":", "") + "00";
    var q = [
      "action=TEMPLATE",
      "text=" + encodeURIComponent(ev.titulo + " | Natal em Guarapuava"),
      "dates=" + (datas || (d + "T" + ini + "/" + d + "T" + fim)),
      "ctz=" + encodeURIComponent(FUSO),
      "details=" + encodeURIComponent((ev.descricao || "") + "\n\nProgramação completa: " + urlSite()),
      "location=" + encodeURIComponent((l.nome || "") + (l.endereco ? ", " + l.endereco : ""))
    ];
    return "https://calendar.google.com/calendar/render?" + q.join("&");
  }
  function urlSite() { return location.href.split("#")[0]; }
  function linkWhats(o) {
    var ev = o.ev, l = locais[ev.local] || {}, p = partes(o.data);
    var txt = ev.titulo + ", " + DIAS[diaSemana(o.data)] + " " + ord(p.d) + " de " + MESES[p.m] +
      (ev.inicio ? ", " + horario(ev) : "") + (l.nome ? ". Local: " + l.nome : "") +
      ". Programação completa do Natal em Guarapuava: " + urlSite() + "#programacao";
    return "https://wa.me/?text=" + encodeURIComponent(txt);
  }

  /* ---------- estado dos filtros ---------- */
  var estado = { data: "todas", cat: "todas", local: null, passadas: false };

  function visiveis(ignorarData) {
    return ocorrencias.filter(function (o) {
      if (!estado.passadas && o.data < HOJE) return false;
      if (estado.cat !== "todas" && o.ev.categoria !== estado.cat) return false;
      if (estado.local && o.ev.local !== estado.local) return false;
      if (!ignorarData && estado.data !== "todas" && o.data !== estado.data) return false;
      return true;
    });
  }

  /* ---------- noites (datas) ---------- */
  function montaNoites() {
    var box = $("#noites"); if (!box) return;
    var datas = [];
    ocorrencias.forEach(function (o) {
      if (!estado.passadas && o.data < HOJE) return;
      if (datas.indexOf(o.data) < 0) datas.push(o.data);
    });
    if (estado.data !== "todas" && datas.indexOf(estado.data) < 0) estado.data = "todas";
    var comAlgo = {}; visiveis(true).forEach(function (o) { comAlgo[o.data] = 1; });
    var h = '<button type="button" class="noite todas" data-data="todas" aria-pressed="' + (estado.data === "todas") + '">' +
      '<svg aria-hidden="true"><use href="#i-estrela"/></svg><span>Todas as noites</span></button>';
    datas.forEach(function (dt) {
      var p = partes(dt), hoje = dt === HOJE;
      h += '<button type="button" class="noite' + (hoje ? " e-hoje" : "") + (comAlgo[dt] ? "" : " vazia") + '" data-data="' + dt +
        '" aria-pressed="' + (estado.data === dt) + '" aria-label="' + esc(dataLonga(dt)) + (hoje ? " (hoje)" : "") + '">' +
        '<span class="ns">' + (hoje ? "hoje" : DIA_CURTO[diaSemana(dt)]) + "</span><b>" + p.d + '</b><span class="nm">' + MES_CURTO[p.m] + "</span></button>";
    });
    box.innerHTML = h;
  }

  /* ---------- tipos (categorias) ---------- */
  function montaTipos() {
    var box = $("#tipos"); if (!box) return;
    var usadas = {}; ocorrencias.forEach(function (o) { usadas[o.ev.categoria] = 1; });
    var h = '<button type="button" class="tipo tudo" data-cat="todas" aria-pressed="' + (estado.cat === "todas") + '">Tudo</button>';
    (D.categorias || []).forEach(function (c) {
      if (!usadas[c.id]) return;
      h += '<button type="button" class="tipo" data-cat="' + esc(c.id) + '" style="--c:' + esc(c.cor) + '" aria-pressed="' + (estado.cat === c.id) + '"><i></i>' + esc(c.nome) + "</button>";
    });
    box.innerHTML = h;
  }

  /* ---------- agenda ---------- */
  function montaAgenda() {
    var box = $("#agenda"); if (!box) return;
    var lista = visiveis(false);
    if (estado.data === "todas") {
      var vistos = {};
      lista = lista.filter(function (o) {
        if (!(o.ev.de && o.ev.ate)) return true;
        var k = D.eventos.indexOf(o.ev); if (vistos[k]) return false; vistos[k] = 1; return true;
      });
    }
    var fl = $("#filtroLocal");
    if (fl) {
      fl.hidden = !estado.local;
      if (estado.local && locais[estado.local]) $("#filtroLocalNome").textContent = locais[estado.local].nome;
    }
    if (!lista.length) {
      var acabou = !estado.passadas && ocorrencias.length && ocorrencias[ocorrencias.length - 1].data < HOJE;
      box.innerHTML = acabou
        ? '<div class="vazio"><p>A programação deste Natal já aconteceu.</p><span>Marque “Mostrar o que já passou” para relembrar.</span></div>'
        : '<div class="vazio"><p>Nenhuma atração nessa combinação.</p><span>Tente outra noite ou outro tipo de atração.</span></div>';
      return;
    }
    var grupos = [], atual = null;
    lista.forEach(function (o) {
      if (!atual || atual.data !== o.data) { atual = { data: o.data, itens: [] }; grupos.push(atual); }
      atual.itens.push(o);
    });
    var i = 0, h = "";
    grupos.forEach(function (g) {
      var selo = g.data === HOJE ? '<span class="selo-dia">Hoje</span>' : g.data === AMANHA ? '<span class="selo-dia amanha">Amanhã</span>' : "";
      var pg = partes(g.data), sem = DIAS[diaSemana(g.data)];
      h += '<section class="dia" aria-label="' + esc(dataLonga(g.data)) + '"><h3><span class="dsem">' + esc(sem.charAt(0).toUpperCase() + sem.slice(1)) + '</span><span class="vg">, </span><span class="ddata">' + ord(pg.d) + " de " + MESES[pg.m] + "</span>" + selo + '</h3><div class="eventos">';
      g.itens.forEach(function (o) {
        var ev = o.ev, c = cats[ev.categoria] || { nome: "", cor: "#1F2350" }, l = locais[ev.local] || { nome: ev.local || "" };
        var passou = o.data < HOJE;
        var r = ((i * 37) % 17) - 10;
        h += '<article class="evento' + (passou ? " passou" : "") + (ev.destaque ? " destaque" : "") + '" style="--c:' + esc(c.cor) + ";--i:" + Math.min(i, 12) + ";--r:" + r + 'deg">' +
          carimbo(o.data, "pm") +
          '<p class="ev-tipo">' + esc(c.nome) + (ev.destaque ? ' <span class="selo-destaque"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-estrela"/></svg>Destaque</span>' : "") + (ev.gratuito ? ' <span class="gratis">Gratuito</span>' : "") + "</p>" +
          "<h4>" + esc(ev.titulo) + "</h4>" +
          '<p class="ev-quando">' +
          '<span><svg aria-hidden="true"><use href="#i-relogio"/></svg>' + esc(horario(ev)) + "</span>" +
          '<span><svg aria-hidden="true"><use href="#i-pino"/></svg>' + esc(l.nome) + "</span></p>" +
          (ev.de && ev.ate ? '<p class="ev-periodo"><svg aria-hidden="true"><use href="#i-estrela"/></svg>' + esc(periodoTexto(ev)) + "</p>" : "") +
          (ev.descricao ? '<p class="ev-desc">' + esc(ev.descricao) + "</p>" : "") +
          (ev.roteiro && ev.roteiro.length ? '<ul class="roteiro">' + ev.roteiro.map(function (r) {
            return "<li><b>" + esc(r.hora) + "</b>" + esc(r.texto) + "</li>";
          }).join("") + "</ul>" : "") +
          '<div class="ev-acoes">' +
          (l.mapa ? '<a href="' + esc(l.mapa) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-pino"/></svg><span class="longo">' + esc(l.rotuloMapa || "Como chegar") + '</span><span class="curto">Mapa</span></a>' : "") +
          (passou ? "" : '<a href="' + esc(linkAgenda(o)) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-agenda"/></svg><span class="longo">Salvar na agenda</span><span class="curto">Agenda</span></a>') +
          '<a href="' + esc(linkWhats(o)) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-enviar"/></svg><span class="longo">Enviar no WhatsApp</span><span class="curto">WhatsApp</span></a>' +
          "</div>" +
          (passou ? '<span class="ja-foi">Já aconteceu</span>' : "") +
          "</article>";
        i++;
      });
      h += "</div></section>";
    });
    box.innerHTML = h;
  }

  function atualiza() { montaNoites(); montaTipos(); montaAgenda(); }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".noite, .tipo");
    if (!b) return;
    if (b.classList.contains("noite")) estado.data = b.getAttribute("data-data");
    else estado.cat = b.getAttribute("data-cat");
    atualiza();
    var novo = document.querySelector(b.classList.contains("noite") ? '.noite[data-data="' + estado.data + '"]' : '.tipo[data-cat="' + estado.cat + '"]');
    if (novo) {
      novo.focus({ preventScroll: true });
      if (window.magia && window.magia.faisca) window.magia.faisca(novo);
    }
  });
  var cb = $("#passadas");
  if (cb) cb.addEventListener("change", function () { estado.passadas = cb.checked; atualiza(); });
  var lim = $("#limparLocal");
  if (lim) lim.addEventListener("click", function () { estado.local = null; atualiza(); });

  // usado pelos postais: "Ver o que acontece aqui"
  window.filtrarLocal = function (id) {
    estado.local = id; estado.data = "todas"; estado.cat = "todas";
    atualiza();
    var alvo = $("#programacao"); if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  atualiza();

  /* ---------- atração em destaque ---------- */
  (function () {
    var dq = D.destaque, sec = $("#coral");
    if (!sec) return;
    var ev = dq && (D.eventos || []).filter(function (e) { return e.id === dq.evento; })[0];
    if (!dq || !ev) { sec.hidden = true; var mc = $("#menuCoral"); if (mc) mc.hidden = true; return; }
    sec.hidden = false;
    var l = locais[ev.local] || {};
    var data = ev.data || (ev.datas || [])[0];
    var p = partes(data), sem = DIAS[diaSemana(data)];
    $("#t-coral").textContent = ev.titulo;
    $("#coralChamada").textContent = dq.chamada || "";
    $("#coralTexto").textContent = dq.texto || ev.descricao || "";
    if (dq.imagem) $("#coralImg").src = dq.imagem;
    if (dq.luzes) $("#coralLuzes").src = dq.luzes;
    var o = { ev: { titulo: ev.titulo, inicio: dq.inicio || ev.inicio, fim: dq.fim || ev.fim, local: ev.local, descricao: dq.texto || ev.descricao }, data: data };
    $("#coralInfo").innerHTML =
      '<li><svg aria-hidden="true"><use href="#i-agenda"/></svg>' + esc(sem.charAt(0).toUpperCase() + sem.slice(1, sem.indexOf("-") > 0 ? sem.indexOf("-") : sem.length)) + ", " + ord(p.d) + " de " + MESES[p.m] + "</li>" +
      '<li><svg aria-hidden="true"><use href="#i-relogio"/></svg>' + esc(dq.rotuloHorario || horario(ev)) + "</li>" +
      '<li><svg aria-hidden="true"><use href="#i-pino"/></svg>' + esc(l.nome || "") + "</li>" +
      (ev.inicio && ev.fim && ev.inicio !== dq.inicio ? '<li class="sub">Programação no local ' + esc(horario(ev).replace(/^(\d)/, "das $1")) + "</li>" : "");
    $("#coralAcoes").innerHTML =
      '<a class="bt bt-ouro" href="' + esc(linkAgenda(o)) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-agenda"/></svg>Salvar na agenda</a>' +
      '<button class="bt bt-tinta" type="button" id="coralDia">Ver a programação do dia</button>';
    $("#coralDia").addEventListener("click", function () {
      estado.data = data; estado.cat = "todas"; estado.local = null;
      if (data < HOJE) { estado.passadas = true; var cb2 = $("#passadas"); if (cb2) cb2.checked = true; }
      atualiza();
      var alvo = $("#programacao"); if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  })();

  /* ---------- postais ---------- */
  (function () {
    var box = $("#postais"); if (!box) return;
    var h = "";
    (D.locais || []).filter(function (l) { return !!l.postal; }).forEach(function (l, i) {
      var qtd = (D.eventos || []).filter(function (ev) { return ev.local === l.id; }).length;
      var frente = l.postal
        ? '<img src="' + esc(l.postal) + '" alt="Postal ilustrado: ' + esc(l.nome) + ' ao entardecer" loading="lazy">'
        : '<div class="frente-selo"><img src="assets/img/selo.webp" alt="" loading="lazy"><span>Lembrança de Guarapuava</span></div>';
      h += '<div class="postal" style="--i:' + i + ";--dx:" + (i % 2 ? 60 : -60) + '">' +
        '<div class="postal-in">' +
        '<div class="face frente">' + frente +
                '<span class="dica"><svg aria-hidden="true"><use href="#i-virar"/></svg>Virar</span>' +
        '<button type="button" class="virar" aria-label="Virar o postal de ' + esc(l.nome) + '"></button>' +
        "</div>" +
        '<div class="face verso" inert>' +
        '<div class="verso-esq"><p class="recado">' + esc(l.recado || "") + "</p></div>" +
        '<div class="verso-dir">' +
        '<span class="selo-postal"><img src="assets/img/selo-mini.webp" alt="" loading="lazy"></span>' +
        carimbo(null, "pm-local", "GUARAPUAVA", "NATAL", "PR") +
        "<h3>" + esc(l.nome) + "</h3>" +
        (l.endereco ? '<p class="end">' + esc(l.endereco) + "</p>" : "") +
        '<div class="verso-acoes">' +
        (qtd ? '<button type="button" data-local="' + esc(l.id) + '"><svg aria-hidden="true"><use href="#i-agenda"/></svg>Ver ' + (qtd === 1 ? "a atração" : "as " + qtd + " atrações") + "</button>" : "") +
        (l.mapa ? '<a href="' + esc(l.mapa) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-pino"/></svg>' + esc(l.rotuloMapa || "Como chegar") + "</a>" : "") +
        "</div></div>" +
        '<button type="button" class="voltar" aria-label="Desvirar o postal"><svg aria-hidden="true"><use href="#i-virar"/></svg></button>' +
        "</div></div>" +
        '<p class="postal-nome">' + esc(l.nome) + (qtd ? "<small>" + (qtd === 1 ? "1 atração" : qtd + " atrações") + " na programação</small>" : "") + "</p>" +
        "</div>";
    });
    box.innerHTML = h;

    function vira(postal, paraVerso) {
      postal.classList.toggle("virado", paraVerso);
      var fr = postal.querySelector(".frente"), vs = postal.querySelector(".verso");
      if (paraVerso) { fr.setAttribute("inert", ""); vs.removeAttribute("inert"); }
      else { vs.setAttribute("inert", ""); fr.removeAttribute("inert"); }
      setTimeout(function () {
        var alvo = paraVerso ? vs.querySelector(".verso-acoes button, .verso-acoes a, .voltar") : fr.querySelector(".virar");
        if (alvo) alvo.focus({ preventScroll: true });
      }, 450);
    }
    box.addEventListener("click", function (e) {
      var postal = e.target.closest(".postal"); if (!postal) return;
      var loc = e.target.closest("[data-local]");
      if (loc) { window.filtrarLocal(loc.getAttribute("data-local")); return; }
      if (e.target.closest(".verso a")) return;
      if (e.target.closest(".virar")) {
        vira(postal, true);
        if (window.magia && window.magia.burstEm) window.magia.burstEm(postal, 26);
        return;
      }
      if (e.target.closest(".verso")) vira(postal, false);
    });
  })();

  /* ---------- visor (imagem ampliada: galeria e varal) ---------- */
  var visorAbre = (function () {
    var visor = $("#visor"), vImg = $("#visorImg"), vLeg = $("#visorLegenda");
    if (!visor || typeof visor.showModal !== "function") {
      return function (l, i) { window.open(l[i].src, "_blank", "noopener"); };
    }
    var lista = [], atual = 0, origem = null;
    var precarrega = function (i) { var im = new Image(); im.src = lista[(i + lista.length) % lista.length].src; };
    var mostra = function (i) {
      atual = (i + lista.length) % lista.length;
      var f = lista[atual];
      vImg.classList.remove("ok");
      vImg.onload = function () { vImg.classList.add("ok"); };
      vImg.src = f.src;
      vImg.alt = f.alt;
      vImg.width = f.w; vImg.height = f.h;
      vLeg.innerHTML = esc(f.legenda) + '<span class="visor-num">' + (atual + 1) + " de " + lista.length + "</span>";
      precarrega(atual + 1); precarrega(atual - 1);
    };
    $("#visorFechar").addEventListener("click", function () { visor.close(); });
    $("#visorAnt").addEventListener("click", function () { mostra(atual - 1); });
    $("#visorProx").addEventListener("click", function () { mostra(atual + 1); });
    visor.addEventListener("close", function () {
      document.documentElement.classList.remove("visor-aberto");
      if (origem) origem.focus({ preventScroll: true });
    });
    visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); });
    visor.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); mostra(atual + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); mostra(atual - 1); }
    });
    var x0 = null;
    visor.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    visor.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) mostra(atual + (dx < 0 ? 1 : -1));
    });
    return function (l, i, quem, opc) {
      opc = opc || {};
      lista = l; origem = quem || null;
      var postal = !!opc.postal;
      visor.setAttribute("aria-label", opc.rotulo || "Foto ampliada");
      visor.classList.toggle("visor-postal", postal);
      $("#visorAnt").setAttribute("aria-label", postal ? "Postal anterior" : "Foto anterior");
      $("#visorProx").setAttribute("aria-label", postal ? "Próximo postal" : "Próxima foto");
      mostra(i);
      visor.showModal();
      document.documentElement.classList.add("visor-aberto");
    };
  })();

  /* ---------- galeria 2025 ---------- */
  (function () {
    var G = D.galeria, sec = $("#galeria"), album = $("#album");
    if (!sec || !album) return;
    if (!G || !(G.fotos || []).length) { sec.hidden = true; var mg = document.querySelector('.menu a[href="#galeria"]'); if (mg) mg.hidden = true; return; }
    sec.hidden = false;
    if (G.titulo) $("#t-galeria").textContent = G.titulo;
    $("#galeriaTexto").textContent = G.texto || "";
    var base = "assets/img/galeria/", fotos = G.fotos, visiveis = G.visiveis || fotos.length;
    var giros = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8, -2, 1.4];
    album.innerHTML = fotos.map(function (f, i) {
      return '<figure class="foto' + (i >= visiveis ? " guardada" : "") + '" style="--r:' + giros[i % giros.length] + 'deg"' + (i >= visiveis ? " hidden" : "") + ">" +
        '<button class="foto-bt" type="button" data-i="' + i + '" aria-label="Ampliar foto: ' + esc(f.descricao) + '">' +
        '<img src="' + base + esc(f.arquivo) + '-p.webp" width="' + f.largura + '" height="' + f.altura + '" alt="' + esc(f.descricao) + '" loading="lazy" decoding="async">' +
        "</button></figure>";
    }).join("");

    // a foto "revela" quando aparece na tela, como papel fotográfico
    var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var io = (!reduz && "IntersectionObserver" in window) ? new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var fig = en.target, img = fig.querySelector("img");
        var revela = function () { setTimeout(function () { fig.classList.add("revelada"); }, 80 + Math.random() * 260); };
        if (img.complete) revela(); else { img.addEventListener("load", revela, { once: true }); img.addEventListener("error", revela, { once: true }); }
        io.unobserve(fig);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }) : null;
    var observa = function () {
      Array.prototype.forEach.call(album.querySelectorAll(".foto:not([hidden]):not(.revelada)"), function (f) {
        if (io) io.observe(f); else f.classList.add("revelada");
      });
    };
    observa();

    var mais = $("#albumMais"), resto = fotos.length - visiveis;
    if (resto > 0) {
      mais.hidden = false;
      mais.textContent = "Ver mais " + resto + (resto === 1 ? " foto" : " fotos");
      mais.addEventListener("click", function () {
        Array.prototype.forEach.call(album.querySelectorAll(".foto.guardada"), function (f) { f.hidden = false; });
        mais.hidden = true;
        observa();
        var prim = album.querySelector(".foto.guardada .foto-bt"); if (prim) prim.focus({ preventScroll: true });
      });
    }

    // visor (foto ampliada)
    var itens = fotos.map(function (f) {
      return { src: base + f.arquivo + ".webp", alt: f.descricao, legenda: f.descricao, w: f.largura, h: f.altura };
    });
    album.addEventListener("click", function (e) {
      var b = e.target.closest(".foto-bt"); if (!b) return;
      visorAbre(itens, +b.getAttribute("data-i"), b);
    });
  })();

  /* ---------- varal de postais ---------- */
  (function () {
    var V = D.varal, sec = $("#varal"), trilho = $("#varalTrilho"), lista = $("#varalLista"), fio = $("#varalFio");
    if (!sec || !lista) return;
    if (!V || !(V.postais || []).length) { sec.hidden = true; return; }
    sec.hidden = false;
    if (V.titulo) $("#t-varal").textContent = V.titulo;
    $("#varalTexto").textContent = V.texto || "";
    var base = "assets/img/postais/", ps = V.postais;
    var giros = [-2.4, 1.8, -1.2, 2.2, -1.9, 1.3];
    var pregador = '<svg class="pregador" viewBox="0 0 18 44" aria-hidden="true" focusable="false">' +
      '<rect x="3" y="1" width="12" height="42" rx="3" fill="#C99A5B"/><rect x="3" y="1" width="5.6" height="42" rx="2.6" fill="#D9AE70"/>' +
      '<path d="M9 2v40" stroke="#8A6236" stroke-width="1"/><rect x="1" y="15" width="16" height="7" rx="2" fill="#B8BCC2"/>' +
      '<path d="M2.5 18.5h13" stroke="#7E848C" stroke-width="1.2"/></svg>';
    lista.innerHTML = ps.map(function (p, i) {
      return '<li class="pv" style="--r:' + giros[i % giros.length] + 'deg;--t:' + (5.4 + (i % 3) * 0.8).toFixed(1) + 's;--d:-' + (i * 1.9 % 5).toFixed(1) + 's">' +
        '<button class="pv-bt" type="button" data-i="' + i + '" aria-label="Ampliar postal: ' + esc(p.descricao) + '">' + pregador +
        '<img src="' + base + esc(p.arquivo) + '-p.webp" width="720" height="405" alt="" loading="lazy" decoding="async">' +
        "</button></li>";
    }).join("");

    var itens = ps.map(function (p) {
      return { src: base + p.arquivo + ".webp", alt: p.descricao, legenda: p.titulo || p.descricao, w: 1600, h: 900 };
    });
    lista.addEventListener("click", function (e) {
      var b = e.target.closest(".pv-bt"); if (!b) return;
      visorAbre(itens, +b.getAttribute("data-i"), b, { rotulo: "Postal ampliado", postal: true });
    });

    // o fio: uma curva entre os pregadores de cada fileira, com lâmpadas penduradas
    var NS = "http://www.w3.org/2000/svg", CORES = 4, PINO = 14;
    var desenha = function () {
      var W = lista.scrollWidth, H = lista.scrollHeight;
      fio.setAttribute("width", W); fio.setAttribute("height", H);
      fio.setAttribute("viewBox", "0 0 " + W + " " + H);
      var fileiras = [];
      Array.prototype.forEach.call(lista.children, function (li) {
        var x = li.offsetLeft + li.offsetWidth / 2, y = li.offsetTop - PINO;
        var f = null;
        for (var k = 0; k < fileiras.length; k++) if (Math.abs(fileiras[k].y - y) < 24) f = fileiras[k];
        if (!f) { f = { y: y, xs: [] }; fileiras.push(f); }
        f.xs.push(x); f.ws = li.offsetWidth;
      });
      var html = '<defs>';
      for (var c = 0; c < CORES; c++) html += '<radialGradient id="vh' + c + '"><stop offset="0" class="vh' + c + '"/><stop offset="1" class="vh' + c + '" stop-opacity="0"/></radialGradient>';
      html += "</defs>";
      var caminhos = [], n = 0;
      fileiras.forEach(function (f) {
        var pts = [[-30, f.y - 26]].concat(f.xs.map(function (x) { return [x, f.y]; }), [[W + 30, f.y - 26]]);
        var d = "M" + pts[0][0] + " " + pts[0][1];
        for (var i = 1; i < pts.length; i++) {
          var a = pts[i - 1], b = pts[i], borda = i === 1 || i === pts.length - 1;
          var cx = (a[0] + b[0]) / 2, cy = Math.max(a[1], b[1]) + (borda ? Math.min(70, Math.abs(b[0] - a[0]) * 0.16) : Math.min(16, Math.abs(b[0] - a[0]) * 0.035));
          d += " Q" + cx.toFixed(1) + " " + cy.toFixed(1) + " " + b[0].toFixed(1) + " " + b[1].toFixed(1);
        }
        caminhos.push({ d: d, xs: f.xs, meia: f.ws / 2 - 12 });
      });
      html += caminhos.map(function (c) { return '<path class="fio" d="' + c.d + '"/>'; }).join("");
      fio.innerHTML = html;
      // lâmpadas ao longo de cada fio, longe dos pregadores
      var g = "";
      Array.prototype.forEach.call(fio.querySelectorAll("path.fio"), function (p, k) {
        var L = p.getTotalLength(), passo = 40, xs = caminhos[k].xs, meia = caminhos[k].meia;
        for (var s = passo / 2; s < L; s += passo) {
          var pt = p.getPointAtLength(s);
          if (pt.x < -6 || pt.x > W + 6) continue;
          var perto = false, sobre = false;
          for (var j = 0; j < xs.length; j++) {
            var dx = Math.abs(xs[j] - pt.x);
            if (dx < 22) perto = true;
            if (dx < meia) sobre = true;
          }
          if (perto) continue;
          // por cima dos postais a lâmpada aponta para o alto; nos vãos, fica pendurada
          var giro = (n % 2 ? 14 : -12) + (n % 3) * 4 + (sobre ? 180 : 0), cor = n % CORES;
          g += '<g class="lamp l' + cor + '" style="--d:-' + ((n * 0.73) % 3.1).toFixed(2) + 's" transform="translate(' + pt.x.toFixed(1) + " " + pt.y.toFixed(1) + ") rotate(" + giro + ')">' +
            '<circle class="halo" cy="13" r="15" fill="url(#vh' + cor + ')"/>' +
            '<rect x="-3.2" y="0" width="6.4" height="5.5" rx="1.2" fill="#173523"/>' +
            '<path class="bulbo" d="M-4.2 5.2 C-6.2 10 -4.8 17.5 0 19.5 C4.8 17.5 6.2 10 4.2 5.2 Z"/></g>';
          n++;
        }
      });
      fio.insertAdjacentHTML("beforeend", g);
    };
    desenha();
    if ("ResizeObserver" in window) {
      var larg = 0;
      new ResizeObserver(function () {
        var w = lista.clientWidth; if (w === larg) return; larg = w; desenha();
      }).observe(lista);
    } else window.addEventListener("resize", desenha);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(desenha);

    // só balança e pisca enquanto está na tela
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { sec.classList.toggle("vivo", en[0].isIntersecting); }, { rootMargin: "120px 0px" }).observe(sec);
    } else sec.classList.add("vivo");
  })();

  /* ---------- ainda sem data ---------- */
  (function () {
    var box = $("#semData"); if (!box) return;
    var lista = D.semData || [];
    if (!lista.length) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = '<h3>Também vem aí</h3><p class="sd-sub">Atividades confirmadas que ainda estão sem data ou horário. Assim que tudo estiver definido, elas entram na agenda.</p><ul>' +
      lista.map(function (x) { return "<li><b>" + esc(x.titulo) + "</b>" + (x.texto ? "<span>" + esc(x.texto) + "</span>" : "") + "</li>"; }).join("") + "</ul>";
  })();

  /* ---------- novidades ---------- */
  (function () {
    var box = $("#novidadesLista"), sec = $("#novidades"); if (!box || !sec) return;
    var lista = (D.novidades || []).slice().sort(function (a, b) { return a.data < b.data ? 1 : a.data > b.data ? -1 : 0; });
    if (!lista.length) { sec.hidden = true; var m = $("#menuNovidades"); if (m) m.hidden = true; return; }
    sec.hidden = false;
    box.innerHTML = lista.map(function (n, i) {
      var p = partes(n.data);
      return '<article class="nov-item' + (i === 0 ? " nov-nova" : "") + '" style="--i:' + i + '">' +
        carimbo(n.data, "nov-carimbo") +
        '<p class="nov-data">' + (i === 0 ? '<span class="nov-selo">Mais recente</span>' : "") + ord(p.d) + " de " + MESES[p.m] + "</p>" +
        "<h3>" + esc(n.titulo) + "</h3>" +
        (n.texto ? "<p>" + esc(n.texto) + "</p>" : "") +
        (n.link ? '<a class="nov-link" href="' + esc(n.link) + '">' + esc(n.rotuloLink || "Saiba mais") + ' <span aria-hidden="true">→</span></a>' : "") +
        "</article>";
    }).join("");
  })();

  /* ---------- perguntas ---------- */
  (function () {
    var box = $("#perguntas"); if (!box) return;
    box.innerHTML = (D.perguntas || []).map(function (q) {
      return "<details><summary>" + esc(q.pergunta) + "</summary><p>" + esc(q.resposta) + "</p></details>";
    }).join("");
    if (!(D.perguntas || []).length) { var a = $(".antes"); if (a) a.hidden = true; }
  })();

  /* ---------- rodapé ---------- */
  (function () {
    var r = $("#realizacao"); if (r && C.realizacao) r.textContent = C.realizacao;
    var links = [];
    if (C.siteOficial) links.push('<a href="' + esc(C.siteOficial) + '" target="_blank" rel="noopener">Site da Prefeitura</a>');
    (C.redes || []).forEach(function (s) { links.push('<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.nome) + "</a>"); });
    var rl = $("#rodapeLinks"); if (rl) rl.innerHTML = links.join("");
    if ((C.apoiadores || []).length) {
      $("#apoio").hidden = false;
      $("#apoioLogos").innerHTML = C.apoiadores.map(function (a) {
        return a.logo ? '<img src="' + esc(a.logo) + '" alt="' + esc(a.nome) + '" loading="lazy">' : "<span>" + esc(a.nome) + "</span>";
      }).join("");
    }
  })();

  /* ---------- faixas de selos postais ---------- */
  (function () {
    // desenhos da cidade (assets/img/selos) + o anjo do Coral
    var desenhos = ["catedral", "anjo", "gralha-azul", "cachoeira", "casa", "pinhao", "postes", "beija-flor", "araucaria", "portal", "raposa", "floco", "estrutura"];
    var desenho = function (d) {
      return d === "anjo" ? '<svg aria-hidden="true"><use href="#s-anjo"/></svg>' : '<img src="assets/img/selos-natal/' + d + '.svg" alt="" loading="lazy" decoding="async">';
    };
    var molduras = ["verde", "creme", "ouro"];
    var giros = [-4, 3, -2, 4, -3, 2];
    var um = "";
    for (var i = 0; i < 26; i++) {
      var carimbado = i % 5 === 2;
      um += '<span class="selo-faixa" style="--g:' + giros[i % giros.length] + 'deg"><span class="selinho m-' + molduras[i % 3] + '">' + desenho(desenhos[i % desenhos.length]) + '<small>NATAL 2026</small></span>' +
        (carimbado ? '<svg class="risco" viewBox="0 0 120 60" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" filter="url(#tinta)"><path d="M0 14 q10 -7 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 M0 30 q10 -7 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 M0 46 q10 -7 20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/></g></svg>' : "") +
        "</span>";
    }
    Array.prototype.forEach.call(document.querySelectorAll("[data-faixa]"), function (el, k) {
      el.innerHTML = um + um;
      if (k % 2) el.style.animationDirection = "reverse";
    });
  })();

  /* ---------- cordão de luzes do topo com bolinhas listradas (como no selo da ID) ---------- */
  (function () {
    var svg = $("#enfeites"); if (!svg) return;
    var NS = "http://www.w3.org/2000/svg";
    var fio = "M-20 6 Q 160 74 340 8 Q 520 78 720 10 Q 900 78 1080 8 Q 1260 74 1460 6";
    var h = '<defs><radialGradient id="enfeiteLuz"><stop offset="0" stop-color="#FFE6A6" stop-opacity=".95"/><stop offset=".45" stop-color="#FFD07A" stop-opacity=".4"/><stop offset="1" stop-color="#FFC060" stop-opacity="0"/></radialGradient></defs>' +
      '<path id="fioTopo" d="' + fio + '" fill="none" stroke="#5A3D2B" stroke-width="2" opacity=".8"/>';
    svg.innerHTML = h;
    var path = svg.querySelector("#fioTopo"), L = path.getTotalLength(), cores = ["#E8B04E", "#C8323A", "#3E8A5C", "#FFF1C9", "#F29A3A"];
    var luzes = "";
    for (var i = 0; i < 44; i++) {
      var p = path.getPointAtLength((i + 0.5) / 44 * L);
      if (p.x < 0 || p.x > 1440) continue;
      var c = cores[i % cores.length];
      luzes += '<g class="lamp-topo" style="--c:' + c + ';--dl:' + (i * 0.06).toFixed(2) + 's"><circle class="luz" cx="' + p.x.toFixed(1) + '" cy="' + (p.y + 9).toFixed(1) + '" r="14" fill="url(#enfeiteLuz)"/>' +
        '<rect x="' + (p.x - 2.5).toFixed(1) + '" y="' + (p.y - 1).toFixed(1) + '" width="5" height="5" rx="1.2" fill="#4A3A2C"/>' +
        '<ellipse class="bulbo" cx="' + p.x.toFixed(1) + '" cy="' + (p.y + 9).toFixed(1) + '" rx="5" ry="7" fill="' + c + '"/></g>';
    }
    // bolinhas listradas penduradas nos pontos baixos do fio (só à direita, acima do postal)
    [[900, 74, 46, 17, "#C8323A"], [1260, 70, 34, 15, "#2F6B4A"], [1080, 8, 30, 13, "#D9A23A"]].forEach(function (b, i) {
      var x = b[0], y0 = b[1], L2 = b[2], r = b[3], cor = b[4], cy = y0 + L2 + 6 + r, listra = cor === "#D9A23A" ? "#A3262A" : "#F6EFD9";
      luzes += '<g class="enfeite" style="transform-origin:' + x + 'px ' + y0 + 'px;--d:' + (5 + i) + 's;--dl:' + (-i * 1.3) + 's">' +
        '<line x1="' + x + '" y1="' + y0 + '" x2="' + x + '" y2="' + (y0 + L2) + '" stroke="#8A6A45" stroke-width="1.4"/>' +
        '<circle class="luz" cx="' + x + '" cy="' + cy + '" r="' + (r * 2.1) + '" fill="url(#enfeiteLuz)"/>' +
        '<rect x="' + (x - 4.5) + '" y="' + (y0 + L2) + '" width="9" height="7" rx="1.5" fill="#C9A04E"/>' +
        '<circle cx="' + x + '" cy="' + cy + '" r="' + r + '" fill="' + cor + '"/>' +
        '<path d="M' + (x - r * 0.92) + ' ' + (cy - r * 0.38) + ' H' + (x + r * 0.92) + ' M' + (x - r) + ' ' + cy + ' H' + (x + r) + ' M' + (x - r * 0.92) + ' ' + (cy + r * 0.38) + ' H' + (x + r * 0.92) + '" stroke="' + listra + '" stroke-width="1.8"/>' +
        '<path d="M' + (x - r * 0.8) + ' ' + (cy - r * 0.18) + ' l' + (r * 0.2) + ' ' + (-r * 0.16) + ' ' + (r * 0.2) + ' ' + (r * 0.16) + ' ' + (r * 0.2) + ' ' + (-r * 0.16) + ' ' + (r * 0.2) + ' ' + (r * 0.16) + ' ' + (r * 0.2) + ' ' + (-r * 0.16) + ' ' + (r * 0.2) + ' ' + (r * 0.16) + ' ' + (r * 0.2) + ' ' + (-r * 0.16) + ' ' + (r * 0.2) + ' ' + (r * 0.16) + '" fill="none" stroke="#E2B24A" stroke-width="1.3"/>' +
        '<path d="M' + (x - r * 0.5) + ' ' + (cy - r * 0.62) + ' q' + (r * 0.25) + ' ' + (-r * 0.25) + ' ' + (r * 0.6) + ' ' + (-r * 0.3) + '" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/></g>';
    });
    svg.insertAdjacentHTML("beforeend", luzes);
  })();

  /* ---------- menu: seção atual ---------- */
  (function () {
    var topo = $("#topo");
    var onScroll = function () { if (topo) topo.classList.toggle("rolou", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    if (!("IntersectionObserver" in window)) return;
    var links = document.querySelectorAll(".menu a");
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["coral", "programacao", "lugares", "galeria", "sobre"].forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  })();
})();
