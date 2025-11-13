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
  'Brasileira': foodBrasileira,
  'Italiana': foodItaliana,
  'Japonesa': foodJaponesa,
  'Francesa': foodFrancesa,
  'Árabe': foodArabe,
  'Frutos do Mar': foodFrutosMar,
  'Churrascaria': foodChurrascaria,
  'Contemporânea': foodContemporanea,
  'Vegetariana': foodVegetariana,
  'Internacional': foodInternacional,
};

export const cuisineTypes = [
  'Brasileira',
  'Italiana',
  'Japonesa',
  'Francesa',
  'Árabe',
  'Frutos do Mar',
  'Churrascaria',
  'Contemporânea',
  'Vegetariana',
  'Internacional'
];

// Gerando 200 restaurantes diversos
export const restaurants: Restaurant[] = [
  // Brasileira (30 restaurantes)
  {
    id: 1,
    name: "Confeitaria Colombo",
    cuisine: "Brasileira",
    description: "Tradicional confeitaria carioca desde 1894, com arquitetura Belle Époque e culinária clássica brasileira.",
    priceRange: "R$ 80-150",
    averagePrice: 115,
    hours: "09:00 - 19:00",
    image: cuisineImages['Brasileira'],
    rating: 4.8
  },
  {
    id: 2,
    name: "Casa Paladino",
    cuisine: "Brasileira",
    description: "Restaurante no Jardim Botânico com ambiente acolhedor e pratos tradicionais brasileiros.",
    priceRange: "R$ 90-180",
    averagePrice: 135,
    hours: "12:00 - 23:00",
    image: cuisineImages['Brasileira'],
    rating: 4.7
  },
  {
    id: 3,
    name: "Aprazível",
    cuisine: "Brasileira",
    description: "Em Santa Teresa, oferece vista panorâmica e cozinha brasileira contemporânea.",
    priceRange: "R$ 120-220",
    averagePrice: 170,
    hours: "12:00 - 00:00",
    image: cuisineImages['Brasileira'],
    rating: 4.9
  },
  ...Array.from({ length: 27 }, (_, i) => ({
    id: i + 4,
    name: `Restaurante Brasileiro ${i + 1}`,
    cuisine: "Brasileira",
    description: "Autêntica culinária brasileira com ingredientes locais e receitas tradicionais.",
    priceRange: "R$ 70-160",
    averagePrice: 100 + Math.floor(Math.random() * 60),
    hours: "11:30 - 23:00",
    image: cuisineImages['Brasileira'],
    rating: 4.3 + Math.random() * 0.6
  })),

  // Italiana (25 restaurantes)
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 31,
    name: `Trattoria ${i + 1}`,
    cuisine: "Italiana",
    description: "Autêntica cozinha italiana com massas frescas e molhos artesanais.",
    priceRange: "R$ 90-200",
    averagePrice: 120 + Math.floor(Math.random() * 80),
    hours: "12:00 - 23:30",
    image: cuisineImages['Italiana'],
    rating: 4.4 + Math.random() * 0.5
  })),

  // Japonesa (25 restaurantes)
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 56,
    name: `Sushi ${i + 1}`,
    cuisine: "Japonesa",
    description: "Culinária japonesa refinada com ingredientes frescos e apresentação impecável.",
    priceRange: "R$ 100-250",
    averagePrice: 140 + Math.floor(Math.random() * 110),
    hours: "12:00 - 23:00",
    image: cuisineImages['Japonesa'],
    rating: 4.5 + Math.random() * 0.4
  })),

  // Francesa (20 restaurantes)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 81,
    name: `Bistro ${i + 1}`,
    cuisine: "Francesa",
    description: "Elegante culinária francesa com técnicas clássicas e vinhos selecionados.",
    priceRange: "R$ 150-350",
    averagePrice: 220 + Math.floor(Math.random() * 130),
    hours: "19:00 - 23:30",
    image: cuisineImages['Francesa'],
    rating: 4.6 + Math.random() * 0.3
  })),

  // Árabe (15 restaurantes)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 101,
    name: `Restaurante Árabe ${i + 1}`,
    cuisine: "Árabe",
    description: "Sabores autênticos do Oriente Médio com especiarias e pratos tradicionais.",
    priceRange: "R$ 70-140",
    averagePrice: 95 + Math.floor(Math.random() * 45),
    hours: "11:00 - 23:00",
    image: cuisineImages['Árabe'],
    rating: 4.4 + Math.random() * 0.5
  })),

  // Frutos do Mar (20 restaurantes)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 116,
    name: `Mar & Cia ${i + 1}`,
    cuisine: "Frutos do Mar",
    description: "Frutos do mar frescos do dia com preparos especiais e vista para o mar.",
    priceRange: "R$ 110-280",
    averagePrice: 170 + Math.floor(Math.random() * 110),
    hours: "12:00 - 22:00",
    image: cuisineImages['Frutos do Mar'],
    rating: 4.5 + Math.random() * 0.4
  })),

  // Churrascaria (20 restaurantes)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 136,
    name: `Churrascaria ${i + 1}`,
    cuisine: "Churrascaria",
    description: "Rodízio de carnes nobres com buffet completo e atendimento premium.",
    priceRange: "R$ 90-180",
    averagePrice: 120 + Math.floor(Math.random() * 60),
    hours: "11:30 - 00:00",
    image: cuisineImages['Churrascaria'],
    rating: 4.3 + Math.random() * 0.6
  })),

  // Contemporânea (15 restaurantes)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 156,
    name: `Fusion ${i + 1}`,
    cuisine: "Contemporânea",
    description: "Cozinha de autor com técnicas modernas e ingredientes selecionados.",
    priceRange: "R$ 180-400",
    averagePrice: 260 + Math.floor(Math.random() * 140),
    hours: "19:00 - 23:00",
    image: cuisineImages['Contemporânea'],
    rating: 4.7 + Math.random() * 0.2
  })),

  // Vegetariana (15 restaurantes)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 171,
    name: `Veggie ${i + 1}`,
    cuisine: "Vegetariana",
    description: "Culinária vegetariana e vegana criativa com ingredientes orgânicos.",
    priceRange: "R$ 60-120",
    averagePrice: 80 + Math.floor(Math.random() * 40),
    hours: "11:00 - 22:00",
    image: cuisineImages['Vegetariana'],
    rating: 4.5 + Math.random() * 0.4
  })),

  // Internacional (15 restaurantes)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 186,
    name: `World Cuisine ${i + 1}`,
    cuisine: "Internacional",
    description: "Pratos de diversas partes do mundo em um menu eclético e sofisticado.",
    priceRange: "R$ 100-220",
    averagePrice: 150 + Math.floor(Math.random() * 70),
    hours: "12:00 - 23:30",
    image: cuisineImages['Internacional'],
    rating: 4.4 + Math.random() * 0.5
  }))
];
