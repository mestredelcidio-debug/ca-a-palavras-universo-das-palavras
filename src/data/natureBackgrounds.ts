import florestaImg from '../assets/images/nature_floresta_bg_1790721196607.jpg';
import marImg from '../assets/images/nature_mar_bg_1790721208047.jpg';
import rioImg from '../assets/images/nature_rio_bg_1790721219055.jpg';
import cachoeiraImg from '../assets/images/nature_cachoeira_bg_1790721230415.jpg';
import beachImg from '../assets/images/beach_paradise_bg_1790595434475.jpg';

export interface NatureBackground {
  id: string;
  name: string;
  category: 'floresta' | 'mar' | 'rio' | 'cachoeira' | 'classico';
  description: string;
  image: string;
  requiredStars: number;
  badge: string;
  tag: string;
}

export const NATURE_BACKGROUNDS: NatureBackground[] = [
  {
    id: 'floresta',
    name: 'Floresta Tropical Exuberante',
    category: 'floresta',
    description: 'Raios dourados de sol atravessando a copa verdejante e folhas de palmeiras nativas.',
    image: florestaImg,
    requiredStars: 0,
    badge: '🎁 GRÁTIS',
    tag: 'Mata Tropical'
  },
  {
    id: 'mar',
    name: 'Mar Turquesa & Praia Paradisíaca',
    category: 'mar',
    description: 'Águas cristalinas em tons azul-turquesa e areias douradas do litoral brasileiro.',
    image: marImg,
    requiredStars: 0,
    badge: '🎁 GRÁTIS',
    tag: 'Oceano & Mar'
  },
  {
    id: 'rio',
    name: 'Rio Amazônico & Pantanal',
    category: 'rio',
    description: 'Águas esmeraldas serpenteando a floresta densa com reflexos do amanhecer.',
    image: rioImg,
    requiredStars: 30,
    badge: '⭐ 30 ESTRELAS',
    tag: 'Bacia Amazônica'
  },
  {
    id: 'cachoeira',
    name: 'Cachoeira & Lagoa Esmeralda',
    category: 'cachoeira',
    description: 'Quedas d’água majestosas desaguando em uma lagoa cristalina cercada de flores tropicais.',
    image: cachoeiraImg,
    requiredStars: 45,
    badge: '⭐ 45 ESTRELAS',
    tag: 'Santuário Natural'
  },
  {
    id: 'classico',
    name: 'Praia Tropical (Modo Clássico)',
    category: 'classico',
    description: 'O visual clássico e original do antigo modo de caça-palavras com coqueiros e brisa.',
    image: beachImg,
    requiredStars: 0,
    badge: '🎁 GRÁTIS',
    tag: 'Modo Clássico'
  }
];

export function getNatureBackgroundById(id?: string): NatureBackground {
  return NATURE_BACKGROUNDS.find(b => b.id === id) || NATURE_BACKGROUNDS[0];
}
