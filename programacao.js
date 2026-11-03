/* ==========================================================================
   NATAL EM GUARAPUAVA 2026 — CONTEÚDO DO SITE
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para atualizar o site.
   Datas no formato AAAA-MM-DD. Horários no formato HH:MM (24h).

   ATENÇÃO: a programação abaixo é DE EXEMPLO. Troque pelos eventos oficiais
   e mude "programacaoProvisoria" para false quando a agenda estiver fechada.
   ========================================================================== */

window.NATAL = {

  config: {
    // Mostra o aviso "programação em fechamento" acima da agenda
    programacaoProvisoria: true,

    // Noite de Natal (usada na contagem regressiva "faltam X noites")
    noiteDeNatal: "2026-12-24",
    // Até quando as luzes ficam acesas (texto exibido depois do Natal)
    luzesAcesasAte: "2027-01-06",

    realizacao: "Prefeitura de Guarapuava",
    siteOficial: "https://www.guarapuava.pr.gov.br",

    // Redes oficiais (deixe a lista vazia para esconder)
    // Exemplo: { nome: "Instagram", url: "https://instagram.com/..." }
    redes: [],

    // Apoiadores (aparecem só no site, nunca nas redes institucionais).
    // Exemplo: { nome: "Empresa X", logo: "assets/img/apoio-empresa-x.webp" }
    apoiadores: []
  },

  /* Tipos de atração — usados nos filtros e na cor de cada carimbo */
  categorias: [
    { id: "luzes",    nome: "Luzes",            cor: "#C9862B" },
    { id: "musica",   nome: "Música",           cor: "#8E3B6B" },
    { id: "criancas", nome: "Para as crianças", cor: "#B8141B" },
    { id: "feira",    nome: "Feiras e sabores", cor: "#1C5E2A" },
    { id: "desfile",  nome: "Desfile",          cor: "#2D3A8C" },
    { id: "tradicao", nome: "Tradição",         cor: "#A9572A" }
  ],

  /* Lugares — cada um vira um postal na seção "Onde a magia acontece".
     "postal": imagem da frente (deixe "" para usar o selo no lugar).
     "recado": frase escrita à mão no verso do postal.               */
  locais: [
    {
      id: "parque-do-lago",
      nome: "Parque do Lago",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Parque+do+Lago+Guarapuava+PR",
      postal: "assets/img/postal-parque-lago.webp",
      recado: "Os presentes boiando no lago só aparecem direito quando o céu fica cor-de-rosa. Chegue um pouco antes de escurecer."
    },
    {
      id: "lagoa-das-lagrimas",
      nome: "Lagoa das Lágrimas",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Lagoa+das+L%C3%A1grimas+Guarapuava+PR",
      postal: "assets/img/postal-ponte-madeira.webp",
      recado: "Atravesse a ponte devagar. O reflexo das luzes na água é a parte que todo mundo fotografa."
    },
    {
      id: "praca-nove-de-dezembro",
      nome: "Praça Nove de Dezembro",
      endereco: "Centro, Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+Nove+de+Dezembro+Guarapuava+PR",
      postal: "assets/img/postal-arvore.webp",
      recado: "Olhe a árvore de baixo para cima, bem perto do tronco. A estrela parece mais longe do que é."
    },
    {
      id: "centro",
      nome: "Ruas do Centro",
      endereco: "Trajeto da Parada de Natal",
      mapa: "https://www.google.com/maps/search/?api=1&query=Centro+Guarapuava+PR",
      postal: "assets/img/postal-ponte-cidade.webp",
      recado: "Na noite da Parada, as calçadas viram arquibancada. Leve as crianças nos ombros."
    }
  ],

  /* Programação.
     Um dia só:        data: "2026-12-05"
     Vários dias:      datas: ["2026-12-18", "2026-12-19", "2026-12-20"]
     "fim" é opcional (sem ele, a agenda considera 2 horas de duração).  */
  eventos: [
    {
      titulo: "Acendimento das luzes de Natal",
      data: "2026-11-28", inicio: "19:30", fim: "21:00",
      local: "parque-do-lago", categoria: "luzes", gratuito: true,
      descricao: "A contagem regressiva começa ao entardecer. Quando a última luz acender, o Natal em Guarapuava está aberto."
    },
    {
      titulo: "Chegada do Papai Noel",
      data: "2026-11-28", inicio: "20:00", fim: "22:00",
      local: "parque-do-lago", categoria: "criancas", gratuito: true,
      descricao: "Ele chega logo depois das luzes, para a primeira foto da temporada e as primeiras cartinhas."
    },
    {
      titulo: "Cantata de abertura",
      data: "2026-11-29", inicio: "19:00", fim: "20:30",
      local: "praca-nove-de-dezembro", categoria: "musica", gratuito: true,
      descricao: "Corais da cidade cantam juntos aos pés da árvore. Vale levar uma cadeira de praia."
    },
    {
      titulo: "Feira de Natal",
      datas: ["2026-12-04", "2026-12-05", "2026-12-06"], inicio: "17:00", fim: "22:00",
      local: "praca-nove-de-dezembro", categoria: "feira", gratuito: true,
      descricao: "Artesanato, presentes feitos à mão, doces de Natal e comida para comer andando entre as barracas."
    },
    {
      titulo: "Parada de Natal",
      data: "2026-12-05", inicio: "20:00", fim: "22:00",
      local: "centro", categoria: "desfile", gratuito: true,
      descricao: "Carros iluminados, personagens e música pelas ruas do Centro. O Papai Noel fecha o cortejo."
    },
    {
      titulo: "Luzes da Lagoa",
      data: "2026-12-08", inicio: "20:00", fim: "21:30",
      local: "lagoa-das-lagrimas", categoria: "luzes", gratuito: true,
      descricao: "A ponte e o contorno da lagoa acendem de uma vez. Depois disso, a água nunca mais fica escura até janeiro."
    },
    {
      titulo: "Oficina de cartinhas e enfeites",
      data: "2026-12-12", inicio: "15:00", fim: "18:00",
      local: "parque-do-lago", categoria: "criancas", gratuito: true,
      descricao: "Papel, cola, glitter e uma caixa de correio só para cartas ao Papai Noel."
    },
    {
      titulo: "Concerto de Natal ao ar livre",
      data: "2026-12-12", inicio: "20:00", fim: "21:30",
      local: "lagoa-das-lagrimas", categoria: "musica", gratuito: true,
      descricao: "Clássicos de Natal com a lagoa acesa ao fundo."
    },
    {
      titulo: "Cinema de Natal no parque",
      data: "2026-12-13", inicio: "19:30", fim: "21:30",
      local: "parque-do-lago", categoria: "criancas", gratuito: true,
      descricao: "Telão no gramado e filme de Natal para a família. Traga a sua canga."
    },
    {
      titulo: "Casa do Papai Noel",
      datas: ["2026-12-18", "2026-12-19", "2026-12-20"], inicio: "18:00", fim: "21:00",
      local: "parque-do-lago", categoria: "criancas", gratuito: true,
      descricao: "Ele recebe as crianças, lê as cartinhas em voz alta e tira foto com quem pedir."
    },
    {
      titulo: "Presépio vivo",
      data: "2026-12-19", inicio: "20:00", fim: "21:00",
      local: "praca-nove-de-dezembro", categoria: "tradicao", gratuito: true,
      descricao: "A história do primeiro Natal contada na praça, com atores da cidade."
    },
    {
      titulo: "Feira de Natal: última edição",
      data: "2026-12-22", inicio: "17:00", fim: "22:00",
      local: "praca-nove-de-dezembro", categoria: "feira", gratuito: true,
      descricao: "A última chance para o presente de última hora."
    },
    {
      titulo: "Noite de Natal na praça",
      data: "2026-12-24", inicio: "19:00", fim: "21:00",
      local: "praca-nove-de-dezembro", categoria: "tradicao", gratuito: true,
      descricao: "Música baixa, árvore acesa e a cidade se cumprimentando antes da ceia."
    }
  ],

  /* Perguntas rápidas — aparecem em "Antes de sair de casa" */
  perguntas: [
    {
      pergunta: "Preciso pagar ou retirar ingresso?",
      resposta: "Não. As atrações da programação oficial são gratuitas e abertas ao público, a não ser quando o evento disser o contrário."
    },
    {
      pergunta: "E se chover?",
      resposta: "Atividades ao ar livre podem mudar de data por causa do tempo. Qualquer mudança aparece primeiro nesta página e nos canais oficiais da Prefeitura."
    },
    {
      pergunta: "Até quando as luzes ficam acesas?",
      resposta: "A decoração dos parques e praças fica acesa todas as noites até o Dia de Reis, 6 de janeiro."
    }
  ]
};
