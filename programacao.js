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
    periodoTexto: "a partir de 15 de novembro",

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
    texto: "Um dos momentos mais esperados do Natal em Guarapuava: crianças vestidas de anjo, com asas de luz e velas nas mãos, cantando à beira do lago no aniversário da cidade.",
    // horário do momento principal (usado em "Salvar na agenda" desta seção)
    inicio: "20:00", fim: "22:00",
    rotuloHorario: "Às 20h",
    imagem: "assets/img/coral-postal.webp",
    luzes: "assets/img/coral-luzes.webp"
  },

  /* Tipos de atração — usados nos filtros e na cor de cada carimbo */
  categorias: [
    { id: "luzes",     nome: "Luzes",                  cor: "#B07A1E" },
    { id: "criancas",  nome: "Papai Noel e crianças",  cor: "#C2412F" },
    { id: "musica",    nome: "Música e apresentações", cor: "#A3262A" },
    { id: "desfile",   nome: "Desfile",                cor: "#2F5D45" },
    { id: "esporte",   nome: "Esporte",                cor: "#2C6A86" },
    { id: "solene",    nome: "Cerimônias e homenagens", cor: "#6B4A36" },
    { id: "reveillon", nome: "Réveillon",              cor: "#8A6A1C" },
    { id: "feira",     nome: "Feiras e sabores",       cor: "#1C5E2A" },
    { id: "tradicao",  nome: "Tradição",               cor: "#A9572A" }
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
      id: "casa-papai-noel",
      nome: "Casa do Papai Noel",
      endereco: "Centro de Artes, atrás do Carneiro Martins",
      mapa: "https://www.google.com/maps/search/?api=1&query=Centro+de+Artes+Guarapuava+PR",
      postal: ""
    },
    {
      id: "praca-ucrania",
      nome: "Praça Ucrânia",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+Ucr%C3%A2nia+Guarapuava+PR",
      postal: ""
    },
    {
      id: "local-a-confirmar",
      nome: "Local a confirmar",
      endereco: "",
      postal: ""
    },
    {
      id: "parques-e-pracas",
      nome: "Pela cidade",
      endereco: "Guarapuava – PR",
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
     Todos os dias de um período: de: "2026-12-01", ate: "2026-12-22"
       (em "Todas as noites" o período aparece num cartão só, no primeiro dia que ainda não passou)
     "fim" é opcional (sem ele, a agenda considera 2 horas de duração).
     "roteiro" é opcional: lista de horários dentro do mesmo evento.
     "rotuloHorario" troca o texto do horário (ex.: "Ao anoitecer").     */
  eventos: [
    {
      titulo: "Luzes de Natal acesas",
      data: "2026-11-15",
      local: "parques-e-pracas", categoria: "luzes",
      rotuloHorario: "Todas as noites",
      descricao: "A partir de 15 de novembro, a decoração de Natal da cidade fica acesa todas as noites."
    },
    {
      titulo: "Desfile do Caminhão da Coca-Cola",
      data: "2026-11-24", inicio: "19:00",
      local: "trajeto-desfile", categoria: "desfile",
      descricao: "Desfile do caminhão pelas ruas da cidade. O trajeto completo está no mapa."
    },

    // Casa do Papai Noel
    {
      titulo: "Brinquedos na Praça 9 de Dezembro",
      de: "2026-12-01", ate: "2026-12-23", inicio: "14:00", fim: "22:00",
      local: "praca-nove-de-dezembro", categoria: "criancas",
      descricao: "Brinquedos para a criançada na praça. A previsão é ter chapéu mexicano e aviões."
    },
    {
      titulo: "Abertura da Casa do Papai Noel",
      data: "2026-12-01", inicio: "19:00", fim: "23:00",
      local: "casa-papai-noel", categoria: "criancas",
      descricao: "Abertura da Casa, com a chegada prevista do Papai Noel. A rua em frente à Casa fica fechada durante o evento."
    },
    {
      titulo: "Atendimento do Papai Noel",
      de: "2026-12-01", ate: "2026-12-22", inicio: "19:00", fim: "23:00",
      local: "casa-papai-noel", categoria: "criancas",
      descricao: "O Papai Noel recebe as visitas na Casa do Papai Noel, no Centro de Artes, todas as noites."
    },

    // Câmara Municipal (sessões solenes)
    {
      titulo: "Sessão solene de entrega dos títulos de Cidadão Honorário e Cidadão Benemérito",
      data: "2026-12-02", inicio: "19:00",
      local: "local-a-confirmar", categoria: "solene",
      descricao: "Sessão solene da Câmara Municipal de Guarapuava."
    },
    {
      titulo: "Sessão solene de premiação do evento “Jovens Sementes do Amanhã”",
      data: "2026-12-03",
      local: "local-a-confirmar", categoria: "solene",
      descricao: "Sessão solene da Câmara Municipal de Guarapuava."
    },
    {
      titulo: "Sessão solene em homenagem póstuma ao Padre Chagas (ALAC)",
      data: "2026-12-04",
      local: "local-a-confirmar", categoria: "solene",
      descricao: "Sessão solene da Câmara Municipal de Guarapuava."
    },

    {
      titulo: "Corrida Circuito ACIG Jovem",
      data: "2026-12-05", inicio: "18:00",
      local: "casa-papai-noel", categoria: "esporte",
      descricao: "Largada na Casa do Papai Noel, no Centro de Artes."
    },
    {
      id: "coral-dos-anjos", destaque: true,
      titulo: "Coral dos Anjos",
      data: "2026-12-09", inicio: "20:00",
      local: "parque-do-lago", categoria: "musica",
      descricao: "Apresentação do Coral dos Anjos em comemoração ao aniversário de Guarapuava."
    },
    {
      titulo: "Prêmio Lobo Guará",
      data: "2026-12-12",
      local: "local-a-confirmar", categoria: "solene",
      descricao: "Premiação da Secretaria de Inovação."
    },
    {
      titulo: "Caminhão-palco do SESI e food trucks",
      de: "2026-12-17", ate: "2026-12-22", inicio: "18:00", fim: "23:00",
      local: "lagoa-das-lagrimas", categoria: "musica",
      descricao: "Apresentações culturais no caminhão-palco e food trucks à beira da lagoa. A programação das apresentações será divulgada em breve."
    },
    {
      titulo: "Futevôlei",
      data: "2026-12-19",
      local: "praca-ucrania", categoria: "esporte",
      descricao: "Futevôlei na Praça Ucrânia. Horário e programação a confirmar."
    },
    {
      titulo: "Réveillon no Parque do Lago",
      data: "2026-12-31",
      local: "parque-do-lago", categoria: "reveillon",
      descricao: "A virada do ano no Parque do Lago. A programação será divulgada em breve."
    }
  ],

  /* Atividades ainda sem data — aparecem em "Também vem aí", abaixo da agenda.
     Quando a data for confirmada, mova o item para a lista "eventos". */
  semData: [
    { titulo: "Traslado das cinzas do Padre Chagas", texto: "Da Praça 9 de Dezembro até a Catedral, com missa. Data e horário a confirmar." },
    { titulo: "Programação de Natal do Teatro Municipal", texto: "Atrações e datas das apresentações a confirmar." }
  ],

  /* Novidades — aparecem em "Novidades", a mais recente primeiro.
     Para dar uma notícia nova, acrescente um item no topo da lista.
     "link" e "rotuloLink" são opcionais (ex.: "#programacao", "#coral"). */
  novidades: [
    {
      data: "2026-11-09",
      titulo: "Luzes de Natal acesas a partir do dia 15",
      texto: "A partir de domingo, 15 de novembro, a decoração de Natal da cidade fica acesa todas as noites.",
      link: "#programacao", rotuloLink: "Ver na programação"
    },
    {
      data: "2026-11-09",
      titulo: "A Casa do Papai Noel abre no dia 1º de dezembro",
      texto: "Na abertura, às 19h, chega o Papai Noel. Depois, ele atende todas as noites até 22 de dezembro, das 19h às 23h, no Centro de Artes.",
      link: "#programacao", rotuloLink: "Ver na programação"
    },
    {
      data: "2026-11-09",
      titulo: "Coral dos Anjos no aniversário da cidade",
      texto: "Dia 9 de dezembro, às 20h, no Parque do Lago.",
      link: "#coral", rotuloLink: "Ver o destaque"
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
