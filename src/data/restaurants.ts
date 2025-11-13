import foodBrasileira from '@/assets/food-brasileira.jpg';
import foodItaliana from '@/assets/food-italiana.jpg';
import foodJaponesa from '@/assets/food-japonesa.jpg';
import foodFrancesa from '@/assets/food-francesa.jpg';
import foodArabe from '@/assets/food-arabe.jpg';
import foodFrutosMar from '@/assets/food-frutos-mar.jpg';
import foodChurrascaria from '@/assets/food-churrascaria.jpg';
import foodContemporanea from '@/assets/food-contemporanea.jpg';
import foodVegetariana from '@/assets/food-vegetariana.jpg';
import foodInternacional from '@/assets/food-internacional.jpg';

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
}

const cuisineImages: Record<string, string> = {
  'Contemporânea': foodContemporanea,
  'Italiana': foodItaliana,
  'Japonesa': foodJaponesa,
  'Francesa': foodFrancesa,
  'Frutos do Mar': foodFrutosMar,
  'Churrascaria': foodChurrascaria,
  'Vegetariana': foodVegetariana,
  'Portuguesa': foodBrasileira,
};

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
    image: cuisineImages['Contemporânea'],
    rating: 4.9
  },
  {
    id: 2,
    name: "Lasai",
    cuisine: "Contemporânea",
    description: "Destaque da cena gastronômica carioca, com proposta moderna e criativa, buscando excelência e valorização de ingredientes locais. Aparece em listas de melhores restaurantes da América Latina.",
    priceRange: "R$ 350-700",
    averagePrice: 525,
    hours: "19:00 - 23:30",
    image: cuisineImages['Contemporânea'],
    rating: 4.9
  },
  {
    id: 3,
    name: "Cipriani",
    cuisine: "Italiana",
    description: "Restaurante de culinária italiana no hotel de luxo Belmond Copacabana Palace, indicado por guias de alta gastronomia. Presença em rankings para o Rio.",
    priceRange: "R$ 300-600",
    averagePrice: 450,
    hours: "12:00 - 23:30",
    image: cuisineImages['Italiana'],
    rating: 4.8
  },
  {
    id: 4,
    name: "Chez Claude",
    cuisine: "Francesa",
    description: "Brasserie francesa com toque sofisticado, uma boa escolha para quem quer jantar em estilo europeu no coração da Zona Sul.",
    priceRange: "R$ 250-500",
    averagePrice: 375,
    hours: "12:00 - 00:00",
    image: cuisineImages['Francesa'],
    rating: 4.7
  },
  {
    id: 5,
    name: "San Omakase",
    cuisine: "Japonesa",
    description: "Para os fãs de sushi de alta qualidade: omakase (menu fechado) que exige reserva e traz experiência privilegiada de culinária japonesa no Rio.",
    priceRange: "R$ 400-800",
    averagePrice: 600,
    hours: "19:00 - 23:00",
    image: cuisineImages['Japonesa'],
    rating: 4.9
  },
  {
    id: 6,
    name: "Oseille",
    cuisine: "Contemporânea",
    description: "Nova estrela na cena gourmet carioca, reconhecido pelo guia Michelin Guide Rio de Janeiro como restaurante com estrela.",
    priceRange: "R$ 350-700",
    averagePrice: 525,
    hours: "19:00 - 23:00",
    image: cuisineImages['Contemporânea'],
    rating: 4.9
  },
  {
    id: 7,
    name: "Toto Restaurante",
    cuisine: "Contemporânea",
    description: "Listagem recente entre os 'melhores restaurantes do Rio' segundo ranking da revista Exame.",
    priceRange: "R$ 300-600",
    averagePrice: 450,
    hours: "19:00 - 23:30",
    image: cuisineImages['Contemporânea'],
    rating: 4.8
  },
  {
    id: 8,
    name: "Koral",
    cuisine: "Frutos do Mar",
    description: "Especializado em frutos do mar, aparece no ranking dos 'melhores restaurantes do Rio' para 2024 da Exame.",
    priceRange: "R$ 280-550",
    averagePrice: 415,
    hours: "12:00 - 23:00",
    image: cuisineImages['Frutos do Mar'],
    rating: 4.7
  },
  {
    id: 9,
    name: "Babbo Osteria",
    cuisine: "Italiana",
    description: "Osteria italiana bem localizada em Ipanema, boa opção para quem quer uma experiência gastronômica agradável sem ir para extremo luxo.",
    priceRange: "R$ 180-350",
    averagePrice: 265,
    hours: "12:00 - 00:00",
    image: cuisineImages['Italiana'],
    rating: 4.6
  },
  {
    id: 10,
    name: "Gajos d' Ouro",
    cuisine: "Portuguesa",
    description: "Restaurante de culinária portuguesa no Rio, indicado nas listas gastronômicas para quem quer variar do contemporâneo.",
    priceRange: "R$ 150-300",
    averagePrice: 225,
    hours: "12:00 - 23:00",
    image: cuisineImages['Portuguesa'],
    rating: 4.6
  },
  {
    id: 11,
    name: "Satyricon",
    cuisine: "Frutos do Mar",
    description: "Clássico restaurante de frutos do mar na Zona Sul, ótimo para uma refeição mais sofisticada com ambientação elegante.",
    priceRange: "R$ 250-500",
    averagePrice: 375,
    hours: "12:00 - 00:00",
    image: cuisineImages['Frutos do Mar'],
    rating: 4.7
  },
  {
    id: 12,
    name: "Teva Bistro",
    cuisine: "Vegetariana",
    description: "Para quem busca opções vegetarianas/veganas no Rio, essa é uma escolha interessante, com boa reputação entre gourmet mais consciente.",
    priceRange: "R$ 80-160",
    averagePrice: 120,
    hours: "11:00 - 22:00",
    image: cuisineImages['Vegetariana'],
    rating: 4.6
  },
  {
    id: 13,
    name: "Encarnado",
    cuisine: "Contemporânea",
    description: "Uma excelente alternativa para hambúrguer gourmet de qualidade no Rio, mencionada nas listas de 'melhores por categoria'.",
    priceRange: "R$ 70-140",
    averagePrice: 105,
    hours: "18:00 - 00:00",
    image: cuisineImages['Contemporânea'],
    rating: 4.5
  },
  {
    id: 14,
    name: "Ferro e Farinha",
    cuisine: "Italiana",
    description: "Para os amantes de pizza estilo napolitana ou artesanal, essa pizzaria no Rio merece visita e aparece entre recomendações gastronômicas especializadas.",
    priceRange: "R$ 80-150",
    averagePrice: 115,
    hours: "18:00 - 23:30",
    image: cuisineImages['Italiana'],
    rating: 4.6
  },
  {
    id: 15,
    name: "Rubaiyat",
    cuisine: "Churrascaria",
    description: "Restaurante sofisticado, conhecido pelas carnes e ambiente elegante — uma boa opção para jantar especial no Rio.",
    priceRange: "R$ 200-400",
    averagePrice: 300,
    hours: "12:00 - 00:00",
    image: cuisineImages['Churrascaria'],
    rating: 4.7
  },
  {
    id: 16,
    name: "Gero Rio",
    cuisine: "Italiana",
    description: "Italiano refinado à beira-mar em Ipanema, para quem quer uma experiência gastronômica sofisticada com vista privilegiada.",
    priceRange: "R$ 250-500",
    averagePrice: 375,
    hours: "12:00 - 00:00",
    image: cuisineImages['Italiana'],
    rating: 4.8
  },
  {
    id: 17,
    name: "Casa 201",
    cuisine: "Contemporânea",
    description: "Novo destaque da cena gastronômica carioca, recentemente reconhecido pelo guia Michelin.",
    priceRange: "R$ 300-600",
    averagePrice: 450,
    hours: "19:00 - 23:00",
    image: cuisineImages['Contemporânea'],
    rating: 4.8
  },
  {
    id: 18,
    name: "Mocellin Steakhouse",
    cuisine: "Churrascaria",
    description: "Para quem ama carnes premium e busca uma experiência de steakhouse de alto nível no Rio.",
    priceRange: "R$ 180-350",
    averagePrice: 265,
    hours: "12:00 - 00:00",
    image: cuisineImages['Churrascaria'],
    rating: 4.7
  },
  {
    id: 19,
    name: "Ella",
    cuisine: "Italiana",
    description: "Pizzaria gourmet localizada no bairro do Jardim Botânico com boas recomendações para ambientes mais descontraídos mas sofisticados.",
    priceRange: "R$ 90-180",
    averagePrice: 135,
    hours: "18:00 - 23:30",
    image: cuisineImages['Italiana'],
    rating: 4.6
  },
  {
    id: 20,
    name: "Teva",
    cuisine: "Vegetariana",
    description: "Boa opção vegetariana/vegana para turistas que querem fugir da carne pesada — ambiente acolhedor e comida bem elaborada.",
    priceRange: "R$ 80-160",
    averagePrice: 120,
    hours: "11:00 - 22:00",
    image: cuisineImages['Vegetariana'],
    rating: 4.6
  }
];
