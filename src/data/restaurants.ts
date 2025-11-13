import imgOro from '@/assets/restaurant-oro.jpg';
import imgLasai from '@/assets/restaurant-lasai.jpg';
import imgCipriani from '@/assets/restaurant-cipriani.jpg';
import imgChezClaude from '@/assets/restaurant-chez-claude.jpg';
import imgSanOmakase from '@/assets/restaurant-san-omakase.jpg';
import imgOseille from '@/assets/restaurant-oseille.jpg';
import imgToto from '@/assets/restaurant-toto.jpg';
import imgKoral from '@/assets/restaurant-koral.jpg';
import imgBabbo from '@/assets/restaurant-babbo.jpg';
import imgGajos from '@/assets/restaurant-gajos.jpg';
import imgSatyricon from '@/assets/restaurant-satyricon.jpg';
import imgTevaBistro from '@/assets/restaurant-teva-bistro.jpg';
import imgEncarnado from '@/assets/restaurant-encarnado.jpg';
import imgFerro from '@/assets/restaurant-ferro.jpg';
import imgRubaiyat from '@/assets/restaurant-rubaiyat.jpg';
import imgGero from '@/assets/restaurant-gero.jpg';
import imgCasa201 from '@/assets/restaurant-casa201.jpg';
import imgMocellin from '@/assets/restaurant-mocellin.jpg';
import imgElla from '@/assets/restaurant-ella.jpg';
import imgTeva from '@/assets/restaurant-teva.jpg';

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  description: string;
  priceRange: string;
  averagePrice: number;
  hours: string;
  image: string;
  rating: number;
  lat: number;
  lng: number;
}

export const cuisineTypes = [
  'Contemporânea',
  'Italiana',
  'Japonesa',
  'Francesa',
  'Frutos do Mar',
  'Vegetariana',
  'Churrascaria',
  'Portuguesa'
];

