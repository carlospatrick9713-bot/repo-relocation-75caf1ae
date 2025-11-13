import cristoRedentorImg from '@/assets/cristo-redentor.jpg';
import cristoRedentorImg2 from '@/assets/cristo-redentor-2.jpg';
import paoDeAcucarImg from '@/assets/pao-de-acucar.jpg';
import paoDeAcucarImg2 from '@/assets/pao-de-acucar-2.jpg';
import copacabanaImg from '@/assets/copacabana.jpg';
import copacabanaImg2 from '@/assets/copacabana-2.jpg';
import ipanemaImg from '@/assets/ipanema.jpg';
import maracanaImg from '@/assets/maracana.jpg';
import jardimBotanicoImg from '@/assets/jardim-botanico.jpg';
import santaTeresaImg from '@/assets/santa-teresa.jpg';
import lapaImg from '@/assets/lapa.jpg';
import parqueLageImg from '@/assets/parque-lage.jpg';
import lagoaImg from '@/assets/lagoa.jpg';
import theatroMunicipalImg from '@/assets/theatro-municipal.jpg';

export interface TouristSpot {
  id: number;
  name: string;
  risk: 'low' | 'medium' | 'high';
  image: string;
  images: string[];
  description: string;
  hours: string;
  tips: string[];
  placeId?: string;
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
    placeId: 'ChIJAZ-a03_5mQARcPs8sN6e4Y8',
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
  },
  {
    id: 6,
    name: 'Jardim Botânico',
    risk: 'low',
    image: jardimBotanicoImg,
    images: [jardimBotanicoImg],
    description: 'Um dos mais importantes jardins botânicos do mundo, com mais de 6.500 espécies de plantas tropicais e subtropicais. Refúgio verde no coração da cidade.',
    hours: '8h - 17h (todos os dias)',
    tips: [
      'Ideal para passeios em família',
      'Leve água e protetor solar',
      'Vista roupas confortáveis',
      'Melhor pela manhã quando está mais fresco'
    ],
    location: { lat: -22.9669, lng: -43.2247 }
  },
  {
    id: 7,
    name: 'Santa Teresa',
    risk: 'medium',
    image: santaTeresaImg,
    images: [santaTeresaImg],
    description: 'Bairro boêmio e charmoso, conhecido por suas ruas estreitas, casarões coloniais e o famoso bondinho amarelo. Centro cultural e artístico da cidade.',
    hours: 'Acesso livre (24h)',
    tips: [
      'Evite circular à noite',
      'Bondinho funciona em horários limitados',
      'Muitos ateliês e galerias de arte',
      'Ótimos bares e restaurantes'
    ],
    location: { lat: -22.9136, lng: -43.1888 }
  },
  {
    id: 8,
    name: 'Arcos da Lapa',
    risk: 'medium',
    image: lapaImg,
    images: [lapaImg],
    description: 'Aqueduto colonial do século XVIII que se tornou símbolo da vida noturna carioca. Área histórica com intensa programação cultural.',
    hours: 'Acesso livre (24h)',
    tips: [
      'Região muito movimentada à noite',
      'Cuidado com pertences',
      'Melhor visitar em grupo',
      'Muitas casas de show e samba'
    ],
    location: { lat: -22.9133, lng: -43.1792 }
  },
  {
    id: 9,
    name: 'Parque Lage',
    risk: 'low',
    image: parqueLageImg,
    images: [parqueLageImg],
    description: 'Parque público aos pés do Corcovado, com palacete histórico, jardins exuberantes e vista para o Cristo Redentor. Abriga Escola de Artes Visuais.',
    hours: '8h - 17h (todos os dias)',
    tips: [
      'Entrada gratuita',
      'Café dentro do palacete',
      'Trilha para o Corcovado inicia aqui',
      'Ótimo para fotos'
    ],
    location: { lat: -22.9598, lng: -43.2098 }
  },
  {
    id: 10,
    name: 'Lagoa Rodrigo de Freitas',
    risk: 'low',
    image: lagoaImg,
    images: [lagoaImg],
    description: 'Lagoa natural no coração da Zona Sul, cercada por pista de caminhada e ciclovia. Local favorito dos cariocas para atividades ao ar livre.',
    hours: 'Acesso livre (24h)',
    tips: [
      'Ideal para caminhar e andar de bicicleta',
      'Pedalinhos disponíveis para aluguel',
      'Muitas opções de quiosques',
      'Vista privilegiada do Cristo e Dois Irmãos'
    ],
    location: { lat: -22.9719, lng: -43.2051 }
  },
  {
    id: 11,
    name: 'Theatro Municipal',
    risk: 'low',
    image: theatroMunicipalImg,
    images: [theatroMunicipalImg],
    description: 'Majestoso teatro em estilo eclético, inspirado na Ópera de Paris. Um dos mais importantes teatros do Brasil, com programação de óperas, balés e concertos.',
    hours: 'Visitas guiadas: 11h, 12h, 13h, 14h e 15h (terça a sexta)',
    tips: [
      'Reserve visita guiada com antecedência',
      'Confira a programação de espetáculos',
      'Arquitetura deslumbrante',
      'Localizado no centro da cidade'
    ],
    location: { lat: -22.9089, lng: -43.1757 }
  }
];
