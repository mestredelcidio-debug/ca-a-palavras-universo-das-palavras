export interface CategoryData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  words: string[];
}

export const CATEGORIES: CategoryData[] = [
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
