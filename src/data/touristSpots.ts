import cristoRedentorImg from '@/assets/cristo-redentor.jpg';
import cristoRedentorImg2 from '@/assets/cristo-redentor-2.jpg';
import paoDeAcucarImg from '@/assets/pao-de-acucar.jpg';
import paoDeAcucarImg2 from '@/assets/pao-de-acucar-2.jpg';
import copacabanaImg from '@/assets/copacabana.jpg';
import copacabanaImg2 from '@/assets/copacabana-2.jpg';
import ipanemaImg from '@/assets/ipanema.jpg';
import maracanaImg from '@/assets/maracana.jpg';

export interface TouristSpot {
  id: number;
  name: string;
  risk: 'low' | 'medium' | 'high';
  image: string;
  images: string[];
  description: string;
  hours: string;
  tips: string[];
  location: {
    lat: number;
    lng: number;
  };
}

export const touristSpots: TouristSpot[] = [
  {
    id: 1,
    name: 'Cristo Redentor',
    risk: 'low',
    image: cristoRedentorImg,
    images: [cristoRedentorImg, cristoRedentorImg2],
    description: 'Um dos cartões postais mais icônicos do Rio de Janeiro e uma das Sete Maravilhas do Mundo Moderno. A estátua de 38 metros de altura oferece uma vista panorâmica deslumbrante da cidade.',
    hours: '8h - 19h (todos os dias)',
    tips: [
      'Reserve ingressos com antecedência',
      'Melhor horário: manhã cedo ou final da tarde',
      'Use protetor solar e leve água',
      'Vista roupas confortáveis para caminhar'
    ],
    location: { lat: -22.9519, lng: -43.2105 }
  },
  {
    id: 2,
    name: 'Pão de Açúcar',
    risk: 'low',
    image: paoDeAcucarImg,
    images: [paoDeAcucarImg, paoDeAcucarImg2],
    description: 'Complexo de morros à beira da Baía de Guanabara, acessível por teleférico. Oferece vistas espetaculares do Rio, especialmente ao pôr do sol.',
    hours: '8h - 21h (todos os dias)',
    tips: [
      'Vá no fim da tarde para ver o pôr do sol',
      'O teleférico tem duas etapas',
      'Há restaurante no topo',
      'Reserve pelo menos 2-3 horas para a visita'
    ],
    location: { lat: -22.9489, lng: -43.1567 }
  },
  {
    id: 3,
    name: 'Copacabana',
    risk: 'medium',
    image: copacabanaImg,
    images: [copacabanaImg, copacabanaImg2],
    description: 'Uma das praias mais famosas do mundo, conhecida por sua calçada em mosaico de pedras portuguesas. Local de intensa vida social e cultural carioca.',
    hours: 'Acesso livre (24h)',
    tips: [
      'Evite levar objetos de valor',
      'Cuidado com os pertences na praia',
      'Melhor horário: manhã cedo ou fim de tarde',
      'Experimente água de coco e açaí na orla'
    ],
    location: { lat: -22.9711, lng: -43.1822 }
  },
  {
    id: 4,
    name: 'Ipanema',
    risk: 'low',
    image: ipanemaImg,
    images: [ipanemaImg],
    description: 'Praia sofisticada e cosmopolita, famosa mundialmente pela música "Garota de Ipanema". Vista privilegiada do Morro Dois Irmãos e pôr do sol espetacular.',
    hours: 'Acesso livre (24h)',
    tips: [
      'Melhor pôr do sol do Rio',
      'Área mais segura que Copacabana',
      'Ótimos bares e restaurantes na região',
      'Posto 9 é o point dos cariocas'
    ],
    location: { lat: -22.9838, lng: -43.2044 }
  },
  {
    id: 5,
    name: 'Maracanã',
    risk: 'medium',
    image: maracanaImg,
    images: [maracanaImg],
    description: 'Um dos estádios mais famosos do mundo, palco de momentos históricos do futebol. Oferece tours guiados e museu do futebol.',
    hours: 'Tours: 9h - 17h (segunda a sábado)',
    tips: [
      'Reserve tour com antecedência',
      'Dias de jogo tem horários especiais',
      'Área segura durante eventos',
      'Use transporte por aplicativo'
    ],
    location: { lat: -22.9122, lng: -43.2302 }
  }
];
