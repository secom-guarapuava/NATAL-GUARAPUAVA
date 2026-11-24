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

    // Programação em stand-by: esconde a agenda e mostra o aviso "trenó em manutenção".
    // Mude para false para voltar a exibir os eventos.
    programacaoEmBreve: false,

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
    rotuloHorario: "A partir das 19h, com apresentação às 20h",
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
    { id: "teatro",    nome: "Teatro Municipal",       cor: "#7B3F61" },
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
      endereco: "Centro de Artes Iracema Trinco Ribeiro, atrás do Carneiro Martins",
      mapa: "https://www.google.com/maps/search/?api=1&query=Centro+de+Artes+Iracema+Trinco+Ribeiro+Guarapuava+PR",
      postal: ""
    },
    {
      id: "teatro-municipal",
      nome: "Teatro Municipal Marina Karam Primak",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Teatro+Municipal+Marina+Karam+Primak+Guarapuava+PR",
      postal: ""
    },
    {
      id: "oab-guarapuava",
      nome: "OAB Guarapuava",
      endereco: "Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=OAB+Guarapuava+PR",
      postal: ""
    },
    {
      id: "centro-eventos-agraria",
      nome: "Centro de Eventos Agrária",
      endereco: "Entre Rios, Guarapuava – PR",
      mapa: "https://www.google.com/maps/search/?api=1&query=Centro+de+Eventos+Agr%C3%A1ria+Entre+Rios+Guarapuava+PR",
      postal: ""
    },
    {
      id: "praca-ucrania",
      nome: "Praça da Ucrânia",
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
      nome: "Trajeto da carreata",
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
      titulo: "Caravana de Natal da Coca-Cola",
      data: "2026-11-24", inicio: "19:00",
      local: "trajeto-desfile", categoria: "desfile",
      descricao: "Carreata dos caminhões pelas ruas da cidade. O trajeto completo está no mapa."
    },

    // Praça 9 de Dezembro
    {
      titulo: "Brinquedos e food trucks",
      de: "2026-12-01", ate: "2026-12-23", inicio: "14:00", fim: "22:00",
      // dias com horário diferente do resto do período
      excecoes: { "2026-12-01": { inicio: "18:00", fim: "22:00" } },
      local: "praca-nove-de-dezembro", categoria: "criancas",
      descricao: "Brinquedos para crianças de até 12 anos e food trucks na praça. No primeiro dia, 1º de dezembro, das 18h às 22h; nos demais, das 14h às 22h. A previsão é ter chapéu mexicano e aviões."
    },

    // Casa do Papai Noel
    {
      titulo: "Abertura da Casa do Papai Noel",
      data: "2026-12-04", inicio: "18:00",
      local: "casa-papai-noel", categoria: "criancas",
      descricao: "Abertura da Casa do Papai Noel, no Centro de Artes Iracema Trinco Ribeiro."
    },
    {
      titulo: "Casa do Papai Noel",
      de: "2026-12-05", ate: "2026-12-23", inicio: "18:00", fim: "22:00",
      local: "casa-papai-noel", categoria: "criancas",
      descricao: "O Papai Noel recebe as visitas na Casa do Papai Noel, no Centro de Artes, todos os dias."
    },

    // Câmara Municipal (sessões solenes, na OAB)
    {
      titulo: "Sessão solene de entrega dos títulos de Cidadão Honorário e Cidadão Benemérito",
      data: "2026-12-02", inicio: "19:00",
      local: "oab-guarapuava", categoria: "solene",
      descricao: "Sessão solene da Câmara Municipal de Guarapuava."
    },
    {
      titulo: "Sessão solene de premiação do evento “Jovens Sementes do Amanhã”",
      data: "2026-12-03", inicio: "19:00",
      local: "oab-guarapuava", categoria: "solene",
      descricao: "Sessão solene da Câmara Municipal de Guarapuava."
    },
    {
      titulo: "Sessão solene em homenagem póstuma ao Padre Chagas (ALAC)",
      data: "2026-12-04", inicio: "19:00",
      local: "oab-guarapuava", categoria: "solene",
      descricao: "Sessão solene da Câmara Municipal de Guarapuava."
    },

    {
      titulo: "Corrida Circuito ACIG Jovem",
      data: "2026-12-05", inicio: "18:00",
      local: "casa-papai-noel", categoria: "esporte",
      descricao: "Largada em frente à Casa do Papai Noel, no Centro de Artes."
    },
    {
      titulo: "Feira Natalina de Entre Rios (Weihnachtsmarkt)",
      data: "2026-12-05", inicio: "15:30", fim: "20:00",
      local: "centro-eventos-agraria", categoria: "feira",
      descricao: "Apresentações culturais, artesanato e praça de alimentação, num clima de mercado de Natal. Acessível em Libras. Apresentação do Ministério da Cultura e da Fundação Cultural Suábio-Brasileira. Entrada gratuita."
    },

    // 9 de dezembro, aniversário da cidade
    {
      titulo: "Recreação no Parque do Lago",
      data: "2026-12-09", inicio: "13:30", fim: "17:00",
      local: "parque-do-lago", categoria: "criancas",
      descricao: "Atividades de recreação com a Secretaria de Esporte."
    },
    {
      titulo: "Transladação das cinzas do Padre Chagas",
      data: "2026-12-09", inicio: "16:00",
      local: "praca-nove-de-dezembro", categoria: "solene",
      descricao: "Rito solene na Praça 9 de Dezembro, seguido de Santa Missa."
    },
    {
      id: "coral-dos-anjos", destaque: true,
      titulo: "Coral dos Anjos",
      data: "2026-12-09", inicio: "19:00", rotuloHorario: "A partir das 19h · apresentação às 20h",
      local: "parque-do-lago", categoria: "musica",
      descricao: "Apresentação do Coral dos Anjos em comemoração ao aniversário de Guarapuava. O coral começa a cantar às 20h."
    },

    {
      titulo: "Prêmio Lobo Guará",
      data: "2026-12-12",
      local: "local-a-confirmar", categoria: "solene",
      descricao: "Premiação da Secretaria de Inovação."
    },

    // Lagoa das Lágrimas
    {
      titulo: "Recreação na Lagoa das Lágrimas",
      de: "2026-12-17", ate: "2026-12-22", inicio: "18:00", fim: "22:00",
      local: "lagoa-das-lagrimas", categoria: "criancas",
      descricao: "Atividades de recreação à beira da lagoa, todas as noites."
    },
    {
      titulo: "Carreta do SESI: apresentações culturais",
      de: "2026-12-17", ate: "2026-12-22", inicio: "18:00", fim: "22:00",
      local: "lagoa-das-lagrimas", categoria: "musica",
      descricao: "Apresentações culturais na Carreta do SESI, com food trucks, todas as noites na Lagoa das Lágrimas."
    },
    {
      titulo: "Futevôlei com atletas profissionais",
      data: "2026-12-19",
      local: "praca-ucrania", categoria: "esporte",
      descricao: "Futevôlei com atletas profissionais de todo o país, na Praça da Ucrânia. Horário a confirmar."
    },

    // Teatro Municipal Marina Karam Primak
    {
      titulo: "Natal em Harmonia: Feira do Yelulu",
      data: "2026-11-24", inicio: "10:00", fim: "22:00",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Feira aberta à comunidade."
    },
    {
      titulo: "O Quebra-Nozes e os Quatro Reinos",
      data: "2026-11-28", inicio: "16:00", rotuloHorario: "16h e 20h",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Espetáculo do Grupo SE, em duas sessões."
    },
    {
      titulo: "O Quebra-Nozes e os Quatro Reinos: sessão de acessibilidade",
      data: "2026-11-29",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Dia de acessibilidade, com ingressos doados a instituições sociais."
    },
    {
      titulo: "Recital do Coral Municipal Maestro Antônio Silvino Turco: Nossos Pais, Volume II",
      data: "2026-12-16", inicio: "18:30", rotuloHorario: "18h30 e 20h30",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Recital em duas sessões. Entrada gratuita."
    },
    {
      titulo: "Concerto “As Quatro Estações”",
      data: "2026-12-17", inicio: "20:00",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Entrada gratuita."
    },
    {
      titulo: "Concerto de Natal com Light Simphony",
      data: "2026-12-18", inicio: "20:00",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Concerto de Natal no Teatro Municipal."
    },
    {
      titulo: "Joy Espetáculo de Natal",
      data: "2026-12-19", inicio: "16:00", rotuloHorario: "16h e 20h",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Espetáculo de Natal da Igreja Comunidade Vida, em duas sessões."
    },
    {
      titulo: "Joy Espetáculo de Natal",
      data: "2026-12-20", inicio: "16:00",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Espetáculo de Natal da Igreja Comunidade Vida."
    },
    {
      titulo: "Peça “Lembranças de Natal”",
      data: "2026-12-21", inicio: "19:30",
      local: "teatro-municipal", categoria: "teatro",
      descricao: "Apresentação da Igreja Presbiteriana."
    }
  ],

  /* Atividades ainda sem data — aparecem em "Também vem aí", abaixo da agenda.
     Quando a data for confirmada, mova o item para a lista "eventos". */
  semData: [],

  /* Novidades — aparecem em "Novidades", a mais recente primeiro.
     Para dar uma notícia nova, acrescente um item no topo da lista.
     "link" e "rotuloLink" são opcionais (ex.: "#programacao", "#coral"). */
  // Seção "Novidades" desligada a pedido (lista vazia esconde a seção e o link do menu).
  novidades: [],

  /* Varal de postais — ilustrações em aquarela penduradas entre a Programação e os Lugares.
     As imagens ficam em assets/img/postais/: "arquivo.webp" (grande, para o zoom) e "arquivo-p.webp" (miniatura).
     "titulo" aparece embaixo do postal ampliado; "descricao" é o texto para leitores de tela. */
  varal: {
    titulo: "Postais do Natal",
    texto: "Guarapuava iluminada, pintada em aquarela. Toque num postal para ver de perto.",
    postais: [
      { arquivo: "postal-letreiro-feliz-natal", titulo: "Feliz Natal em luzes",
        descricao: "Postal em aquarela: letreiro gigante “Feliz Natal” em luzes vermelhas, com uma estrela branca no meio, ao anoitecer." },
      { arquivo: "postal-arcos-lago", titulo: "Arcos de luz à beira do lago",
        descricao: "Postal em aquarela: arcos vermelhos iluminados e bolas de Natal gigantes no gramado, à beira de um lago, ao entardecer." },
      { arquivo: "postal-casa-feliz-natal", titulo: "Casa do Papai Noel",
        descricao: "Postal em aquarela da Casa do Papai Noel: casa de telhado pontudo coberta de luzes, com uma bengala doce gigante e um arco “Feliz Natal” na entrada." },
      { arquivo: "postal-fontes-lago", titulo: "Fontes iluminadas",
        descricao: "Postal em aquarela: fontes iluminadas no meio de um lago, com as luzes refletidas na água ao anoitecer." },
      { arquivo: "postal-presentes", titulo: "Presentes de luz",
        descricao: "Postal em aquarela: caixas de presente gigantes feitas de luzes azuis, vermelhas e brancas, num gramado entre árvores." },
      { arquivo: "postal-praca-arvores", titulo: "Praça das árvores acesas",
        descricao: "Postal em aquarela: praça arborizada com árvores iluminadas em vermelho e dourado e postes acesos ao longo do caminho." }
    ]
  },

  /* Enfeites e luzes de 2026 — seção "A cidade já acendeu" (menu "Luzes").
     Cada item de "lugares" vira um bloco com fotos, etiquetas e informações.
     Para acrescentar um lugar novo, copie o item da Casa do Papai Noel e troque os dados.
     "local" é o id do lugar na lista "locais" (usa o endereço, o mapa e as atrações da programação).
     As fotos ficam em assets/img/decoracao/: "arquivo.webp" (grande) e "arquivo-p.webp" (miniatura).
     A primeira foto é a principal (de preferência horizontal); a segunda entra menor, por cima.
     "icone" das informações: "relogio", "agenda", "pino" ou "estrela".
     Deixe "lugares" vazio para esconder a seção. */
  decoracao: {
    sobre: "Enfeites e luzes de 2026",
    titulo: "A cidade já acendeu",
    texto: "Desde 15 de novembro, a decoração de Natal fica acesa todas as noites. Aqui estão os enfeites e as luzes deste ano, lugar por lugar.",
    lugares: [
      {
        local: "casa-papai-noel",
        nome: "Casa do Papai Noel",
        chamada: "No Centro de Artes, atrás do Carneiro Martins",
        texto: "Um arco de Feliz Natal entre duas bengalas gigantes recebe quem chega. No gramado, estrelas, árvores e bonecos de luz; no telhado, cascatas de luzinhas. A casa fica acesa todas as noites e, a partir de 4 de dezembro, o Papai Noel recebe as visitas aqui.",
        enfeites: ["Arco Feliz Natal", "Bengalas gigantes", "Bonecos de luz", "Estrelas", "Cascatas no telhado"],
        info: [
          { icone: "estrela", texto: "Acesa todas as noites" },
          { icone: "agenda",  texto: "Abertura em 4 de dezembro, às 18h" },
          { icone: "relogio", texto: "Papai Noel de 5 a 23 de dezembro, das 18h às 22h" }
        ],
        carimbo: { centro: "ACESA", baixo: "15 NOV" },
        fotos: [
          { arquivo: "casa-papai-noel-01", largura: 1200, altura: 675, descricao: "Casa do Papai Noel iluminada à noite, com o arco de Feliz Natal entre duas bengalas gigantes de luz" },
          { arquivo: "casa-papai-noel-02", largura: 720,  altura: 900, descricao: "Bengala gigante de luz, estrelas e bonecos iluminados no gramado em frente à Casa do Papai Noel" }
        ]
      }
    ]
  },

  /* Gerador de postal — seção "Mande um postal de Natal" (menu "Postal").
     Tudo é montado no aparelho de quem usa: nada é enviado nem guardado.
     "frentes": imagens que a pessoa pode escolher para a frente do postal ("miniatura" é opcional: imagem leve para a lista de escolha).
     "frases": recados prontos (até 140 caracteres).
     "assinatura": mensagem da Prefeitura que sai no rodapé do postal.
     Deixe postal: null para esconder a seção. */
  postal: {
    texto: "Escolha um lugar da cidade, um selo e escreva um recado para quem você gosta. Se quiser, coloque uma foto sua. O postal sai pronto para mandar no WhatsApp, postar no story ou imprimir.",
    instagram: "@guarapuava_pref",
    assinatura: "Que o seu Natal acenda junto com a cidade.",
    assinaturaLinha2: "A Prefeitura de Guarapuava te deseja um Feliz Natal!",
    frentes: [
      { imagem: "assets/img/postal-arvore.webp",       nome: "Praça Nove de Dezembro" },
      { imagem: "assets/img/postal-parque-lago.webp",  nome: "Parque do Lago" },
      { imagem: "assets/img/postal-lagoa.webp",        nome: "Lagoa das Lágrimas" },
      { imagem: "assets/img/postal-ponte-cidade.webp", nome: "Parque do Lago" },
      { imagem: "assets/img/coral-postal.webp",        nome: "Coral dos Anjos" },
      { imagem: "assets/img/postais/postal-letreiro-feliz-natal.webp", miniatura: "assets/img/postais/postal-letreiro-feliz-natal-p.webp", nome: "Feliz Natal em luzes" },
      { imagem: "assets/img/postais/postal-arcos-lago.webp",           miniatura: "assets/img/postais/postal-arcos-lago-p.webp",           nome: "Arcos de luz" },
      { imagem: "assets/img/postais/postal-casa-feliz-natal.webp",     miniatura: "assets/img/postais/postal-casa-feliz-natal-p.webp",     nome: "Casa do Papai Noel" },
      { imagem: "assets/img/postais/postal-fontes-lago.webp",          miniatura: "assets/img/postais/postal-fontes-lago-p.webp",          nome: "Fontes iluminadas" },
      { imagem: "assets/img/postais/postal-presentes.webp",            miniatura: "assets/img/postais/postal-presentes-p.webp",            nome: "Presentes de luz" },
      { imagem: "assets/img/postais/postal-praca-arvores.webp",        miniatura: "assets/img/postais/postal-praca-arvores-p.webp",        nome: "Árvores acesas" }
    ],
    selos: ["catedral", "gralha-azul", "araucaria", "pinhao", "casa", "raposa", "beija-flor", "cachoeira", "portal", "postes", "estrutura", "floco"],
    frases: [
      "Guarapuava acendeu e eu lembrei de você. Vem ver as luzes comigo?",
      "Que a sua casa fique cheia de luz, de abraço e de gente querida neste Natal.",
      "Quando a tarde cai, a cidade acende. E o meu Natal fica mais bonito com você por perto.",
      "Um abraço quentinho daqui de Guarapuava. Feliz Natal!"
    ]
  },

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
      resposta: "As atrações ao ar livre são abertas ao público. No Teatro Municipal, confira cada apresentação: quando a entrada é gratuita, a agenda avisa."
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
