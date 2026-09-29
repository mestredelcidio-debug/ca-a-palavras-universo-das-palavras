export interface BackgroundOption {
  id: number;
  label: string;
  description: string;
  gradient: string;
  requiredStars: number;
}

export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  biome: string;
  description: string;
  startLevel: number;
  endLevel: number;
  rewardCoins: number;
  themeCategory: string;
  bgGradient: string; // Default background
  bgOptions: BackgroundOption[]; // 3 options
  accentColor: string;
  iconName: string;
}

export interface ChapterBgPreset {
  name1: string;
  desc1: string;
  grad1: string;
  name2: string;
  desc2: string;
  grad2: string;
  name3: string;
  desc3: string;
  grad3: string;
}

export const CHAPTER_BG_PRESETS: Record<number, ChapterBgPreset> = {
  1: {
    name1: 'Floresta da Mata Atlântica',
    desc1: 'Copa verdejante, samambaias nativas e orquídeas da mata atlântica.',
    grad1: 'from-emerald-800 via-teal-900 to-slate-950',
    name2: 'Bromélias & Frutos Tropicais',
    desc2: 'Pitangas, jabuticabas e bromélias floridas em tons vibrantes.',
    grad2: 'from-green-600 via-emerald-800 to-slate-950',
    name3: 'Noite na Selva Atlântica',
    desc3: 'O silêncio místico e vaga-lumes reluzentes na escuridão da mata.',
    grad3: 'from-emerald-950 via-teal-950 to-black'
  },
  2: {
    name1: 'Planície Pantaneira Alagada',
    desc1: 'Espelhos d’água com vitórias-régias e tuiuiús no Pantanal.',
    grad1: 'from-amber-800 via-orange-900 to-slate-950',
    name2: 'Refúgio da Onça-Pintada',
    desc2: 'Vegetação de chapada dourada onde reina soberana a onça-pintada.',
    grad2: 'from-orange-600 via-amber-800 to-slate-950',
    name3: 'Crepúsculo no Cerrado',
    desc3: 'Pôr do sol avermelhado entre os ipês e campos do cerrado.',
    grad3: 'from-amber-950 via-stone-900 to-black'
  },
  3: {
    name1: 'Igarapé da Floresta Amazônica',
    desc1: 'Canais de água cristalina sob as copas das maiores árvores do planeta.',
    grad1: 'from-teal-800 via-emerald-950 to-slate-950',
    name2: 'Encontro das Águas & Botos',
    desc2: 'A dança dos rios Negro e Solimões com os botos-cor-de-rosa.',
    grad2: 'from-teal-600 via-emerald-800 to-slate-950',
    name3: 'Coração Noturno da Amazônia',
    desc3: 'A imensidão misteriosa da floresta amazônica sob a lua cheia.',
    grad3: 'from-teal-950 via-slate-950 to-black'
  },
  4: {
    name1: 'Areias Douradas & Coqueirais',
    desc1: 'Brisa costeira suave, coqueiros balançando e areia fina do litoral.',
    grad1: 'from-sky-800 via-cyan-900 to-slate-950',
    name2: 'Mar Turquesa Tropical',
    desc2: 'Águas cristalinas em tons esmeralda ideais para contemplação.',
    grad2: 'from-cyan-600 via-sky-800 to-slate-950',
    name3: 'Luau & Noite Estrelada na Praia',
    desc3: 'O reflexo das estrelas e do oceano sob a brisa noturna da costa.',
    grad3: 'from-sky-950 via-indigo-950 to-black'
  },
  5: {
    name1: 'Caatinga, Mandacarus & Xiquexique',
    desc1: 'A resiliência dos cactos e a beleza única da caatinga brasileira.',
    grad1: 'from-orange-800 via-rose-950 to-slate-950',
    name2: 'Cordel, Sanfona & Forró Pé-de-Serra',
    desc2: 'Cores quentes e alegria dos folhetos de cordel e sanfonas sertanejas.',
    grad2: 'from-amber-600 via-orange-800 to-slate-950',
    name3: 'Céu Estrelado do Sertão',
    desc3: 'O céu límpido e pontilhado de constelações do sertão nordestino.',
    grad3: 'from-rose-950 via-purple-950 to-black'
  },
  6: {
    name1: 'Ladeiras de Pedra de Ouro Preto',
    desc1: 'Calçamento pé-de-moleque e casario colonial bicentenário.',
    grad1: 'from-amber-900 via-yellow-950 to-slate-950',
    name2: 'Igrejas Barrocas & Ouro Colonial',
    desc2: 'Trabalhos em pedra-sabão de Aleijadinho e altares folheados a ouro.',
    grad2: 'from-yellow-700 via-amber-900 to-slate-950',
    name3: 'Noite dos Lampiões Coloniais',
    desc3: 'O charme dos lampiões e sinos seculares ecoando nas serras.',
    grad3: 'from-yellow-950 via-stone-950 to-black'
  },
  7: {
    name1: 'Passarela do Samba & Alegorias',
    desc1: 'Cores vivas, plumas, serpentinas e fantasias da avenida do samba.',
    grad1: 'from-purple-800 via-fuchsia-950 to-slate-950',
    name2: 'Bateria Nota 10 & Frevo de Olinda',
    desc2: 'Energia contagiante dos tamborins, surdos e sombrinhas de frevo.',
    grad2: 'from-fuchsia-700 via-purple-900 to-slate-950',
    name3: 'Baile de Carnaval sob o Luar',
    desc3: 'Confetes reluzentes e a apoteose mágica da maior festa brasileira.',
    grad3: 'from-purple-950 via-indigo-950 to-black'
  },
  8: {
    name1: 'Gramado dos Campeões',
    desc1: 'O tapete verde impecável onde o drible e os gols ganham vida.',
    grad1: 'from-emerald-800 via-green-950 to-slate-950',
    name2: 'Amarelinha Canarinho Pentacampeã',
    desc2: 'O manto sagrado verde-amarelo que conquistou o respeito mundial.',
    grad2: 'from-green-600 via-emerald-800 to-slate-950',
    name3: 'Maracanã sob os Holofotes',
    desc3: 'A mística das noites de decisão com as arquibancadas em delírio.',
    grad3: 'from-emerald-950 via-slate-950 to-black'
  },
  9: {
    name1: 'Coxilhas & Galpão Crioulo',
    desc1: 'Campos abertos do Rio Grande do Sul e a hospitalidade gaúcha.',
    grad1: 'from-red-900 via-rose-950 to-slate-950',
    name2: 'Fogo de Chão & Costela Farroupilha',
    desc2: 'Brasas ardentes, chimarrão quente e o sabor autêntico dos pampas.',
    grad2: 'from-rose-700 via-red-900 to-slate-950',
    name3: 'Inverno Minuano nos Pampas',
    desc3: 'O vento minuano e o aconchego dos galpões ao redor do fogão.',
    grad3: 'from-red-950 via-zinc-950 to-black'
  },
  10: {
    name1: 'Dunas de Areia Branca Maranhense',
    desc1: 'Ondulações perfeitas esculpidas pelos ventos tropicais.',
    grad1: 'from-cyan-800 via-blue-950 to-slate-950',
    name2: 'Lagoas Cristalinas Azul e Bonita',
    desc2: 'Oásis de água doce e morna formados entre as dunas alvas.',
    grad2: 'from-blue-600 via-cyan-800 to-slate-950',
    name3: 'Pôr do Sol Mágico nos Lençóis',
    desc3: 'O reflexo do céu dourado nas lagoas cristalinas ao anoitecer.',
    grad3: 'from-cyan-950 via-blue-950 to-black'
  },
  11: {
    name1: 'Garota de Ipanema & Bossa Nova',
    desc1: 'Suavidade do violão e poesia cantada à beira do mar carioca.',
    grad1: 'from-indigo-800 via-purple-950 to-slate-950',
    name2: 'Roda de Samba, Cavaco & Pandeiro',
    desc2: 'A harmonia da gafieira, partido-alto e samba de raiz.',
    grad2: 'from-purple-700 via-indigo-900 to-slate-950',
    name3: 'Seresta Noturna & Clube da Esquina',
    desc3: 'Guitarras brasileiras, chorinhos e melodias sob o luar.',
    grad3: 'from-indigo-950 via-slate-950 to-black'
  },
  12: {
    name1: 'Tabuleiro da Baiana & Acarajé',
    desc1: 'Vatapá aveludado, caruru fresco e azeite de dendê aromático.',
    grad1: 'from-amber-800 via-red-950 to-slate-950',
    name2: 'Pelourinho Dourado & Axé de Salvador',
    desc2: 'Casarões coloridos, fitas do Bonfim e tambores do Olodum.',
    grad2: 'from-orange-600 via-amber-800 to-slate-950',
    name3: 'Entardecer no Farol da Barra',
    desc3: 'O sol se pondo na Baía de Todos os Santos com todo o axé.',
    grad3: 'from-amber-950 via-orange-950 to-black'
  },
  13: {
    name1: 'Fogão a Lenha & Pão de Queijo',
    desc1: 'Cafezinho passado na hora, queijo canastra e broa mineira.',
    grad1: 'from-yellow-900 via-amber-950 to-slate-950',
    name2: 'Montanhas & Cafezais de Minas',
    desc2: 'Mar de morros verdejantes cobertos de grãos nobres de café.',
    grad2: 'from-amber-700 via-yellow-900 to-slate-950',
    name3: 'Aconchego da Fazenda Mineira',
    desc3: 'Tacho de cobre com doce de leite e o silêncio sereno das serras.',
    grad3: 'from-yellow-950 via-stone-950 to-black'
  },
  14: {
    name1: 'Morro do Pico & Baía dos Golfinhos',
    desc1: 'Formações vulcânicas icônicas e golfinhos rotadores no santuário.',
    grad1: 'from-teal-800 via-blue-950 to-slate-950',
    name2: 'Praia do Sancho & Piscinas Naturais',
    desc2: 'Águas esmeraldas protegidas e tartarugas marinhas nadando livres.',
    grad2: 'from-cyan-600 via-teal-800 to-slate-950',
    name3: 'Mirante dos Dois Irmãos ao Entardecer',
    desc3: 'As duas sentinelas de pedra banhadas pelo pôr do sol oceânico.',
    grad3: 'from-teal-950 via-blue-950 to-black'
  },
  15: {
    name1: 'Mata Protetora do Curupira',
    desc1: 'Trilhas com pegadas invertidas e guardiões da fauna brasileira.',
    grad1: 'from-violet-900 via-purple-950 to-slate-950',
    name2: 'Redemoinho & Travessuras do Saci',
    desc2: 'Gorro vermelho, cachimbo e as peripécias mágicas nas matas.',
    grad2: 'from-purple-700 via-violet-900 to-slate-950',
    name3: 'Lago Encantado da Iara & Boitatá',
    desc3: 'Canto hipnotizante da Mãe d’Água e o fogo misterioso do Boitatá.',
    grad3: 'from-violet-950 via-slate-950 to-black'
  },
  16: {
    name1: 'Fervedouro de Águas Flutuantes',
    desc1: 'Ressurgências de água azul-turquesa onde ninguém afunda no Jalapão.',
    grad1: 'from-orange-900 via-amber-950 to-slate-950',
    name2: 'Dunas Alaranjadas do Jalapão',
    desc2: 'Areias avermelhadas contrastando com veredas de buritis.',
    grad2: 'from-amber-600 via-orange-800 to-slate-950',
    name3: 'Capim Dourado sob o Luar do Cerrado',
    desc3: 'O brilho metálico do capim dourado sob as estrelas do Tocantins.',
    grad3: 'from-orange-950 via-stone-950 to-black'
  },
  17: {
    name1: 'Garganta do Diabo Monumental',
    desc1: 'Milhões de litros de água despencando com força colossal e névoa.',
    grad1: 'from-blue-900 via-cyan-950 to-slate-950',
    name2: 'Arco-Íris nas Brumas das Cataratas',
    desc2: 'O espetáculo multicolorido que se forma sobre as quedas d’água.',
    grad2: 'from-cyan-600 via-blue-800 to-slate-950',
    name3: 'Mirante das Cataratas sob a Lua',
    desc3: 'O estrondo majestoso das quedas na escuridão da mata paranaense.',
    grad3: 'from-blue-950 via-slate-950 to-black'
  },
  18: {
    name1: 'Arena do Bumbódromo Vermelho & Azul',
    desc1: 'A rivalidade histórica e apaixonada entre Garantido e Caprichoso.',
    grad1: 'from-rose-900 via-blue-950 to-slate-950',
    name2: 'Dança da Cunhã-Poranga & Pajé',
    desc2: 'A mulher mais bela da tribo e os rituais mágicos da floresta.',
    grad2: 'from-fuchsia-700 via-rose-900 to-slate-950',
    name3: 'Noite da Apoteose Amazônica',
    desc3: 'Toadas emocionantes e alegorias gigantescas sob os holofotes.',
    grad3: 'from-rose-950 via-indigo-950 to-black'
  },
  19: {
    name1: 'Cachoeira Casca d’Anta',
    desc1: 'A queda colossal de quase 200 metros que batiza o Rio São Francisco.',
    grad1: 'from-emerald-900 via-teal-950 to-slate-950',
    name2: 'Chapadão do Lobo-Guará',
    desc2: 'Horizontes infinitos de campos de altitude e fauna protegida.',
    grad2: 'from-teal-700 via-emerald-900 to-slate-950',
    name3: 'Nascente Sagrada do Velho Chico',
    desc3: 'O berço humilde de onde nasce o rio da integração nacional.',
    grad3: 'from-emerald-950 via-stone-950 to-black'
  },
  20: {
    name1: 'Avenida Paulista & Noite Cosmopolita',
    desc1: 'Arranha-céus iluminados, MASP e o ritmo pulsante da metrópole.',
    grad1: 'from-slate-800 via-zinc-900 to-slate-950',
    name2: 'Beco do Batman & Arte Urbana',
    desc2: 'Grafites expressivos, galerias e cultura moderna em cada esquina.',
    grad2: 'from-zinc-700 via-slate-800 to-slate-950',
    name3: 'Terraço Paulistano & Mar de Luzes',
    desc3: 'A visão panorâmica inesquecível da cidade que nunca dorme.',
    grad3: 'from-slate-950 via-black to-black'
  },
  21: {
    name1: 'Cristo Redentor no Alto do Corcovado',
    desc1: 'Braços abertos sobre a Baía de Guanabara abençoando o Rio de Janeiro.',
    grad1: 'from-sky-900 via-blue-950 to-slate-950',
    name2: 'Calçadão de Copacabana & Pão de Açúcar',
    desc2: 'Ondas de pedras portuguesas, bondinho e a energia da orla carioca.',
    grad2: 'from-cyan-700 via-blue-900 to-slate-950',
    name3: 'Noite Boêmia nos Arcos da Lapa',
    desc3: 'Arcos coloniais iluminados, choro, samba e alegria carioca.',
    grad3: 'from-blue-950 via-purple-950 to-black'
  },
  22: {
    name1: 'Vale da Lua & Esculturas de Pedra',
    desc1: 'Cânions de rocha lapidados pelas corredeiras como superfície lunar.',
    grad1: 'from-indigo-900 via-teal-950 to-slate-950',
    name2: 'Cachoeiras Almécegas & Cristais de Quartzo',
    desc2: 'Águas puríssimas que brotam de jazidas gigantescas de cristais.',
    grad2: 'from-teal-700 via-indigo-900 to-slate-950',
    name3: 'Céu Cósmico & Estrelas dos Veadeiros',
    desc3: 'A vibração mística do paralelo 14 sob a Via Láctea brilhante.',
    grad3: 'from-indigo-950 via-slate-950 to-black'
  },
  23: {
    name1: 'Frutos de Ouro nos Cacauais de Ilhéus',
    desc1: 'Cacaueiros sombreados pela mata atlântica da Costa do Cacau.',
    grad1: 'from-amber-950 via-yellow-950 to-slate-950',
    name2: 'Fazenda Histórica de Chocolate',
    desc2: 'Amêndoas perfumadas secando ao sol e a herança de Jorge Amado.',
    grad2: 'from-amber-800 via-orange-950 to-slate-950',
    name3: 'Crepúsculo na Costa do Cacau',
    desc3: 'O encontro dos rios e do mar nas praias históricas do sul baiano.',
    grad3: 'from-stone-900 via-amber-950 to-black'
  },
  24: {
    name1: 'Arraial de Caruaru & Campina Grande',
    desc1: 'Bandeirinhas coloridas, fogueiras acesas e chapéus de palha.',
    grad1: 'from-orange-900 via-red-950 to-slate-950',
    name2: 'Quadrilha Tradicional & Sanfona',
    desc2: 'Vestidos de chita, dança sincrônica ao som do triângulo e zabumba.',
    grad2: 'from-red-700 via-orange-900 to-slate-950',
    name3: 'Noite Estrelada de São João & Fogueiras',
    desc3: 'Pamonha doce, quentão, fogos de artifício e forró até o amanhecer.',
    grad3: 'from-orange-950 via-purple-950 to-black'
  },
  25: {
    name1: 'Mestres do Barro & Mestre Vitalino',
    desc1: 'Esculturas de argila retratando retirantes, vaqueiros e músicos.',
    grad1: 'from-yellow-900 via-amber-950 to-slate-950',
    name2: 'Renda Renascença & Bordados Nordestinos',
    desc2: 'Trabalho minucioso de agulhas e almofadas herdado por gerações.',
    grad2: 'from-amber-700 via-yellow-900 to-slate-950',
    name3: 'Cerâmica Ancestral Marajoara',
    desc3: 'Grafismos geométricos milenares da Ilha de Marajó.',
    grad3: 'from-yellow-950 via-stone-950 to-black'
  },
  26: {
    name1: 'Praia do Sancho & Mirante das Esmeraldas',
    desc1: 'Águas multicoloridas cercadas por falésias e fauna marinha.',
    grad1: 'from-teal-900 via-cyan-950 to-slate-950',
    name2: 'Baía dos Porcos & Dois Irmãos',
    desc2: 'Piscinas naturais transparentes repletas de polvos e peixes corais.',
    grad2: 'from-cyan-700 via-teal-900 to-slate-950',
    name3: 'Pôr do Sol no Forte de Noronha',
    desc3: 'O espetáculo do astro-rei se pondo no horizonte atlântico isolado.',
    grad3: 'from-teal-950 via-blue-950 to-black'
  },
  27: {
    name1: 'Morro do Pai Inácio & Cânions Diamantinos',
    desc1: 'Paredões gigantescos e a lendária vista panorâmica do garimpo.',
    grad1: 'from-indigo-900 via-blue-950 to-slate-950',
    name2: 'Poço Encantado & Poço Azul',
    desc2: 'Raio de sol azul cobalto que penetra nas cavernas cristalinas.',
    grad2: 'from-blue-700 via-indigo-900 to-slate-950',
    name3: 'Cachoeira da Fumaça sob as Estrelas',
    desc3: 'Queda de quase 400 metros onde a água vira névoa antes do chão.',
    grad3: 'from-indigo-950 via-slate-950 to-black'
  },
  28: {
    name1: 'Parreirais da Serra Gaúcha & Uvas Nobres',
    desc1: 'Colinas sinuosas com vinhas italianas em Bento Gonçalves.',
    grad1: 'from-purple-900 via-rose-950 to-slate-950',
    name2: 'Colheita da Vindima & Cantinas Históricas',
    desc2: 'Pisa da uva, barris de carvalho e celebração comunitária da colheita.',
    grad2: 'from-rose-700 via-purple-900 to-slate-950',
    name3: 'Noite nos Vinhedos com Lareira & Vinho',
    desc3: 'Aconchego serrano e o repouso das videiras sob o céu limpo.',
    grad3: 'from-purple-950 via-zinc-950 to-black'
  },
  29: {
    name1: 'Delta do Parnaíba & Revoada dos Guarás',
    desc1: 'Centenas de aves escarlates voando sobre igarapés de manguezal.',
    grad1: 'from-amber-900 via-orange-950 to-slate-950',
    name2: 'Dunas de Jericoacoara & Pedra Furada',
    desc2: 'O vento constante dos kitesurfistas e o sol passando pelo arco de pedra.',
    grad2: 'from-orange-700 via-amber-900 to-slate-950',
    name3: 'Lagoa do Paraíso ao Luar',
    desc3: 'Redes dentro da água azul-turquesa e areia macia ao anoitecer.',
    grad3: 'from-amber-950 via-rose-950 to-black'
  },
  30: {
    name1: 'Palácio Imperial de Petrópolis & Jardins',
    desc1: 'Residência de verão imperial com madeiras nobres e carruagens.',
    grad1: 'from-amber-700 via-yellow-900 to-slate-950',
    name2: 'Salão do Trono & Brasão da Pátria',
    desc2: 'A coroa ornada de brilhantes, veludo verde e símbolos da nação.',
    grad2: 'from-yellow-600 via-amber-800 to-slate-950',
    name3: 'Palácio de Cristal sob a Glória Nacional',
    desc3: 'Estrutura de ferro francês iluminada coroando o ápice da jornada.',
    grad3: 'from-amber-950 via-stone-900 to-black'
  }
};

