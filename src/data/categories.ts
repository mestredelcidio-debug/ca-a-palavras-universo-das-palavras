export interface CategoryData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  words: string[];
}

export const CATEGORIES: CategoryData[] = [
  {
    id: 'animais',
    title: 'Animais',
    description: 'Fauna exuberante do Brasil e do mundo',
    iconName: 'PawPrint',
    words: [
      'ONÇA PINTADA', 'CAPIVARA', 'ARARA', 'MICO LEÃO', 'TAMANDUÁ',
      'TATU', 'TUCANO', 'BOTO COR DE ROSA', 'PREGUIÇA', 'JACARÉ',
      'JIBOIA', 'LOBO GUARÁ', 'QUATI', 'ANTA', 'JAGUATIRICA',
      'SUÇUARANA', 'CUTIA', 'SAGUI', 'PAPAGAIO', 'CORUJA',
      'GOLFINHO', 'BALEIA', 'TARTARUGA', 'GAVIÃO', 'GARÇA'
    ]
  },
  {
    id: 'frutas',
    title: 'Frutas',
    description: 'Sabores tropicais e frutas nativas',
    iconName: 'Apple',
    words: [
      'AÇAÍ', 'CUPUAÇU', 'JABUTICABA', 'GRAVIOLA', 'CAJU',
      'PITANGA', 'MARACUJÁ', 'GOIABA', 'MANGA', 'ABACAXI',
      'PITOMBA', 'CAJÁ', 'ACEROLA', 'BACURI', 'GUARANÁ',
      'BURITI', 'CAMU CAMU', 'MURICI', 'PEQUI', 'UMBU',
      'BANANA', 'MELANCIA', 'MAMÃO', 'CARAMBOLA', 'FIGO'
    ]
  },
  {
    id: 'comidas_brasileiras',
    title: 'Comidas Brasileiras',
    description: 'Pratos típicos e doces tradicionais',
    iconName: 'Utensils',
    words: [
      'FEIJOADA', 'MOQUECA', 'PÃO DE QUEIJO', 'COXINHA', 'PASTEL',
      'BRIGADEIRO', 'TAPIOCA', 'FAROFA', 'ACARAJÉ', 'BAIÃO DE DOIS',
      'VATAPÁ', 'PAMONHA', 'QUINDIM', 'CANJICA', 'BOBÓ DE CAMARÃO',
      'VIRADO A PAULISTA', 'TUCUPI', 'CARURU', 'BEIJINHO', 'COCADA',
      'ESCONDIDINHO', 'PÉ DE MOLEQUE', 'CURAU', 'PATO NO TUCUPI', 'PAÇOCA'
    ]
  },
  {
    id: 'estados_brasileiros',
    title: 'Estados Brasileiros',
    description: 'As 27 unidades federativas do Brasil',
    iconName: 'Map',
    words: [
      'BAHIA', 'CEARÁ', 'GOIÁS', 'MINAS GERAIS', 'PARANÁ',
      'AMAZONAS', 'SÃO PAULO', 'PERNAMBUCO', 'SANTA CATARINA', 'RIO DE JANEIRO',
      'PARÁ', 'MARANHÃO', 'PARAÍBA', 'ALAGOAS', 'SERGIPE',
      'ACRE', 'RONDÔNIA', 'RORAIMA', 'AMAPÁ', 'TOCANTINS',
      'MATO GROSSO', 'ESPÍRITO SANTO', 'PIAUÍ', 'RIO GRANDE DO SUL', 'RIO GRANDE DO NORTE'
    ]
  },
  {
    id: 'capitais',
    title: 'Capitais',
    description: 'Capitais brasileiras de norte a sul',
    iconName: 'Building2',
    words: [
      'BRASÍLIA', 'SALVADOR', 'FORTALEZA', 'CURITIBA', 'RECIFE',
      'MANAUS', 'BELÉM', 'GOIÂNIA', 'PORTO ALEGRE', 'FLORIANÓPOLIS',
      'NATAL', 'VITÓRIA', 'CUIABÁ', 'TERESINA', 'MACEIÓ',
      'ARACAJU', 'JOÃO PESSOA', 'SÃO LUÍS', 'CAMPO GRANDE', 'BELO HORIZONTE',
      'MACAPÁ', 'BOA VISTA', 'PORTO VELHO', 'PALMAS', 'RIO BRANCO'
    ]
  },
  {
    id: 'cidades',
    title: 'Cidades Encantadoras',
    description: 'Cidades históricas e turísticas do Brasil',
    iconName: 'Landmark',
    words: [
      'OURO PRETO', 'PARATY', 'GRAMADO', 'PETRÓPOLIS', 'OLINDA',
      'CAMPINAS', 'SANTOS', 'NITERÓI', 'LONDRINA', 'MARINGÁ',
      'BÚZIOS', 'ILHÉUS', 'FOZ DO IGUAÇU', 'TIRADENTES', 'CANELA',
      'BONITO', 'BLUMENAU', 'ANGRA DOS REIS', 'DIAMANTINA', 'ALTER DO CHÃO'
    ]
  },
  {
    id: 'carnaval',
    title: 'Carnaval',
    description: 'A maior festa popular do planeta',
    iconName: 'Sparkles',
    words: [
      'FANTASIA', 'SAMBA', 'SAMBÓDROMO', 'SERPENTINA', 'CONFETE',
      'BLOCO DE RUA', 'BATERIA', 'MESTRE SALA', 'PORTA BANDEIRA', 'ALEGORIA',
      'ESTANDARTE', 'CORDÃO', 'TAMBORIM', 'CUÍCA', 'AGOGÔ',
      'MARACATU', 'FREVO', 'TRIO ELÉTRICO', 'ABADÁ', 'PASSISTA',
      'ENREDO', 'CARRO ALEGÓRICO', 'PANDEIRO', 'REPIQUE', 'SURDO'
    ]
  },
  {
    id: 'futebol',
    title: 'Futebol',
    description: 'A paixão nacional verde e amarela',
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
    id: 'cultura_brasileira',
    title: 'Cultura Brasileira',
    description: 'Folclore, tradições e manifestações populares',
    iconName: 'HeartHandshake',
    words: [
      'CORDEL', 'CAPOEIRA', 'BOI BUMBÁ', 'FESTA JUNINA', 'CIRANDA',
      'MACULELÊ', 'VIOLA CAIPIRA', 'SACI PERERÊ', 'CURUPIRA', 'IARA',
      'ARTESANATO', 'REPENTE', 'CARRANCA', 'LITERATURA', 'BERIMBAU',
      'FESTIVAL DE PARINTINS', 'BONECOS DE OLINDA', 'FANDANGO', 'CATIRA', 'FORRÓ'
    ]
  },
  {
    id: 'praia',
    title: 'Praia e Verão',
    description: 'Areia, mar e a energia do litoral brasileiro',
    iconName: 'Sun',
    words: [
      'AREIA', 'ONDA', 'MAR', 'CONCHA', 'GUARDA SOL',
      'CANGA', 'ÁGUA DE COCO', 'PRANCHA', 'CALÇADÃO', 'MARESIA',
      'SALVA VIDAS', 'BRISA', 'CASTELO DE AREIA', 'DUNA', 'FAROL',
      'PROTETOR', 'ÓCULOS', 'SURFISTA', 'QUIOSQUE', 'MERGULHO',
      'CHINELO', 'PÔR DO SOL', 'CORAIS', 'MARÉ ALTA', 'BANHO DE MAR'
    ]
  },
  {
    id: 'natureza',
    title: 'Natureza & Biomas',
    description: 'Cerrado, Pantanal, Amazônia e Mata Atlântica',
    iconName: 'Trees',
    words: [
      'FLORESTA', 'PANTANAL', 'CACHOEIRA', 'RIO AMAZONAS', 'PLANALTO',
      'VAGALUME', 'CERRADO', 'MATA ATLÂNTICA', 'MANGUEZAL', 'VEREDA',
      'CAATINGA', 'GRUTA', 'CHAPADA', 'IGUAPÓ', 'SERRA DO MAR',
      'IGARAPÉ', 'ARARIPE', 'RESTINGA', 'VITÓRIA RÉGIA', 'ORQUÍDEA'
    ]
  },
  {
    id: 'musica',
    title: 'Música do Brasil',
    description: 'Ritmos, harmonias e instrumentos brasileiros',
    iconName: 'Music',
    words: [
      'SAMBA', 'BOSSA NOVA', 'FORRÓ', 'CHORO', 'FREVO',
      'MARACATU', 'BAIÃO', 'SERTANEJO', 'PAGODE', 'AXÉ',
      'CAVAQUINHO', 'PANDEIRO', 'BERIMBAU', 'VIOLA', 'SURDO',
      'ZABUMBA', 'TRIÂNGULO', 'SANFONA', 'TAMBORIM', 'CUÍCA'
    ]
  },
  {
    id: 'profissoes',
    title: 'Profissões',
    description: 'Carreiras e ofícios do dia a dia',
    iconName: 'Briefcase',
    words: [
      'PROFESSOR', 'MÉDICO', 'ENGENHEIRO', 'ADVOGADO', 'BOMBEIRO',
      'JORNALISTA', 'ARQUITETO', 'COZINHEIRO', 'POLICIAL', 'VETERINÁRIO',
      'ENFERMEIRO', 'PADEIRO', 'DENTISTA', 'MOTORISTA', 'CARPINTEIRO',
      'ELETRICISTA', 'PESQUISADOR', 'MECÂNICO', 'COSTUREIRA', 'FARMACÊUTICO'
    ]
  },
  {
    id: 'esportes',
    title: 'Esportes',
    description: 'Modalidades atléticas e jogos',
    iconName: 'Activity',
    words: [
      'FUTEBOL', 'VÔLEI', 'BASQUETE', 'FUTSAL', 'NATAÇÃO',
      'JUDÔ', 'SURFE', 'CAPOEIRA', 'CICLISMO', 'SKATE',
      'HANDEBOL', 'ATLETISMO', 'TÊNIS', 'BOXE', 'GINÁSTICA',
      'REMO', 'HIPISMO', 'CANOAGEM', 'TIRO COM ARCO', 'VELA'
    ]
  },
  {
    id: 'viagens',
    title: 'Viagens & Aventura',
    description: 'Explorando novos caminhos e destinos',
    iconName: 'Compass',
    words: [
      'BAGAGEM', 'AVIÃO', 'PASSAPORTE', 'MAPA', 'TRILHA',
      'POUSADA', 'MOCHILA', 'ROTEIRO', 'EXCURSÃO', 'MIRANTE',
      'BILHETE', 'CRUZEIRO', 'DESTINO', 'EMBARQUE', 'AEROPORTO',
      'BÚSSOLA', 'CAMPING', 'HOSPEDAGEM', 'GUIA', 'MALAS'
    ]
  },
  {
    id: 'escola',
    title: 'Escola & Conhecimento',
    description: 'O universo da sala de aula e do aprendizado',
    iconName: 'GraduationCap',
    words: [
      'CADERNO', 'LÁPIS', 'BORRACHA', 'MOCHILA', 'BIBLIOTECA',
      'RECREIO', 'RÉGUA', 'PROVA', 'QUADRO', 'CANETA',
      'TESOURA', 'APONTADOR', 'ESTOJO', 'LIVRO', 'DICIONÁRIO',
      'COMPASSO', 'PROFESSORA', 'EXERCÍCIO', 'APOSTILA', 'CALCULADORA'
    ]
  },
  {
    id: 'familia',
    title: 'Família & União',
    description: 'Laços de afeto e parentesco',
    iconName: 'Users',
    words: [
      'AVÔ', 'AVÓ', 'PRIMO', 'TIO', 'IRMÃO',
      'SOBRINHO', 'PADRINHO', 'MADRINHA', 'BISAVÔ', 'NETO',
      'PAI', 'MÃE', 'CUNHADO', 'NORA', 'GENRO',
      'ENFRENTAR', 'ABRAÇO', 'AFETO', 'CASAL', 'INFÂNCIA'
    ]
  },
  {
    id: 'tecnologia',
    title: 'Tecnologia & Inovação',
    description: 'O mundo digital contemporâneo',
    iconName: 'Cpu',
    words: [
      'COMPUTADOR', 'CELULAR', 'INTERNET', 'ROBÔ', 'ALGORITMO',
      'SATÉLITE', 'MEMÓRIA', 'TELA', 'BATERIA', 'TECLADO',
      'MICROFONE', 'CONEXÃO', 'BLUETOOTH', 'ROTEADOR', 'PROGRAMAÇÃO',
      'APLICATIVO', 'DADOS', 'CIRCUITO', 'SENHA', 'SERVIDOR'
    ]
  },
  {
    id: 'filmes',
    title: 'Cinema & Filmes',
    description: 'A sétima arte e produção audiovisual',
    iconName: 'Film',
    words: [
      'CINEMA', 'DIRETOR', 'ATOR', 'COMÉDIA', 'DRAMA',
      'ROTEIRO', 'PIPOCA', 'ESTREIA', 'SESSÃO', 'DUBLADOR',
      'CÂMERA', 'FIGURINO', 'EFEITO', 'BILHETERIA', 'TELÃO',
      'TRILHA SONORA', 'DOCUMENTÁRIO', 'ANIMAÇÃO', 'SUSPENSE', 'CLAQUETE'
    ]
  },
  {
    id: 'objetos',
    title: 'Objetos do Cotidiano',
    description: 'Coisas presentes em nossas casas',
    iconName: 'Box',
    words: [
      'CADEIRA', 'RELÓGIO', 'CHAVE', 'ESPELHO', 'JANELA',
      'GARRAFA', 'ALMOFADA', 'CANECA', 'LIVRO', 'TESOURA',
      'ABAJUR', 'TAPETE', 'CANETA', 'QUADRO', 'PORTA',
      'VASO', 'VENTILADOR', 'TELEFONE', 'PRATO', 'GARFO'
    ]
  }
];

export function getCategoryById(id: string): CategoryData {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}
