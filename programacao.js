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

  /* Galeria — fotos das luzes do Natal 2025.
     As imagens ficam em assets/img/galeria/: "arquivo.webp" (grande) e "arquivo-p.webp" (miniatura).
     A ordem da lista é a ordem na página. "visiveis" é quantas aparecem antes do botão "Ver mais fotos". */
  galeria: {
    titulo: "Natal 2025 em fotos",
    texto: "Foi assim que Guarapuava acendeu no ano passado. As luzes deste Natal seguem o mesmo caminho.",
    visiveis: 12,
    fotos: [
      { arquivo: "natal-2025-01", largura: 480, altura: 640, descricao: "Árvore de Natal gigante de luzes brancas com estrela dourada no topo" },
      { arquivo: "natal-2025-02", largura: 480, altura: 640, descricao: "Ponte pênsil iluminada refletida no lago" },
      { arquivo: "natal-2025-03", largura: 640, altura: 480, descricao: "Árvore vermelha e verde e presentes de luz na água da lagoa" },
      { arquivo: "natal-2025-04", largura: 480, altura: 640, descricao: "Arco de luz com a frase Feliz Natal entre duas bengalas iluminadas" },
      { arquivo: "natal-2025-05", largura: 640, altura: 480, descricao: "Árvores espirais de luz em um caminho de praça" },
      { arquivo: "natal-2025-06", largura: 480, altura: 640, descricao: "Casa com o contorno do telhado e das janelas iluminado" },
      { arquivo: "natal-2025-07", largura: 512, altura: 640, descricao: "Ponte pênsil de madeira iluminada vista da cabeceira" },
      { arquivo: "natal-2025-08", largura: 480, altura: 640, descricao: "Bola de Natal gigante vermelha iluminada no gramado" },
      { arquivo: "natal-2025-09", largura: 640, altura: 480, descricao: "Árvore de luz vermelha e branca em uma praça, com pessoas passeando" },
      { arquivo: "natal-2025-10", largura: 640, altura: 480, descricao: "Árvores espirais de luz azul e branca em um jardim" },
      { arquivo: "natal-2025-11", largura: 480, altura: 640, descricao: "Árvore vermelha e verde iluminada no parque" },
      { arquivo: "natal-2025-12", largura: 480, altura: 640, descricao: "Arco de luz e estrela iluminada no gramado à beira do lago" },
      { arquivo: "natal-2025-13", largura: 640, altura: 480, descricao: "Topo da árvore de luzes brancas com estrelas douradas" },
      { arquivo: "natal-2025-14", largura: 640, altura: 480, descricao: "Ponte pênsil iluminada vista da margem do lago" },
      { arquivo: "natal-2025-15", largura: 480, altura: 640, descricao: "Árvore vermelha e verde ao lado da lagoa, com postes acesos" },
      { arquivo: "natal-2025-16", largura: 480, altura: 640, descricao: "Bolas de Natal gigantes iluminadas e túnel de luz azul" },
      { arquivo: "natal-2025-17", largura: 640, altura: 480, descricao: "Casa iluminada vista do gramado" },
      { arquivo: "natal-2025-18", largura: 480, altura: 640, descricao: "Árvore de luz branca e dourada à beira do lago" },
      { arquivo: "natal-2025-19", largura: 480, altura: 640, descricao: "Árvore espiral de luz em vermelho e branco" },
      { arquivo: "natal-2025-20", largura: 640, altura: 480, descricao: "Bolas de Natal gigantes vermelhas entre as árvores" },
      { arquivo: "natal-2025-21", largura: 480, altura: 640, descricao: "Bengala de luz e enfeites nos postes da avenida" },
      { arquivo: "natal-2025-22", largura: 480, altura: 640, descricao: "Árvores de luz em forma de cone refletidas na água do lago" },
      { arquivo: "natal-2025-23", largura: 640, altura: 480, descricao: "Ponte pênsil com os cabos iluminados" },
      { arquivo: "natal-2025-24", largura: 640, altura: 480, descricao: "Presentes de luz verdes refletidos na lagoa" },
      { arquivo: "natal-2025-25", largura: 480, altura: 640, descricao: "Árvore de luzes brancas vista de baixo, com a estrela no alto" },
      { arquivo: "natal-2025-26", largura: 512, altura: 640, descricao: "Ponte iluminada vista do alto, com reflexo no lago" },
      { arquivo: "natal-2025-27", largura: 640, altura: 360, descricao: "Ponte iluminada vista do caminho do parque" },
      { arquivo: "natal-2025-28", largura: 480, altura: 640, descricao: "Ponte iluminada entre as árvores, com reflexo no lago" }
    ]
  },

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
