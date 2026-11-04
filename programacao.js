/* ==========================================================================
   NATAL EM GUARAPUAVA 2026 — CONTEÚDO DO SITE
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para atualizar o site.
   Datas no formato AAAA-MM-DD. Horários no formato HH:MM (24h).

   Sem horário definido? Deixe "inicio" de fora: o site mostra "Horário a confirmar".
   Mude "programacaoProvisoria" para false quando a agenda estiver fechada.
   ========================================================================== */

window.NATAL = {

  config: {
    // Mostra o aviso "programação em atualização" acima da agenda
    programacaoProvisoria: true,

    // Texto do período no topo. Deixe "" para calcular pela primeira e última data.
    periodoTexto: "a partir de 24 de novembro",

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

  /* Atração em destaque — ganha uma seção própria logo abaixo do topo.
     "evento" é o id do evento na lista "eventos". Deixe destaque: null para esconder. */
  destaque: {
    evento: "coral-dos-anjos",
    chamada: "9 de dezembro, no Parque do Lago",
    texto: "Um dos momentos mais esperados do Natal em Guarapuava: crianças vestidas de anjo, com asas de luz e velas nas mãos, cantando à beira do lago.",
    // horário do momento principal (usado em "Salvar na agenda" desta seção)
    inicio: "20:00", fim: "22:00",
    rotuloHorario: "Coral às 20h",
    imagem: "assets/img/coral-postal.webp",
    luzes: "assets/img/coral-luzes.webp"
  },

  /* Tipos de atração — usados nos filtros e na cor de cada carimbo */
  categorias: [
    { id: "luzes",    nome: "Luzes",            cor: "#B07A1E" },
    { id: "musica",   nome: "Música",           cor: "#A3262A" },
    { id: "criancas", nome: "Para as crianças", cor: "#C2412F" },
    { id: "feira",    nome: "Feiras e sabores", cor: "#1C5E2A" },
    { id: "desfile",  nome: "Desfile",          cor: "#2F5D45" },
    { id: "tradicao", nome: "Tradição",         cor: "#A9572A" },
    { id: "solene",   nome: "Sessão solene",    cor: "#6B4A36" }
  ],

  /* Lugares — cada um vira um postal na seção "Onde a magia acontece".
     "postal": imagem da frente (deixe "" para usar o cartão com o selo).
     "recado": frase escrita à mão no verso do postal.
     Lugar sem "postal" não aparece na seção dos postais, só na agenda.
     "rotuloMapa" troca o texto do botão do mapa (padrão: "Como chegar"). */
  locais: [
    {
      id: "parque-do-lago",
      nome: "Parque do Lago",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Parque+do+Lago+Guarapuava+PR",
      postal: "assets/img/postal-parque-lago.webp",
      recado: "Atravesse a ponte devagar. O reflexo das luzes na água é a parte que todo mundo fotografa."
    },
    {
      id: "lagoa-das-lagrimas",
      nome: "Lagoa das Lágrimas",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Lagoa+das+L%C3%A1grimas+Guarapuava+PR",
      postal: "assets/img/postal-lagoa.webp",
      recado: "Os presentes boiando na lagoa só aparecem direito quando o céu fica cor-de-rosa. Chegue um pouco antes de escurecer."
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
      id: "camara-municipal",
      nome: "Câmara Municipal de Guarapuava",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=C%C3%A2mara+Municipal+de+Guarapuava",
      postal: ""
    },
    {
      id: "trajeto-desfile",
      nome: "Trajeto do desfile",
      endereco: "Rota no mapa",
      mapa: "https://www.google.com/maps/d/u/0/viewer?mid=12NOD_B-BhGqBQOb0NeBag1YGkXdenOE&ll=-25.397890700000012%2C-51.49676490000001&z=14",
      rotuloMapa: "Ver o trajeto",
      postal: ""
    }
  ],

  /* Programação.
     Um dia só:        data: "2026-12-05"
     Vários dias:      datas: ["2026-12-18", "2026-12-19", "2026-12-20"]
     "fim" é opcional (sem ele, a agenda considera 2 horas de duração).
     "roteiro" é opcional: lista de horários dentro do mesmo evento.     */
  eventos: [
    {
      titulo: "Desfile do Caminhão da Coca-Cola e Acendimento das Luzes de Natal",
      data: "2026-11-24",
      local: "trajeto-desfile", categoria: "desfile",
      descricao: "Desfile do caminhão pelas ruas e acendimento das luzes de Natal. O trajeto completo está no mapa."
    },

    // Câmara Municipal — Ofício 093; 096/2026 (inclusão solicitada na programação)
    {
      titulo: "Sessão Solene de entrega dos títulos de Cidadão Honorário e Cidadão Benemérito",
      data: "2026-12-02",
      local: "camara-municipal", categoria: "solene"
    },
    {
      titulo: "Sessão Solene e entrega de prêmios do evento “Jovens Sementes do Amanhã”",
      data: "2026-12-03",
      local: "camara-municipal", categoria: "solene"
    },
    {
      titulo: "Sessão Solene em homenagem póstuma ao Padre Chagas – ALAC",
      data: "2026-12-04",
      local: "camara-municipal", categoria: "solene"
    },

    {
      id: "coral-dos-anjos", destaque: true,
      titulo: "Coral dos Anjos",
      data: "2026-12-09", inicio: "11:00", fim: "23:30",
      local: "parque-do-lago", categoria: "musica",
      descricao: "Programação o dia todo no Parque do Lago. O Coral dos Anjos se apresenta às 20h.",
      roteiro: [
        { hora: "11h às 12h30", texto: "Apresentação musical; comidas e brincadeiras; atividades de esporte e educação estilo carreta SESI (a confirmar)" },
        { hora: "13h às 14h30, 15h às 16h30 e 17h às 18h30", texto: "Apresentações de bandas de rock locais" },
        { hora: "20h", texto: "Coral dos Anjos" },
        { hora: "22h às 23h30", texto: "Banda local / rock" }
      ]
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