export function getChapterBgOptions(id: number, subtitle?: string, defaultGrad?: string): BackgroundOption[] {
  const preset = CHAPTER_BG_PRESETS[id];
  if (preset) {
    return [
      { id: 1, label: preset.name1, description: preset.desc1, gradient: preset.grad1, requiredStars: 0 },
      { id: 2, label: preset.name2, description: preset.desc2, gradient: preset.grad2, requiredStars: 30 },
      { id: 3, label: preset.name3, description: preset.desc3, gradient: preset.grad3, requiredStars: 45 }
    ];
  }
  return [
    {
      id: 1,
      label: `${subtitle || 'Cenário'} (Alvorada)`,
      description: `O esplendor matinal do bioma ${subtitle || 'brasileiro'}.`,
      gradient: defaultGrad || 'from-slate-800 via-slate-900 to-slate-950',
      requiredStars: 0
    },
    {
      id: 2,
      label: `${subtitle || 'Cenário'} (Entardecer)`,
      description: `Tons calorosos do pôr do sol no bioma ${subtitle || 'brasileiro'}.`,
      gradient: 'from-amber-800 via-orange-950 to-slate-950',
      requiredStars: 30
    },
    {
      id: 3,
      label: `${subtitle || 'Cenário'} (Noite Estrelada)`,
      description: `A atmosfera misteriosa e céu pontilhado do bioma ${subtitle || 'brasileiro'}.`,
      gradient: 'from-slate-950 via-black to-black',
      requiredStars: 45
    }
  ];
}

