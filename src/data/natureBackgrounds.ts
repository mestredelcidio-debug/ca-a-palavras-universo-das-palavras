import nebulaImg from '../assets/images/cosmos_nebula_bg_1790823307384.jpg';
import galaxyImg from '../assets/images/cosmos_galaxy_bg_1790823320260.jpg';
import planetImg from '../assets/images/cosmos_planet_bg_1790823332545.jpg';
import supernovaImg from '../assets/images/cosmos_supernova_bg_1790823345703.jpg';
import auroraImg from '../assets/images/cosmos_aurora_bg_1790823358918.jpg';

export interface NatureBackground {
  id: string;
  name: string;
  category: 'floresta' | 'mar' | 'rio' | 'cachoeira' | 'classico' | 'nebulosa' | 'galaxia' | 'planeta' | 'supernova' | 'aurora';
  description: string;
  image: string;
  requiredStars: number;
  badge: string;
  tag: string;
}

export const NATURE_BACKGROUNDS: NatureBackground[] = [
  {
    id: 'floresta', // mapped to Nebulosa for seamless persistence
    name: 'Nebulosa Estelar Mística',
    category: 'nebulosa' as any,
    description: 'Poeira cósmica luminosa, gases violeta e magenta com constelações cintilantes.',
    image: nebulaImg,
    requiredStars: 0,
    badge: '🎁 GRÁTIS',
    tag: 'Nebulosa Cósmica'
  },
  {
    id: 'mar', // mapped to Galáxia for seamless persistence
    name: 'Galáxia Espiral dos Sonhos',
    category: 'galaxia' as any,
    description: 'Braços espirais celestes e núcleo brilhante de milhões de estrelas douradas.',
    image: galaxyImg,
    requiredStars: 0,
    badge: '🎁 GRÁTIS',
    tag: 'Via Láctea'
  },
  {
    id: 'rio', // mapped to Planeta for seamless persistence
    name: 'Planeta dos Anéis & Exomundo',
    category: 'planeta' as any,
    description: 'Um exoplaneta majestoso com anéis de poeira estelar flutuando no cosmos profundo.',
    image: planetImg,
    requiredStars: 30,
    badge: '⭐ 30 ESTRELAS',
    tag: 'Sistema Planetário'
  },
  {
    id: 'cachoeira', // mapped to Supernova for seamless persistence
    name: 'Supernova & Clarão Cósmico',
    category: 'supernova' as any,
    description: 'O nascimento radiante de estrelas em filamentos de luz dourada e azul celeste.',
    image: supernovaImg,
    requiredStars: 45,
    badge: '⭐ 45 ESTRELAS',
    tag: 'Supernova'
  },
  {
    id: 'classico', // mapped to Aurora Espacial for seamless persistence
    name: 'Aurora Boreal Espacial',
    category: 'aurora' as any,
    description: 'Ondas mágicas de luz esmeralda e violeta dançando sob a luz das galáxias distantes.',
    image: auroraImg,
    requiredStars: 0,
    badge: '🎁 GRÁTIS',
    tag: 'Aurora Cósmica'
  }
];

export function getNatureBackgroundById(id?: string): NatureBackground {
  return NATURE_BACKGROUNDS.find(b => b.id === id) || NATURE_BACKGROUNDS[0];
}