// 20 melhores restaurantes do Rio de Janeiro
export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Oro",
    cuisine: "Contemporânea",
    description: "Restaurante de alta gastronomia do chef Gustavo Bittencourt, com menu degustação focado em ingredientes brasileiros em versão refinada. Figura em rankings latino-americanos de restaurantes de destaque.",
    priceRange: "R$ 400-800",
    averagePrice: 600,
    hours: "19:00 - 23:00",
    image: imgOro,
    rating: 4.9,
    lat: -22.9843,
    lng: -43.1964
  },
  {
    id: 2,
    name: "Lasai",
    cuisine: "Contemporânea",
    description: "Destaque da cena gastronômica carioca, com proposta moderna e criativa, buscando excelência e valorização de ingredientes locais. Aparece em listas de melhores restaurantes da América Latina.",
    priceRange: "R$ 350-700",
    averagePrice: 525,
    hours: "19:00 - 23:30",
    image: imgLasai,
    rating: 4.9,
    lat: -22.9522,
    lng: -43.1936
  },
  {
    id: 3,
    name: "Cipriani",
    cuisine: "Italiana",
    description: "Restaurante de culinária italiana no hotel de luxo Belmond Copacabana Palace, indicado por guias de alta gastronomia. Presença em rankings para o Rio.",
    priceRange: "R$ 300-600",
    averagePrice: 450,
    hours: "12:00 - 23:30",
    image: imgCipriani,
    rating: 4.8,
    lat: -22.9703,
    lng: -43.1777
  },
  {
    id: 4,
    name: "Chez Claude",
    cuisine: "Francesa",
    description: "Brasserie francesa com toque sofisticado, uma boa escolha para quem quer jantar em estilo europeu no coração da Zona Sul.",
    priceRange: "R$ 250-500",
    averagePrice: 375,
    hours: "12:00 - 00:00",
    image: imgChezClaude,
    rating: 4.7,
    lat: -22.9847,
    lng: -43.1973
  },
  {
    id: 5,
    name: "San Omakase",
    cuisine: "Japonesa",
    description: "Para os fãs de sushi de alta qualidade: omakase (menu fechado) que exige reserva e traz experiência privilegiada de culinária japonesa no Rio.",
    priceRange: "R$ 400-800",
    averagePrice: 600,
    hours: "19:00 - 23:00",
    image: imgSanOmakase,
    rating: 4.9,
    lat: -22.9838,
    lng: -43.2044
  },
  {
    id: 6,
    name: "Oseille",
    cuisine: "Contemporânea",
    description: "Nova estrela na cena gourmet carioca, reconhecido pelo guia Michelin Guide Rio de Janeiro como restaurante com estrela.",
    priceRange: "R$ 350-700",
    averagePrice: 525,
    hours: "19:00 - 23:00",
    image: imgOseille,
    rating: 4.9,
    lat: -22.9710,
    lng: -43.1825
  },
  {
    id: 7,
    name: "Toto Restaurante",
    cuisine: "Contemporânea",
    description: "Listagem recente entre os 'melhores restaurantes do Rio' segundo ranking da revista Exame.",
    priceRange: "R$ 300-600",
    averagePrice: 450,
    hours: "19:00 - 23:30",
    image: imgToto,
    rating: 4.8,
    lat: -22.9751,
    lng: -43.1855
  },
  {
    id: 8,
    name: "Koral",
    cuisine: "Frutos do Mar",
    description: "Especializado em frutos do mar, aparece no ranking dos 'melhores restaurantes do Rio' para 2024 da Exame.",
    priceRange: "R$ 280-550",
    averagePrice: 415,
    hours: "12:00 - 23:00",
    image: imgKoral,
    rating: 4.7,
    lat: -22.9835,
    lng: -43.2049
  },
  {
    id: 9,
    name: "Babbo Osteria",
    cuisine: "Italiana",
    description: "Osteria italiana bem localizada em Ipanema, boa opção para quem quer uma experiência gastronômica agradável sem ir para extremo luxo.",
    priceRange: "R$ 180-350",
    averagePrice: 265,
    hours: "12:00 - 00:00",
    image: imgBabbo,
    rating: 4.6,
    lat: -22.9843,
    lng: -43.2039
  },
  {
    id: 10,
    name: "Gajos d' Ouro",
    cuisine: "Portuguesa",
    description: "Restaurante de culinária portuguesa no Rio, indicado nas listas gastronômicas para quem quer variar do contemporâneo.",
    priceRange: "R$ 150-300",
    averagePrice: 225,
    hours: "12:00 - 23:00",
    image: imgGajos,
    rating: 4.6,
    lat: -22.9849,
    lng: -43.2056
  },
  {
    id: 11,
    name: "Satyricon",
    cuisine: "Frutos do Mar",
    description: "Clássico restaurante de frutos do mar na Zona Sul, ótimo para uma refeição mais sofisticada com ambientação elegante.",
    priceRange: "R$ 250-500",
    averagePrice: 375,
    hours: "12:00 - 00:00",
    image: imgSatyricon,
    rating: 4.7,
    lat: -22.9840,
    lng: -43.2047
  },
  {
    id: 12,
    name: "Teva Bistro",
    cuisine: "Vegetariana",
    description: "Para quem busca opções vegetarianas/veganas no Rio, essa é uma escolha interessante, com boa reputação entre gourmet mais consciente.",
    priceRange: "R$ 80-160",
    averagePrice: 120,
    hours: "11:00 - 22:00",
    image: imgTevaBistro,
    rating: 4.6,
    lat: -22.9798,
    lng: -43.1892
  },
  {
    id: 13,
    name: "Encarnado",
    cuisine: "Contemporânea",
    description: "Uma excelente alternativa para hambúrguer gourmet de qualidade no Rio, mencionada nas listas de 'melhores por categoria'.",
    priceRange: "R$ 70-140",
    averagePrice: 105,
    hours: "18:00 - 00:00",
    image: imgEncarnado,
    rating: 4.5,
    lat: -22.9855,
    lng: -43.2071
  },
  {
    id: 14,
    name: "Ferro e Farinha",
    cuisine: "Italiana",
    description: "Para os amantes de pizza estilo napolitana ou artesanal, essa pizzaria no Rio merece visita e aparece entre recomendações gastronômicas especializadas.",
    priceRange: "R$ 80-150",
    averagePrice: 115,
    hours: "18:00 - 23:30",
    image: imgFerro,
    rating: 4.6,
    lat: -22.9845,
    lng: -43.2062
  },
  {
    id: 15,
    name: "Rubaiyat",
    cuisine: "Churrascaria",
    description: "Restaurante sofisticado, conhecido pelas carnes e ambiente elegante — uma boa opção para jantar especial no Rio.",
    priceRange: "R$ 200-400",
    averagePrice: 300,
    hours: "12:00 - 00:00",
    image: imgRubaiyat,
    rating: 4.7,
    lat: -22.9776,
    lng: -43.1868
  },
  {
    id: 16,
    name: "Gero Rio",
    cuisine: "Italiana",
    description: "Italiano refinado à beira-mar em Ipanema, para quem quer uma experiência gastronômica sofisticada com vista privilegiada.",
    priceRange: "R$ 250-500",
    averagePrice: 375,
    hours: "12:00 - 00:00",
    image: imgGero,
    rating: 4.8,
    lat: -22.9844,
    lng: -43.2050
  },
  {
    id: 17,
    name: "Casa 201",
    cuisine: "Contemporânea",
    description: "Novo destaque da cena gastronômica carioca, recentemente reconhecido pelo guia Michelin.",
    priceRange: "R$ 300-600",
    averagePrice: 450,
    hours: "19:00 - 23:00",
    image: imgCasa201,
    rating: 4.8,
    lat: -22.9660,
    lng: -43.1817
  },
  {
    id: 18,
    name: "Mocellin Steakhouse",
    cuisine: "Churrascaria",
    description: "Para quem ama carnes premium e busca uma experiência de steakhouse de alto nível no Rio.",
    priceRange: "R$ 180-350",
    averagePrice: 265,
    hours: "12:00 - 00:00",
    image: imgMocellin,
    rating: 4.7,
    lat: -22.9720,
    lng: -43.1834
  },
  {
    id: 19,
    name: "Ella",
    cuisine: "Italiana",
    description: "Pizzaria gourmet localizada no bairro do Jardim Botânico com boas recomendações para ambientes mais descontraídos mas sofisticados.",
    priceRange: "R$ 90-180",
    averagePrice: 135,
    hours: "18:00 - 23:30",
    image: imgElla,
    rating: 4.6,
    lat: -22.9664,
    lng: -43.2242
  },
  {
    id: 20,
    name: "Teva",
    cuisine: "Vegetariana",
    description: "Boa opção vegetariana/vegana para turistas que querem fugir da carne pesada — ambiente acolhedor e comida bem elaborada.",
    priceRange: "R$ 80-160",
    averagePrice: 120,
    hours: "11:00 - 22:00",
    image: imgTeva,
    rating: 4.6,
    lat: -22.9652,
    lng: -43.1822
  }
];