const BASE_CHAPTERS: Omit<ChapterData, 'bgOptions'>[] = [
  {
    id: 1,
    title: 'Capítulo 1',
    subtitle: 'Mata Atlântica',
    biome: 'Floresta Tropical & Frutos',
    description: 'Explore a fauna exuberante e os frutos nativos da mata atlântica brasileira.',
    startLevel: 1,
    endLevel: 30,
    rewardCoins: 500,
    themeCategory: 'frutas',
    bgGradient: 'from-emerald-800 via-teal-900 to-slate-950',
    accentColor: '#10b981',
    iconName: 'Trees'
  },
  {
    id: 2,
    title: 'Capítulo 2',
    subtitle: 'Pantanal & Cerrado',
    biome: 'Águas, Onças & Chapadas',
    description: 'Onças-pintadas, tuiuiús, jacarés e o encanto das águas pantaneiras.',
    startLevel: 31,
    endLevel: 60,
    rewardCoins: 550,
    themeCategory: 'animais',
    bgGradient: 'from-amber-800 via-orange-900 to-slate-950',
    accentColor: '#f59e0b',
    iconName: 'Compass'
  },
  {
    id: 3,
    title: 'Capítulo 3',
    subtitle: 'Amazônia Exuberante',
    biome: 'Bacia Amazônica & Rios',
    description: 'Igarapés misteriosos, vitória-régia, botos e a maior floresta tropical do planeta.',
    startLevel: 61,
    endLevel: 90,
    rewardCoins: 600,
    themeCategory: 'natureza',
    bgGradient: 'from-teal-800 via-emerald-950 to-slate-950',
    accentColor: '#14b8a6',
    iconName: 'Waves'
  },
  {
    id: 4,
    title: 'Capítulo 4',
    subtitle: 'Litoral & Praias',
    biome: 'Costa Dourada & Mar',
    description: 'Areia dourada, brisa do mar, água de coco fresca e calçadões famosos.',
    startLevel: 91,
    endLevel: 120,
    rewardCoins: 650,
    themeCategory: 'praia',
    bgGradient: 'from-sky-800 via-cyan-900 to-slate-950',
    accentColor: '#0ea5e9',
    iconName: 'Sun'
  },
  {
    id: 5,
    title: 'Capítulo 5',
    subtitle: 'Sertão & Raízes',
    biome: 'Caatinga, Cordel & Forró',
    description: 'Cordel, forró pé-de-serra, sanfonas, xaxado e a força do sertanejo.',
    startLevel: 121,
    endLevel: 150,
    rewardCoins: 700,
    themeCategory: 'cultura_brasileira',
    bgGradient: 'from-orange-800 via-rose-950 to-slate-950',
    accentColor: '#f97316',
    iconName: 'Flame'
  },
  {
    id: 6,
    title: 'Capítulo 6',
    subtitle: 'Cidades Históricas',
    biome: 'Patrimônio Colonial & Ladeiras',
    description: 'Casarios coloniais, ladeiras de pedra, sinos seculares e arte barroca.',
    startLevel: 151,
    endLevel: 180,
    rewardCoins: 750,
    themeCategory: 'cidades',
    bgGradient: 'from-amber-900 via-yellow-950 to-slate-950',
    accentColor: '#eab308',
    iconName: 'Landmark'
  },
  {
    id: 7,
    title: 'Capítulo 7',
    subtitle: 'Carnaval & Samba',
    biome: 'Euforia, Frevo & Ritmos',
    description: 'Bateria, serpentinas, mestre-sala, porta-bandeira e a magia do Carnaval.',
    startLevel: 181,
    endLevel: 210,
    rewardCoins: 800,
    themeCategory: 'carnaval',
    bgGradient: 'from-purple-800 via-fuchsia-950 to-slate-950',
    accentColor: '#a855f7',
    iconName: 'Sparkles'
  },
  {
    id: 8,
    title: 'Capítulo 8',
    subtitle: 'Paixão Futebol',
    biome: 'Estádios & Magia Verde-Amarela',
    description: 'Dribles desconcertantes, golaços, torcidas e o país pentacampeão.',
    startLevel: 211,
    endLevel: 240,
    rewardCoins: 850,
    themeCategory: 'futebol',
    bgGradient: 'from-emerald-800 via-green-950 to-slate-950',
    accentColor: '#22c55e',
    iconName: 'Trophy'
  },
  {
    id: 9,
    title: 'Capítulo 9',
    subtitle: 'Culinária dos Pampas',
    biome: 'Tradição Gaúcha & Churrasco',
    description: 'Costela de chão, chimarrão, ponchos e o calor dos galpões farroupilhas.',
    startLevel: 241,
    endLevel: 270,
    rewardCoins: 900,
    themeCategory: 'pampas',
    bgGradient: 'from-red-900 via-rose-950 to-slate-950',
    accentColor: '#ef4444',
    iconName: 'Flame'
  },
  {
    id: 10,
    title: 'Capítulo 10',
    subtitle: 'Lençóis & Dunas',
    biome: 'Oásis & Lagoas Cristalinas',
    description: 'Dunas de areia branca onduladas pelos ventos e lagoas cristalinas.',
    startLevel: 271,
    endLevel: 300,
    rewardCoins: 950,
    themeCategory: 'dunas',
    bgGradient: 'from-cyan-800 via-blue-950 to-slate-950',
    accentColor: '#06b6d4',
    iconName: 'Waves'
  },
  {
    id: 11,
    title: 'Capítulo 11',
    subtitle: 'Ritmos do Brasil',
    biome: 'Bossa Nova & Melodias',
    description: 'Bossa Nova suave, choro lírico, samba-rock contagiante e guitarras baianas.',
    startLevel: 301,
    endLevel: 330,
    rewardCoins: 1000,
    themeCategory: 'musica',
    bgGradient: 'from-indigo-800 via-purple-950 to-slate-950',
    accentColor: '#6366f1',
    iconName: 'Music'
  },
  {
    id: 12,
    title: 'Capítulo 12',
    subtitle: 'Sabores da Bahia',
    biome: 'Acarajé & Magia do Dendê',
    description: 'Acarajé crocante, moquecas fumegantes, vatapá aveludado e o axé de Salvador.',
    startLevel: 331,
    endLevel: 360,
    rewardCoins: 1000,
    themeCategory: 'culinaria_baiana',
    bgGradient: 'from-amber-800 via-red-950 to-slate-950',
    accentColor: '#f59e0b',
    iconName: 'Utensils'
  },
  {
    id: 13,
    title: 'Capítulo 13',
    subtitle: 'Minas de Ouro',
    biome: 'Pão de Queijo & Tradição',
    description: 'Fogão a lenha, queijo canastra premiado, cafezinho fresco e doces na fazenda.',
    startLevel: 361,
    endLevel: 390,
    rewardCoins: 1000,
    themeCategory: 'culinaria_mineira',
    bgGradient: 'from-yellow-900 via-amber-950 to-slate-950',
    accentColor: '#eab308',
    iconName: 'Coffee'
  },
  {
    id: 14,
    title: 'Capítulo 14',
    subtitle: 'Fernando de Noronha',
    biome: 'Santuário dos Golfinhos',
    description: 'Águas turquesas, morro do pico, golfinhos rotadores e recifes de corais.',
    startLevel: 391,
    endLevel: 420,
    rewardCoins: 1000,
    themeCategory: 'noronha',
    bgGradient: 'from-teal-800 via-blue-950 to-slate-950',
    accentColor: '#14b8a6',
    iconName: 'Compass'
  },
  {
    id: 15,
    title: 'Capítulo 15',
    subtitle: 'Folclore & Lendas',
    biome: 'Mitos da Noite Brasileira',
    description: 'Saci traquino, Curupira protetor da mata, encanto da Iara e lendas antigas.',
    startLevel: 421,
    endLevel: 450,
    rewardCoins: 1000,
    themeCategory: 'folclore',
    bgGradient: 'from-violet-900 via-purple-950 to-slate-950',
    accentColor: '#8b5cf6',
    iconName: 'Sparkles'
  },
  {
    id: 16,
    title: 'Capítulo 16',
    subtitle: 'Jalapão Encantado',
    biome: 'Fervedouros & Capim Dourado',
    description: 'Águas que não afundam, paredões avermelhados e o brilho do capim dourado.',
    startLevel: 451,
    endLevel: 480,
    rewardCoins: 1000,
    themeCategory: 'jalapao',
    bgGradient: 'from-orange-900 via-amber-950 to-slate-950',
    accentColor: '#ea580c',
    iconName: 'Sun'
  },
  {
    id: 17,
    title: 'Capítulo 17',
    subtitle: 'Cataratas do Iguaçu',
    biome: 'Força Monumental das Quedas',
    description: 'Garganta do Diabo estrondosa, névoas de arco-íris e o poder das águas.',
    startLevel: 481,
    endLevel: 510,
    rewardCoins: 1000,
    themeCategory: 'cataratas',
    bgGradient: 'from-blue-900 via-cyan-950 to-slate-950',
    accentColor: '#3b82f6',
    iconName: 'Waves'
  },
  {
    id: 18,
    title: 'Capítulo 18',
    subtitle: 'Festival de Parintins',
    biome: 'Garantido vs Caprichoso',
    description: 'Toadas pulsantes, cunhã-poranga deslumbrante e o espetáculo da Amazônia.',
    startLevel: 511,
    endLevel: 540,
    rewardCoins: 1000,
    themeCategory: 'parintins',
    bgGradient: 'from-rose-900 via-blue-950 to-slate-950',
    accentColor: '#f43f5e',
    iconName: 'Sparkles'
  },
  {
    id: 19,
    title: 'Capítulo 19',
    subtitle: 'Serra da Canastra',
    biome: 'Nascente do Velho Chico',
    description: 'Cachoeira Casca d’Anta, lobo-guará nas chapadas e horizontes sem fim.',
    startLevel: 541,
    endLevel: 570,
    rewardCoins: 1000,
    themeCategory: 'canastra',
    bgGradient: 'from-emerald-900 via-teal-950 to-slate-950',
    accentColor: '#10b981',
    iconName: 'Compass'
  },
  {
    id: 20,
    title: 'Capítulo 20',
    subtitle: 'São Paulo Metrópole',
    biome: 'Avenida Paulista & Noite Cosmopolita',
    description: 'Arranha-céus iluminados, MASP, beco do batman, gastronomia e arte urbana.',
    startLevel: 571,
    endLevel: 600,
    rewardCoins: 1000,
    themeCategory: 'metropole',
    bgGradient: 'from-slate-800 via-zinc-900 to-slate-950',
    accentColor: '#64748b',
    iconName: 'Building'
  },
  {
    id: 21,
    title: 'Capítulo 21',
    subtitle: 'Rio Cidade Maravilhosa',
    biome: 'Cristo, Pão de Açúcar & Mar',
    description: 'Garota de Ipanema, Corcovado de braços abertos, Arcos da Lapa e calçadões.',
    startLevel: 601,
    endLevel: 630,
    rewardCoins: 1000,
    themeCategory: 'rio_maravilha',
    bgGradient: 'from-sky-900 via-blue-950 to-slate-950',
    accentColor: '#0284c7',
    iconName: 'Sun'
  },
  {
    id: 22,
    title: 'Capítulo 22',
    subtitle: 'Chapada dos Veadeiros',
    biome: 'Vale da Lua & Cristais',
    description: 'Formações lunares de pedra esculpidas pelas águas, cânions e céu estrelado.',
    startLevel: 631,
    endLevel: 660,
    rewardCoins: 1000,
    themeCategory: 'veadeiros',
    bgGradient: 'from-indigo-900 via-teal-950 to-slate-950',
    accentColor: '#6366f1',
    iconName: 'Moon'
  },
  {
    id: 23,
    title: 'Capítulo 23',
    subtitle: 'Riquezas do Cacau',
    biome: 'Costa do Cacau & Fazendas',
    description: 'Ilhéus mítica, fazendas históricas, amêndoas ao sol e chocolate artesanal.',
    startLevel: 661,
    endLevel: 690,
    rewardCoins: 1000,
    themeCategory: 'cacau',
    bgGradient: 'from-amber-950 via-yellow-950 to-slate-950',
    accentColor: '#b45309',
    iconName: 'Apple'
  },
  {
    id: 24,
    title: 'Capítulo 24',
    subtitle: 'Festas Juninas',
    biome: 'Fogueiras, Pamonha & Xote',
    description: 'Maior São João do mundo em Caruaru e Campina Grande, quadrilhas e alegria.',
    startLevel: 691,
    endLevel: 720,
    rewardCoins: 1000,
    themeCategory: 'festas_juninas',
    bgGradient: 'from-orange-900 via-red-950 to-slate-950',
    accentColor: '#f97316',
    iconName: 'Flame'
  },
  {
    id: 25,
    title: 'Capítulo 25',
    subtitle: 'Artesanato Brasileiro',
    biome: 'Mestres do Barro & Renda',
    description: 'Cerâmica marajoara ancestral, barro de Vitalino, renda renascença e talento puro.',
    startLevel: 721,
    endLevel: 750,
    rewardCoins: 1200,
    themeCategory: 'artesanato',
    bgGradient: 'from-yellow-900 via-amber-950 to-slate-950',
    accentColor: '#d97706',
    iconName: 'Sparkles'
  },
  {
    id: 26,
    title: 'Capítulo 26',
    subtitle: 'Fernando de Noronha',
    biome: 'Paraíso Ecológico & Golfinhos',
    description: 'Águas de tom esmeralda, golfinhos rotadores, praias eleitas as mais belas do mundo.',
    startLevel: 751,
    endLevel: 780,
    rewardCoins: 1300,
    themeCategory: 'noronha',
    bgGradient: 'from-teal-900 via-cyan-950 to-slate-950',
    accentColor: '#06b6d4',
    iconName: 'Waves'
  },
  {
    id: 27,
    title: 'Capítulo 27',
    subtitle: 'Chapada Diamantina',
    biome: 'Cânions, Poço Azul & Oásis',
    description: 'Poços de águas fluorescentes, cachoeira da Fumaça, lendas de garimpo e trilhas lendárias.',
    startLevel: 781,
    endLevel: 810,
    rewardCoins: 1400,
    themeCategory: 'diamantina',
    bgGradient: 'from-indigo-900 via-blue-950 to-slate-950',
    accentColor: '#6366f1',
    iconName: 'Compass'
  },
  {
    id: 28,
    title: 'Capítulo 28',
    subtitle: 'Vale dos Vinhedos',
    biome: 'Serra Gaúcha & Uvas',
    description: 'Parreirais exuberantes, cantinas históricas italianas, queijos nobres e a festa da vindima.',
    startLevel: 811,
    endLevel: 840,
    rewardCoins: 1500,
    themeCategory: 'vinhedos',
    bgGradient: 'from-purple-900 via-rose-950 to-slate-950',
    accentColor: '#9333ea',
    iconName: 'Apple'
  },
  {
    id: 29,
    title: 'Capítulo 29',
    subtitle: 'Rota das Emoções',
    biome: 'Delta do Parnaíba & Dunas',
    description: 'As dunas brancas e lagoas dos Lençóis, os guarás do Delta e o vento forte de Jericoacoara.',
    startLevel: 841,
    endLevel: 870,
    rewardCoins: 1600,
    themeCategory: 'emocoes',
    bgGradient: 'from-amber-900 via-orange-950 to-slate-950',
    accentColor: '#f59e0b',
    iconName: 'Sun'
  },
  {
    id: 30,
    title: 'Capítulo 30',
    subtitle: 'Grande Brasil Imperial',
    biome: 'Palácios & Glória da Pátria',
    description: 'O ápice da jornada: Petrópolis, coroa imperial, monumentos épicos e a história viva da pátria.',
    startLevel: 871,
    endLevel: 900,
    rewardCoins: 2500,
    themeCategory: 'brasil_ouro',
    bgGradient: 'from-amber-700 via-yellow-900 to-slate-950',
    accentColor: '#eab308',
    iconName: 'Trophy'
  }
];

export const CHAPTERS: ChapterData[] = BASE_CHAPTERS.map(ch => ({
  ...ch,
  bgOptions: getChapterBgOptions(ch.id, ch.subtitle, ch.bgGradient)
}));

export function getChapterForLevel(level: number): ChapterData {
  const found = CHAPTERS.find(c => level >= c.startLevel && level <= c.endLevel);
  return found || CHAPTERS[CHAPTERS.length - 1];
}

export function getChapterById(id: number): ChapterData {
  return CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
}
