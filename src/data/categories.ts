export interface CategoryData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  words: string[];
}

export const CATEGORIES: CategoryData[] = [
  {
    id: 'sistema_solar',
    title: 'Sistema Solar & Planetas',
    description: 'Sol, órbitas, luas e os planetas que orbitam nossa estrela',
    iconName: 'Sun',
    words: [
      'SOL', 'MERCÚRIO', 'VÊNUS', 'TERRA', 'MARTE',
      'JÚPITER', 'SATURNO', 'URANO', 'NETUNO', 'PLUTÃO',
      'ÓRBITA', 'GRAVIDADE', 'ATMOSFERA', 'ROTACAO', 'TRANSLACAO',
      'ECLÍPTICA', 'CORONA', 'HELIOSFERA', 'PLANETA', 'ASTRÔNOMO',
      'MAGNETOSFERA', 'VENTO SOLAR', 'DIA', 'NOITE', 'EQUINÓCIO',
      'SOLSTÍCIO', 'EIXO', 'PERIÉLIO', 'AFÉLIO', 'SISTEMA'
    ]
  },
  {
    id: 'lua',
    title: 'A Lua & Satélites',
    description: 'Mares de regolito, fases lunares e crateras celestes',
    iconName: 'Moon',
    words: [
      'LUA CHEIA', 'CRESCENTE', 'MINGUANTE', 'LUA NOVA', 'CRATERA',
      'REGOLITO', 'MARÉ ALTA', 'ECLIPSE', 'APOLO', 'ALUNISSAGEM',
      'GRAVIDADE', 'SATÉLITE', 'ORBITAL', 'LADO OCULTO', 'MARES LUNARES',
      'TRANQUILIDADE', 'PÓ LUNAR', 'BASALTO', 'REFLEXO', 'NOITE'
    ]
  },
  {
    id: 'marte',
    title: 'Marte & O Planeta Vermelho',
    description: 'Olympus Mons, Valles Marineris e rovers de exploração',
    iconName: 'Flame',
    words: [
      'MARTE', 'MONTE OLIMPO', 'PERSEVERANCE', 'CURIOSITY', 'ROVER',
      'ÓXIDO DE FERRO', 'VALES', 'CALOTA POLAR', 'FOBOS', 'DEIMOS',
      'CRATERA GALE', 'DUNAS', 'ATMOSFERA', 'ROCHAS', 'EXPLORAÇÃO',
      'AERÓLITO', 'DESERTO', 'SOLO RUBRO', 'SONDA', 'MISSÃO'
    ]
  },
  {
    id: 'asteroides',
    title: 'Cinturão de Asteroides',
    description: 'Ceres, Vesta, fragmentos e cometas primitivos',
    iconName: 'Compass',
    words: [
      'ASTEROIDE', 'CERES', 'VESTA', 'PALLAS', 'HIGIA',
      'METEORITO', 'METEORO', 'CRATERA', 'COLISÃO', 'ORBITA',
      'FRAGMENTO', 'CONDRO', 'NÍQUEL', 'FERRO', 'ESPACIAL',
      'DETRITOS', 'TRAJETÓRIA', 'IMPACTO', 'MINERAÇÃO', 'CINTURÃO'
    ]
  },
  {
    id: 'jupiter',
    title: 'Júpiter & Os Gigantes',
    description: 'A Grande Mancha Vermelha, ventos e tempestades colossais',
    iconName: 'Sparkles',
    words: [
      'JÚPITER', 'GRANDE MANCHA', 'EUROPA', 'GANIMEDES', 'CALISTO',
      'IO', 'VULCÕES', 'CICLONE', 'HIDROGÊNIO', 'HÉLIO',
      'AURORA', 'CAMPO MAGNÉTICO', 'GASOSO', 'RADIAÇÃO', 'JUNO',
      'GALILEU', 'PRESSÃO', 'NUVENS', 'FAIXAS', 'VÓRTICE'
    ]
  },
  {
    id: 'saturno',
    title: 'Saturno & Anéis Celestes',
    description: 'A beleza dos anéis de gelo e as luas fascinantes',
    iconName: 'Sparkles',
    words: [
      'SATURNO', 'ANÉIS', 'TITÃ', 'ENCÉLADO', 'MIMAS',
      'DIVISÃO CASSINI', 'GELO', 'METANO', 'CASSINI', 'HUYGENS',
      'HEXÁGONO', 'GASOSO', 'ÓRBITA', 'DENSIDADE', 'PASTORA',
      'PARTÍCULAS', 'BRILHO', 'ATMOSFERA', 'SOMBRA', 'ESPACIAL'
    ]
  },
  {
    id: 'gigantes_gelo',
    title: 'Urano & Netuno de Gelo',
    description: 'Mundos azul-cobalto e ventos supersônicos',
    iconName: 'Waves',
    words: [
      'URANO', 'NETUNO', 'TRITÃO', 'METANO', 'AZUL',
      'GELADO', 'VENTO FORTE', 'ANÉIS ESCUROS', 'VOYAGER', 'INCLINAÇÃO',
      'DIAMANTES', 'ATMOSFERA', 'PRESSÃO', 'EXTREMO', 'AURORAS',
      'NUVENS BRANCAS', 'ÓRBITA LONGA', 'FRIO', 'DISTÂNCIA', 'SISTEMA'
    ]
  },
  {
    id: 'kuiper',
    title: 'Cinturão de Kuiper & Plutão',
    description: 'Plutão, Caronte e a fronteira do sistema solar',
    iconName: 'Compass',
    words: [
      'PLUTÃO', 'CARONTE', 'KUIPER', 'MAKEMAKE', 'HAUMEA',
      'ÉRIS', 'SEDNA', 'GELO DE NITROGÊNIO', 'NEW HORIZONS', 'CORAÇÃO',
      'MONTANHAS DE GELO', 'ANÃO', 'ESCURIDÃO', 'FRONTEIRA', 'ÓRBITA',
      'DISTÂNCIA', 'SOL PÁLIDO', 'SISTEMA DUPLO', 'ESPACIAL', 'INFINITO'
    ]
  },
  {
    id: 'orion',
    title: 'Constelação de Órion',
    description: 'As Três Marias, Betelgeuse e o caçador celeste',
    iconName: 'Sparkles',
    words: [
      'ÓRION', 'BETELGEUSE', 'RIGEL', 'BELLATRIX', 'SAIPH',
      'ALNITAK', 'ALNILAM', 'MINTAKA', 'TRÊS MARIAS', 'CINTURÃO',
      'CAÇADOR', 'CONSTELAÇÃO', 'ESTRELA', 'BRILHO', 'CÉU NOTURNO',
      'ASTRONOMIA', 'MITOLOGIA', 'GIGANTE', 'AZUL', 'VERMELHA'
    ]
  },
  {
    id: 'nebulosa_orion',
    title: 'Nebulosa M42 de Órion',
    description: 'Berçário de novas estrelas e poeira interestelar',
    iconName: 'Sparkles',
    words: [
      'NEBULOSA', 'BERÇÁRIO', 'HIDROGÊNIO', 'TRAPÉZIO', 'POEIRA',
      'GÁS CÓSMICO', 'PROTOESTRELA', 'ULTRAVIOLETA', 'EMISSÃO', 'REFLEXÃO',
      'LUMINOSIDADE', 'TELESCÓPIO', 'HUBBLE', 'JAMES WEBB', 'COR',
      'VIOLETA', 'MAGENTA', 'NASCIMENTO', 'GRAVITAÇÃO', 'MATÉRIA'
    ]
  },
  {
    id: 'cruzeiro_sul',
    title: 'Cruzeiro do Sul & Estrelas Guia',
    description: 'Símbolo celeste do hemisfério sul e suas constelações',
    iconName: 'Compass',
    words: [
      'CRUZEIRO DO SUL', 'ACRUX', 'GACRUX', 'MIMOSA', 'INTROMETIDA',
      'SACO DE CARVÃO', 'CENTAURO', 'ALFA CENTAURI', 'PRÓXIMA', 'GUIA',
      'NAVEGAÇÃO', 'CÉU DO SUL', 'ASTRÔNOMOS', 'CONSTELAÇÃO', 'BRILHANTE',
      'ESTRELA POLAR', 'NOITE', 'CÉU LIMPO', 'HORIZONTE', 'AURORA'
    ]
  },
  {
    id: 'supergigantes',
    title: 'Estrelas Supergigantes',
    description: 'Monstros celestes com diâmetros colossais',
    iconName: 'Flame',
    words: [
      'SUPERGIGANTE', 'BETELGEUSE', 'ANTARES', 'UY SCUTI', 'VY CANIS',
      'RIGEL', 'DENEB', 'PISTOLA', 'FUSÃO NUCLEAR', 'CARBONO',
      'OXIGÊNIO', 'NÚCLEO', 'RADIAÇÃO', 'VENTO ESTELAR', 'FIM DA VIDA',
      'MAGNITUDE', 'LUMINOSIDADE', 'ESPECTRO', 'ASTRONOMIA', 'ENERGIA'
    ]
  },
  {
    id: 'supernovas',
    title: 'Supernovas & Clarões',
    description: 'O espetáculo do colapso e nascimento dos elementos',
    iconName: 'Sparkles',
    words: [
      'SUPERNOVA', 'EXPLOSÃO', 'COLAPSO', 'NÚCLEO', 'ONDA DE CHOQUE',
      'CARANGUEJO', 'REMANESCENTE', 'ELEMENTOS', 'FERRO', 'OURO',
      'PLATINA', 'URÂNIO', 'BRILHO MÁXIMO', 'LUZ CÓSMICA', 'POEIRA',
      'NEUTRINOS', 'TITÂNIO', 'EXPANSÃO', 'DESCOBERTA', 'TRANSFORMAÇÃO'
    ]
  },
  {
    id: 'pulsares',
    title: 'Estrelas de Nêutrons & Pulsares',
    description: 'Os relógios mais precisos do universo e magnetars',
    iconName: 'Zap',
    words: [
      'PULSAR', 'ESTRELA DE NÊUTRONS', 'MAGNETAR', 'ROTAÇÃO', 'FEIXE',
      'RÁDIO', 'DENSIDADE', 'CAMPO MAGNÉTICO', 'RELÓGIO CÓSMICO', 'EMISSÃO',
      'GRAVIDADE EXTREMA', 'ENERGIA', 'COLAPSO', 'FAROL', 'QUÂNTICO',
      'MILISSEGUNDO', 'PRESSÃO', 'NÊUTRON', 'PERÍODO', 'SINAL'
    ]
  },
  {
    id: 'buracos_negros',
    title: 'Buracos Negros & Singularidade',
    description: 'Onde o tempo desacelera e a gravidade é absoluta',
    iconName: 'Moon',
    words: [
      'BURACO NEGRO', 'HORIZONTE DE EVENTOS', 'SINGULARIDADE', 'ACREÇÃO', 'RELATIVIDADE',
      'EINSTEIN', 'HAWKING', 'RADIAÇÃO', 'GRAVIDADE', 'ESPAÇO-TEMPO',
      'DISCO', 'JATOS', 'SPAGHETTIFICAÇÃO', 'FÓTON', 'SUPERMASSIVO',
      'SAGITÁRIO', 'CURVATURA', 'LUZ PRESA', 'EQUAÇÃO', 'MISTÉRIO'
    ]
  },
  {
    id: 'via_lactea',
    title: 'O Centro da Via Láctea',
    description: 'Braços espirais e o coração da nossa galáxia',
    iconName: 'Sparkles',
    words: [
      'VIA LÁCTEA', 'SAGITÁRIO A', 'BRAÇO DE ÓRION', 'PERSEU', 'CENTAURO',
      'BULBO', 'DISCO GALÁCTICO', 'HALO', 'ESTRELAS', 'BILHÕES',
      'ROTAÇÃO', 'CENTRO', 'POEIRA CÓSMICA', 'INFRAVERMELHO', 'BURACO NEGRO',
      'GALÁXIA ESPIRAL', 'NOSSO LAR', 'CÉU ESTRELADO', 'ASTRONOMIA', 'UNIVERSO'
    ]
  },
  {
    id: 'andromeda',
    title: 'Galáxia de Andrômeda',
    description: 'Nossa vizinha cósmica majestosa com 1 trilhão de estrelas',
    iconName: 'Sparkles',
    words: [
      'ANDRÔMEDA', 'MESSIER 31', 'GALÁXIA VIZINHA', 'ESPIRAL', 'NÚCLEO DUPLO',
      'TRILHÃO', 'COLISÃO FUTURA', 'HALO', 'SATÉLITES', 'ASTRONOMIA',
      'AQUISIÇÃO', 'BRAÇOS', 'SUPERNOVAS', 'AGLOMERADOS', 'DISTÂNCIA',
      'ANOS-LUZ', 'VELOCIDADE', 'FUSÃO', 'CÉU PROFUNDO', 'ESPACIAL'
    ]
  },
  {
    id: 'exoplanetas',
    title: 'Exoplanetas Habitáveis',
    description: 'Mundos que orbitam outras estrelas em busca de vida',
    iconName: 'Compass',
    words: [
      'EXOPLANETA', 'ZONA HABITÁVEL', 'KEPLER', 'JAMES WEBB', 'TRAPPIST',
      'PROXIMA B', 'SUPER-TERRA', 'TRANSITO', 'ATMOSFERA', 'ÁGUA LÍQUIDA',
      'ESTRELA-MÃE', 'ANÃ VERMELHA', 'ÓRBITA', 'BIOSFERA', 'ESPECTROSCOPIA',
      'GRAVIDADE', 'DESCOBERTA', 'OCEANO', 'VIDA', 'FRONTEIRA'
    ]
  },
  {
    id: 'quasares',
    title: 'Quasares & Faróis do Infinito',
    description: 'Os núcleos galácticos mais energéticos e brilhantes do cosmos',
    iconName: 'Zap',
    words: [
      'QUASAR', 'NÚCLEO ATIVO', 'JATOS DE PLASMA', 'RELATIVÍSTICO', 'ENERGIA',
      'BURACO NEGRO', 'ALIMENTAÇÃO', 'RADIAÇÃO', 'LUMINOSIDADE', 'DISTANTE',
      'UNIVERSO JOVEM', 'ESPECTRO', 'GASES', 'VELOCIDADE DA LUZ', 'ASTRONOMIA',
      'BRILHO CELESTE', 'COSMOLOGIA', 'FAROL CÓSMICO', 'POTÊNCIA', 'MAGNITUDE'
    ]
  },
  {
    id: 'universo_infinito',
    title: 'O Horizonte Infinito das Palavras',
    description: 'O ápice da jornada cósmica onde todo o conhecimento se une',
    iconName: 'Trophy',
    words: [
      'UNIVERSO', 'COSMOS', 'INFINITO', 'GALÁXIA', 'ESTRELA',
      'SABEDORIA', 'CONHECIMENTO', 'HORIZONTE', 'BIG BANG', 'ENERGIA',
      'MATÉRIA', 'LUZ', 'HARMONIA', 'ASTRONOMIA', 'DESCOBERTA',
      'GRAVIDADE', 'ESPAÇO-TEMPO', 'DIMENSÃO', 'PALAVRAS', 'VITÓRIA'
    ]
  },
  {
    id: 'frutas',
    title: 'Frutas Tropicais',
    description: 'Sabores tropicais e frutas nativas do Brasil',
    iconName: 'Apple',
    words: [
      'AÇAÍ', 'CUPUAÇU', 'JABUTICABA', 'GRAVIOLA', 'CAJU',
      'PITANGA', 'MARACUJÁ', 'GOIABA', 'MANGA', 'ABACAXI',
      'PITOMBA', 'CAJÁ', 'ACEROLA', 'BACURI', 'GUARANÁ',
      'BURITI', 'CAMU-CAMU', 'MURICI', 'PEQUI', 'UMBU',
      'BANANA', 'MELANCIA', 'MAMÃO', 'CARAMBOLA', 'FIGO',
      'JENIPAPO', 'MANGABA', 'SERIGUELA', 'BIRIBÁ', 'CAMBUCI',
      'BACUPARI', 'UVAIA', 'ABIU', 'ARAÇÁ', 'SAPOTI',
      'JACA', 'TAMARINDO', 'INGÁ', 'GUABIROBA', 'JERICÓ'
    ]
  },
  {
    id: 'animais',
    title: 'Fauna Brasileira',
    description: 'Animais emblemáticos dos nossos biomas',
    iconName: 'PawPrint',
    words: [
      'ONÇA-PINTADA', 'CAPIVARA', 'ARARA AZUL', 'MICO-LEÃO', 'TAMANDUÁ',
      'TATU-BOLA', 'TUCANO', 'BOTO ROSA', 'PREGUIÇA', 'JACARÉ',
      'JIBOIA', 'LOBO-GUARÁ', 'QUATI', 'ANTA', 'JAGUATIRICA',
      'SUÇUARANA', 'CUTIA', 'SAGUI', 'PAPAGAIO', 'CORUJA',
      'GOLFINHO', 'BALEIA', 'TARTARUGA', 'GAVIÃO', 'GARÇA',
      'HARPIA', 'IRARA', 'CERVO', 'TEIÚ', 'MUTUM',
      'PREÁ', 'SERIEMA', 'JABUTI', 'SUCURI', 'COLIBRI',
      'GUAXINIM', 'VEADO', 'URUTAU', 'PACA', 'ARIRANHA'
    ]
  },
  {
    id: 'natureza',
    title: 'Amazônia & Biomas',
    description: 'Florestas, rios majestosos e paisagens naturais',
    iconName: 'Trees',
    words: [
      'FLORESTA', 'PANTANAL', 'CACHOEIRA', 'RIO AMAZONAS', 'PLANALTO',
      'VAGA-LUME', 'CERRADO', 'MATA ATLÂNTICA', 'MANGUEZAL', 'VEREDA',
      'CAATINGA', 'GRUTA', 'CHAPADA', 'IGAPÓ', 'SERRA DO MAR',
      'IGARAPÉ', 'ARARIPE', 'RESTINGA', 'VITÓRIA-RÉGIA', 'ORQUÍDEA',
      'PAMPA', 'ENCONTRO DAS ÁGUAS', 'SERRA DA CANASTRA', 'CANUDOS', 'JALAPÃO',
      'LENÇÓIS', 'BONITO', 'CORREDEIRA', 'NASCENTE', 'BROMÉLIA',
      'IPÊ AMARELO', 'SERRANIA', 'PINHEIRO', 'ARAUCÁRIA', 'ABISMO'
    ]
  },
  {
    id: 'praia',
    title: 'Litoral & Praias',
    description: 'Areia dourada, mar azul e brisa costeira',
    iconName: 'Sun',
    words: [
      'AREIA', 'ONDA', 'MAR', 'CONCHA', 'GUARDA-SOL',
      'CANGA', 'ÁGUA DE COCO', 'PRANCHA', 'CALÇADÃO', 'MARESIA',
      'SALVA-VIDAS', 'BRISA', 'CASTELO', 'DUNA', 'FAROL',
      'PROTETOR', 'ÓCULOS', 'SURFISTA', 'QUIOSQUE', 'MERGULHO',
      'CHINELO', 'PÔR DO SOL', 'CORAIS', 'MARÉ ALTA', 'BANHO DE MAR',
      'COQUEIRO', 'ARPOADOR', 'COPACABANA', 'IPANEMA', 'PORTO DE GALINHAS',
      'NORONHA', 'ILHABELA', 'PIPA', 'JERI', 'TRANCOSO'
    ]
  },
  {
    id: 'cultura_brasileira',
    title: 'Sertão & Raízes',
    description: 'Folclore, forró, cordel e calor do nordeste',
    iconName: 'Flame',
    words: [
      'CORDEL', 'CAPOEIRA', 'BOI-BUMBÁ', 'FESTA JUNINA', 'CIRANDA',
      'MACULELÊ', 'VIOLA', 'SACI', 'CURUPIRA', 'IARA',
      'ARTESANATO', 'REPENTE', 'CARRANCA', 'LITERATURA', 'BERIMBAU',
      'PARINTINS', 'BONECOS', 'FANDANGO', 'CATIRA', 'FORRÓ',
      'SANFONA', 'ZABUMBA', 'TRIÂNGULO', 'XAXADO', 'BAIÃO',
      'LUA CHEIA', 'GIBÃO', 'CANGAÇO', 'LAMPIÃO', 'BONITO'
    ]
  },
  {
    id: 'cidades',
    title: 'Cidades Históricas',
    description: 'Patrimônio colonial, ladeiras e arquitetura secular',
    iconName: 'Landmark',
    words: [
      'OURO PRETO', 'PARATY', 'GRAMADO', 'PETRÓPOLIS', 'OLINDA',
      'CAMPINAS', 'SANTOS', 'NITERÓI', 'LONDRINA', 'MARINGÁ',
      'BÚZIOS', 'ILHÉUS', 'FOZ DO IGUAÇU', 'TIRADENTES', 'CANELA',
      'BONITO', 'BLUMENAU', 'ANGRA', 'DIAMANTINA', 'ALTER DO CHÃO',
      'MARIANA', 'CONGONHAS', 'SÃO JOÃO DEL REI', 'ALCÂNTARA', 'LENÇÓIS'
    ]
  },
  {
    id: 'carnaval',
    title: 'Carnaval & Samba',
    description: 'A maior celebração do mundo com ritmos vibrantes',
    iconName: 'Sparkles',
    words: [
      'FANTASIA', 'SAMBA', 'SAMBÓDROMO', 'SERPENTINA', 'CONFETE',
      'BLOCO', 'BATERIA', 'MESTRE-SALA', 'PORTA-BANDEIRA', 'ALEGORIA',
      'ESTANDARTE', 'CORDÃO', 'TAMBORIM', 'CUÍCA', 'AGOGÔ',
      'MARACATU', 'FREVO', 'TRIO ELÉTRICO', 'ABADÁ', 'PASSISTA',
      'ENREDO', 'CARRO', 'PANDEIRO', 'REPIQUE', 'SURDO'
    ]
  },
  {
    id: 'futebol',
    title: 'Paixão Futebol',
    description: 'O país do futebol, ídolos e jogadas mágicas',
    iconName: 'Trophy',
    words: [
      'GOL', 'TORCIDA', 'DRIBLE', 'ESCANTEIO', 'PÊNALTI',
      'ZAGUEIRO', 'CAMISA DEZ', 'TROFÉU', 'ESTÁDIO', 'APITO',
      'CHUTEIRA', 'GOLEIRO', 'BANDEIRINHA', 'PASSE', 'GRAMADO',
      'CANETA', 'CHAPÉU', 'BICICLETA', 'ARTILHEIRO', 'ARBITRAGEM',
      'MARACANÃ', 'CRAQUE', 'CANELITO', 'TABELA', 'PRORROGAÇÃO'
    ]
  },
  {
    id: 'pampas',
    title: 'Culinária dos Pampas',
    description: 'Churrasco, chimarrão e tradição do sul',
    iconName: 'Flame',
    words: [
      'CHURRASCO', 'CHIMARRÃO', 'COSTELA', 'PICANHA', 'ESPETO',
      'CUIA', 'BOMBA', 'FARROUPILHA', 'GAÚCHO', 'PONCHO',
      'FANDANGO', 'GALPÃO', 'CAMPANHA', 'BOLEADEIRA', 'ERVA-MATE',
      'CHARQUE', 'ARROZ DE CARRETEIRO', 'MATAMBRE', 'LINGUIÇA', 'VINHO'
    ]
  },
  {
    id: 'dunas',
    title: 'Lençóis & Dunas',
    description: 'Oásis, ventos e lagoas de águas pluviais',
    iconName: 'Waves',
    words: [
      'DUNAS', 'LAGOAS', 'AREIA BRANCA', 'VENTANIA', 'OÁSIS',
      'ATINS', 'BARREIRINHAS', 'MANDACARU', 'RIO PREGUIÇAS', 'FAROL',
      'VENTOS', 'BARCO', 'CAMINHADA', 'PÔR DO SOL', 'MIRANTE',
      'ÁGUA DOCE', 'REFLEXO', 'SOL DOURADO', 'MARÉ', 'BUGGY'
    ]
  },
  {
    id: 'musica',
    title: 'Ritmos do Brasil',
    description: 'Bossa Nova, Choro, Samba-Rock e Axé',
    iconName: 'Music',
    words: [
      'BOSSA NOVA', 'CHORO', 'AXÉ', 'FORRÓ', 'PAGODE',
      'SAMBA-ROCK', 'BAIÃO', 'XOTE', 'MARACATU', 'FREVO',
      'CAVAQUINHO', 'VIOLÃO', 'PANDEIRO', 'TAMBOR', 'SANFONA',
      'ZABUMBA', 'BERIMBAU', 'ATABAQUE', 'GUITARRA BAIANA', 'SURDO'
    ]
  },
  {
    id: 'culinaria_baiana',
    title: 'Sabores da Bahia',
    description: 'Dendê, pimenta, acarajé e axé na mesa',
    iconName: 'Utensils',
    words: [
      'ACARAJÉ', 'VATAPÁ', 'CARURU', 'MOQUECA', 'ABARÁ',
      'AZEITE DE DENDÊ', 'PIMENTA', 'CAMARÃO SECO', 'BOBÓ', 'EFÓ',
      'SARAPATEL', 'COCADA', 'BEIJU', 'MANIÇOBA', 'TUCUPI',
      'LEITE DE COCO', 'CALDO DE SURURU', 'CASQUINHA', 'FAROFA', 'PIRÃO'
    ]
  },
  {
    id: 'culinaria_mineira',
    title: 'Minas de Ouro & Sabores',
    description: 'Fogão a lenha, cafezinho e queijo canastra',
    iconName: 'Utensils',
    words: [
      'PÃO DE QUEIJO', 'QUEIJO CANASTRA', 'FEIJÃO TROPEIRO', 'TUTU', 'TORRESMO',
      'DOCE DE LEITE', 'GOIABADA', 'FRANGO COM QUIABO', 'LEITOA', 'COSTELINHA',
      'BROA DE MILHO', 'CAFÉ COADO', 'PAMONHA', 'ANGU', 'COUVINHA',
      'FAROFA DE MILHO', 'CANJICA', 'DOCE DE FIGO', 'RAPADURA', 'CACHAÇA'
    ]
  },
  {
    id: 'noronha',
    title: 'Fernando de Noronha',
    description: 'Santuário marinho de águas cristalinas',
    iconName: 'Compass',
    words: [
      'GOLFINHO ROTADOR', 'TARTARUGA MARINHA', 'TUBARÃO LIXA', 'BAÍA DO SANCHO', 'MORRO DO PICO',
      'BAÍA DOS PORCOS', 'MERGULHO', 'CORAIS', 'ARQUIPÉLAGO', 'MIRANTE',
      'PRAIA DO LEÃO', 'ATALAIA', 'ÁGUA CRISTALINA', 'SNORKEL', 'BANCO DE AREIA',
      'CARDUME', 'PÔR DO SOL', 'BARCO', 'PRESERVAÇÃO', 'OCEANO'
    ]
  },
  {
    id: 'folclore',
    title: 'Folclore & Lendas',
    description: 'Mitos ancestrais e personagens do imaginário popular',
    iconName: 'Sparkles',
    words: [
      'SACI-PERERÊ', 'CURUPIRA', 'IARA', 'BOTO ROSA', 'CAIPORA',
      'MULA SEM CABEÇA', 'BOITATÁ', 'LOBISOMEM', 'NEGRINHO', 'VITÓRIA-RÉGIA',
      'COBRA GRANDE', 'MAPINGUARI', 'MATINTA PEREIRA', 'PISADEIRA', 'CORPO SECO',
      'ALAMOIA', 'CUCA', 'CABOCLO D’ÁGUA', 'MÃE DO OURO', 'UIRAPURU'
    ]
  },
  {
    id: 'jalapao',
    title: 'Jalapão Encantado',
    description: 'Fervedouros, dunas cor de ouro e capim dourado',
    iconName: 'Sun',
    words: [
      'FERVEDOURO', 'CAPIM DOURADO', 'DUNAS', 'SERRA DO ESPÍRITO SANTO', 'CACHOEIRA DA VELHA',
      'PRAINHA', 'BURITI', 'ÁGUA AZUL', 'CHAPADA', 'ARTESANATO',
      'MATEIROS', 'PONTE ALTA', 'EXPEDIÇÃO', 'SAFARI', 'CANAVIAL',
      'VEREDA', 'CANHÃO', 'PÔR DO SOL', 'ESTRADA DE TERRA', 'FLUTUAÇÃO'
    ]
  },
  {
    id: 'cataratas',
    title: 'Cataratas & Iguaçu',
    description: 'A força monumental das águas e arco-íris',
    iconName: 'Waves',
    words: [
      'GARGANTA DO DIABO', 'CATARATAS', 'ARCO-ÍRIS', 'PASSARELA', 'RIO IGUAÇU',
      'PARQUE NACIONAL', 'QUEDAS D’ÁGUA', 'BORRIFO', 'BARCO MACUCO', 'MATA ATLÂNTICA',
      'QUATI', 'BORBOLETÁRIO', 'MIRANTE', 'TRÍPLICE FRONTEIRA', 'BALSAS',
      'TURBULÊNCIA', 'NÉVOA', 'VOLUME', 'ESPETÁCULO', 'CORRENTEZA'
    ]
  },
  {
    id: 'parintins',
    title: 'Festival de Parintins',
    description: 'O duelo mágico entre o Garantido e o Caprichoso',
    iconName: 'Sparkles',
    words: [
      'BOI GARANTIDO', 'BOI CAPRICHOSO', 'BUMBÓDROMO', 'CUNHÃ-PORANGA', 'PAJÉ',
      'SINHÁZINHA', 'PORTA-ESTANDARTE', 'BATUCADA', 'MARUJADA', 'TOADA',
      'ALEGORIA GIGANTE', 'TRIBOS INDÍGENAS', 'AMAZÔNIA', 'VERMELHO', 'AZUL',
      'FESTA POPULAR', 'TORCIDA APAIXONADA', 'RITMO', 'AUTO DO BOI', 'LENDA'
    ]
  },
  {
    id: 'canastra',
    title: 'Serra da Canastra',
    description: 'Nascentes do Rio São Francisco e paredões de pedra',
    iconName: 'Compass',
    words: [
      'CASCA D’ANTA', 'RIO SÃO FRANCISCO', 'NASCENTE', 'LOBO-GUARÁ', 'TAMANDUÁ-BANDEIRA',
      'PATRIMÔNIO', 'CHAPADÃO', 'QUEIJARIA', 'PAREDÃO', 'TRILHA',
      'VEADO CAMPEIRO', 'GAVIÃO REAL', 'CURRAL DE PEDRA', 'CACHOEIRA', 'SERRA',
      'MIRANTE DO ROLADOR', 'CÂNION', 'POÇO AZUL', 'VENTANIA', 'ECOTURISMO'
    ]
  },
  {
    id: 'metropole',
    title: 'São Paulo Metrópole',
    description: 'Arte urbana, culinária do mundo e energia pulsante',
    iconName: 'Landmark',
    words: [
      'AVENIDA PAULISTA', 'MASP', 'IBIRAPUERA', 'MERCADO MUNICIPAL', 'PINACOTECA',
      'LIBERDADE', 'VILA MADALENA', 'BECO DO BATMAN', 'TEATRO MUNICIPAL', 'FAROL SANTANDER',
      'PASTEL DE FEIRA', 'SANDUÍCHE DE MORTADELA', 'METRÔ', 'VIADUTO DO CHÁ', 'RUA 25 DE MARÇO',
      'GRAFITE', 'CULTURA', 'ARRANHA-CÉU', 'GASTRONOMIA', 'PAULISTANO'
    ]
  },
  {
    id: 'rio_maravilha',
    title: 'Rio Cidade Maravilhosa',
    description: 'Cristo Redentor, Pão de Açúcar e calçadões',
    iconName: 'Sun',
    words: [
      'CRISTO REDENTOR', 'PÃO DE AÇÚCAR', 'COPACABANA', 'IPANEMA', 'LEBLON',
      'CORCOVADO', 'ARPOADOR', 'BONDINHO', 'LAPA', 'ARCOS DA LAPA',
      'MARACANÃ', 'FLORESTA DA TIJUCA', 'PEDRA DA GÁVEA', 'MIRANTE DONA MARTA', 'SAMBÓDROMO',
      'BOSSA NOVA', 'CHOPP GELADO', 'ÁGUA DE COCO', 'GAROTA DE IPANEMA', 'CARIOCA'
    ]
  },
  {
    id: 'veadeiros',
    title: 'Chapada dos Veadeiros',
    description: 'Quartzo, cânions profundos e cachoeiras místicas',
    iconName: 'Trees',
    words: [
      'VALE DA LUA', 'CACHOEIRA SANTA BÁRBARA', 'ALTO PARAÍSO', 'SÃO JORGE', 'PARQUE NACIONAL',
      'SALTO DO RIO PRETO', 'CÂNIONS', 'CRISTAIS DE QUARTZO', 'MIRANTE DA JANELA', 'ÁGUA CRISTALINA',
      'CERRADO', 'TRILHA DAS SETE QUEDAS', 'ENCONTRO DAS ÁGUAS', 'POÇO ENCANTADO', 'ARIRANHA',
      'FLOR DO CERRADO', 'SERRANIA', 'ASTROTURISMO', 'CÉU ESTRELADO', 'MISTICISMO'
    ]
  },
  {
    id: 'cacau',
    title: 'Riquezas do Cacau',
    description: 'Fazendas históricas da Costa do Cacau e chocolate',
    iconName: 'Apple',
    words: [
      'FRUTO DO CACAU', 'CHOCOLATE ARTESANAL', 'ILHÉUS', 'CABRUCA', 'FAZENDA HISTÓRICA',
      'BARRACOTE', 'SECAGEM AO SOL', 'MEL DE CACAU', 'BATALHA DE GABRIELA', 'VESÚVIO',
      'BATACLAN', 'LITORAL SUL', 'ITACARÉ', 'MATA VERDE', 'AMÊNDOA',
      'FERMENTAÇÃO', 'MOAGEM', 'BOMBONIERE', 'TRADIÇÃO', 'CHOCÓLATRAS'
    ]
  },
  {
    id: 'festas_juninas',
    title: 'Festas Juninas do Brasil',
    description: 'Caruaru, Campina Grande, fogueiras e bandeirinhas',
    iconName: 'Flame',
    words: [
      'FOGUEIRA', 'QUADRILHA', 'SANFONEIRO', 'BANDEIRINHA', 'BALÃO',
      'PAMONHA', 'CANJICA', 'CURAU', 'PÉ DE MOLEQUE', 'QUENTÃO',
      'MAÇÃ DO AMOR', 'MILHO VERDE', 'CARUARU', 'CAMPINA GRANDE', 'SÃO JOÃO',
      'SANTO ANTÔNIO', 'SÃO PEDRO', 'XOTE', 'CASAMENTO NA ROÇA', 'CHAPÉU DE PALHA'
    ]
  },
  {
    id: 'artesanato',
    title: 'Artesanato & Tradições',
    description: 'Barro, renda, cerâmica marajoara e esculturas',
    iconName: 'Sparkles',
    words: [
      'CERÂMICA MARAJOARA', 'BARRO DE CARUARU', 'RENDA DE BILRO', 'CARRANCA DE MADEIRA', 'CAPIM DOURADO',
      'BORDADO DE CAICÓ', 'TALHA EM MADEIRA', 'FIBRA DE BURITI', 'PANELA DE BARRO', 'XILOGRAVURA',
      'ESCULTURA', 'TEAR MANUAL', 'CESTAS DE PALHA', 'RENDA RENASCENÇA', 'CHITA COLORIDA',
      'MARACÁ', 'CUIAS PINTADAS', 'ARTE INDÍGENA', 'BIJUTERIA NATURAL', 'MESTRE ARTESÃO'
    ]
  },
  {
    id: 'diamantina',
    title: 'Chapada Diamantina',
    description: 'Cânions imponentes, poços azuis e cachoeira da Fumaça',
    iconName: 'Compass',
    words: [
      'CACHOEIRA DA FUMAÇA', 'MORRO DO PAI INÁCIO', 'POÇO AZUL', 'POÇO ENCANTADO', 'LENÇÓIS',
      'VALE DO PATI', 'CAVERNA DA LAPA', 'RIO DE CONTAS', 'IGATU', 'SERRA DO SINCORÁ',
      'GRUTA DA PRATINHA', 'DIAMANTE', 'GARIMPO HISTÓRICO', 'TRILHA DOS CÂNIONS', 'MUCUGÊ',
      'ANDARAÍ', 'CACHOEIRA DO BURACÃO', 'ORQUÍDEA RARA', 'PEDRA DO CASTELO', 'ECOTURISMO'
    ]
  },
  {
    id: 'vinhedos',
    title: 'Vale dos Vinhedos',
    description: 'Serra Gaúcha, tradição italiana e colheita das uvas',
    iconName: 'Apple',
    words: [
      'BENTO GONÇALVES', 'GARIBALDI', 'MONTE BELO DO SUL', 'COLHEITA DA UVA', 'PARREIRAL',
      'ESPUMANTE', 'VINHO ARTESANAL', 'CANTINA TÍPICA', 'POLENTA NA CHAPA', 'GALETO AL PRIMO',
      'TRENZINHO DA MARIA FUMAÇA', 'IMIGRAÇÃO ITALIANA', 'BARRIL DE CARVALHO', 'DEGUSTAÇÃO', 'PISA DA UVA',
      'SERRA GAÚCHA', 'QUEIJOS FINOS', 'VALE DOS PARREIRAIS', 'SOPRANO', 'FESTA DA VINDIMA'
    ]
  },
  {
    id: 'emocoes',
    title: 'Rota das Emoções',
    description: 'Lençóis Maranhenses, Delta do Parnaíba e Jericoacoara',
    iconName: 'Sun',
    words: [
      'LENÇÓIS MARANHENSES', 'DELTA DO PARNAÍBA', 'JERICOACOARA', 'PEDRA FURADA', 'LAGOA AZUL',
      'LAGOA BONITA', 'DUNAS DE AREIA', 'GUARÁ VERMELHO', 'BARREIRINHAS', 'RIO PREGUIÇAS',
      'CANDEIAS', 'VELEJAR', 'KITESURF', 'ÁGUA DOCE', 'CARRO 4X4',
      'CAMOCIM', 'PÔR DO SOL NA DUNA', 'FAROL DE MANDACARU', 'REDE NA ÁGUA', 'MANGUE DOCE'
    ]
  },
  {
    id: 'brasil_ouro',
    title: 'Grande Brasil Imperial',
    description: 'Monumentos, palácios, glórias históricas e tesouros da pátria',
    iconName: 'Trophy',
    words: [
      'PALÁCIO IMPERIAL', 'COROA REAL', 'MUSEU DO IPIRANGA', 'PETRÓPOLIS', 'INDEPENDÊNCIA',
      'ESTRADA REAL', 'OURO PRETO', 'TIRADENTES', 'ARQUIVO NACIONAL', 'MONUMENTO DA PÁTRIA',
      'CARROSSEL DE OURO', 'JARDIM BOTÂNICO', 'BIBLIOTECA NACIONAL', 'QUINTA DA BOA VISTA', 'BRASÃO NACIONAL',
      'ORDEM E PROGRESSO', 'REPÚBLICA', 'CRUZ DE MALTA', 'HERÓIS NACIONAIS', 'GLÓRIA ETERNA'
    ]
  }
];

export function getCategoryById(id: string): CategoryData {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}
