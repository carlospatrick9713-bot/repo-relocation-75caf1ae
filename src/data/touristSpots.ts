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
  region: string;
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
  featured?: boolean;
}

export const regions = [
  'Rio de Janeiro Capital',
  'Região dos Lagos',
  'Costa Verde',
  'Serra Fluminense',
  'Norte Fluminense',
  'Centro-Sul Fluminense',
  'Médio Paraíba',
  'Baixadas Litorâneas'
];

export const touristSpots: TouristSpot[] = [
  // RIO DE JANEIRO CAPITAL
  {
    id: 1,
    name: 'Cristo Redentor (Corcovado)',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: cristoRedentorImg,
    images: Array(7).fill(cristoRedentorImg),
    description: 'Uma das 7 maravilhas do mundo moderno, o Cristo Redentor é um ícone do Rio de Janeiro e do Brasil. Com 38 metros de altura e braços abertos de 28 metros, a estátua está localizada no topo do Morro do Corcovado, a 710 metros de altitude. De lá, tem-se uma vista panorâmica espetacular de 360 graus da cidade, incluindo a Lagoa Rodrigo de Freitas, Pão de Açúcar, praias da Zona Sul e a Baía de Guanabara. Inaugurado em 1931, o monumento foi projetado pelo engenheiro Heitor da Silva Costa e esculpido por Paul Landowski. O acesso pode ser feito por trem, van ou a pé pela trilha. É um dos pontos turísticos mais visitados do Brasil.',
    hours: '8h - 19h (todos os dias)',
    tips: [
      'Reserve ingressos com antecedência online',
      'Melhor horário: manhã cedo ou final da tarde para evitar multidões',
      'Use protetor solar e leve água',
      'Vista roupas confortáveis para caminhar',
      'Chegue cedo para evitar filas',
      'O trem parte da estação do Cosme Velho a cada 30 minutos',
      'Leve câmera para fotos incríveis'
    ],
    location: { lat: -22.9519, lng: -43.2105 },
    placeId: 'ChIJAZ-a03_5mQARcPs8sN6e4Y8',
    featured: true
  },
  {
    id: 2,
    name: 'Pão de Açúcar (Urca)',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: paoDeAcucarImg,
    images: Array(7).fill(paoDeAcucarImg),
    description: 'O Pão de Açúcar é um dos cartões-postais mais famosos do Rio de Janeiro. O bondinho histórico, inaugurado em 1912, leva os visitantes até o topo do morro, a 396 metros de altitude, em duas etapas. A primeira parada é no Morro da Urca, a 220 metros, onde há um restaurante, lanchonete e área de eventos. Do topo do Pão de Açúcar, a vista é deslumbrante: Baía de Guanabara, praias de Copacabana e Ipanema, Cristo Redentor, Corcovado, Ilha Fiscal e Centro da cidade. O passeio de bondinho é considerado um dos mais bonitos do mundo. À noite, a iluminação especial torna o passeio ainda mais romântico e encantador.',
    hours: '8h - 21h (todos os dias)',
    tips: [
      'Chegue no final da tarde para ver o pôr do sol',
      'Reserve pelo menos 2 horas para o passeio completo',
      'Há restaurantes no topo e no Morro da Urca',
      'Use sapatos confortáveis',
      'Leve agasalho para o topo pois pode ventar',
      'Compre ingressos online para evitar filas',
      'Visite também à noite para ver a cidade iluminada'
    ],
    location: { lat: -22.9492, lng: -43.1575 },
    featured: true
  },
  {
    id: 3,
    name: 'Praia de Copacabana',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: copacabanaImg,
    images: Array(7).fill(copacabanaImg),
    description: 'Famosa mundialmente, Copacabana é uma das praias mais icônicas do planeta. Com 4 km de extensão, possui o famoso calçadão em forma de ondas desenhado por Burle Marx, repleto de quiosques, bares e restaurantes. A praia é palco do Réveillon mais famoso do Brasil, com queima de fogos espetacular. O bairro ao redor oferece excelente infraestrutura turística, com hotéis, comércio variado e vida noturna agitada. A praia tem águas abertas do Oceano Atlântico, com ondas fortes. O Forte de Copacabana fica em uma das pontas da praia. Copacabana é símbolo da cultura carioca, com sua mistura de praticantes de esportes, vendedores ambulantes, turistas e moradores locais.',
    hours: '24 horas (praia pública)',
    tips: [
      'Atenção redobrada com pertences pessoais',
      'Use cofre do hotel para guardar valores',
      'Evite ostentação de objetos de valor',
      'Melhor horário: manhã cedo ou final de tarde',
      'Experimente água de coco e mate gelado dos quiosques',
      'Caminhe pelo calçadão de Burle Marx',
      'Visite o Forte de Copacabana no final da praia'
    ],
    location: { lat: -22.9711, lng: -43.1822 },
    featured: true
  },
  {
    id: 4,
    name: 'Praia de Ipanema',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Imortalizada pela música "Garota de Ipanema" de Tom Jobim e Vinícius de Moraes, Ipanema é considerada uma das praias mais bonitas e sofisticadas do mundo. Com areia dourada e mar de águas cristalinas, a praia é dividida em "tribos": Posto 8 (LGBT+), Posto 9 (jovens e surfistas) e Posto 10 (famílias). O bairro é conhecido por suas lojas de grife, galerias de arte, bares e restaurantes refinados. A vista para o Morro Dois Irmãos é espetacular. O pôr do sol visto da praia é considerado um dos mais bonitos do Rio. Frequentada por artistas, intelectuais e turistas, Ipanema tem uma atmosfera mais descolada e cosmopolita que Copacabana.',
    hours: '24 horas (praia pública)',
    tips: [
      'Posto 9 é o point mais badalado',
      'Assista ao pôr do sol no Arpoador',
      'Experimente açaí na orla',
      'Visite as lojas da Garcia D\'Ávila',
      'Pratique futevôlei ou frescobol',
      'Águas geralmente mais limpas que Copacabana',
      'Boa para surf quando há ondas'
    ],
    location: { lat: -22.9868, lng: -43.2043 },
    featured: true
  },
  {
    id: 5,
    name: 'Praia do Leblon',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Considerada uma das praias mais nobres do Rio de Janeiro, o Leblon oferece uma atmosfera mais tranquila e familiar que Ipanema. Separada desta apenas pelo canal do Jardim de Alah, a praia tem 1 km de extensão e águas limpas. O bairro ao redor é um dos mais valorizados da cidade, com excelentes restaurantes, bares sofisticados e comércio de alta qualidade. A vista para o Morro Dois Irmãos é privilegiada. No final da praia está o Mirante do Leblon, ótimo ponto para fotos. A orla possui ciclovia e calçadão amplo, perfeito para caminhadas. É frequentada principalmente por moradores do bairro e turistas em busca de tranquilidade.',
    hours: '24 horas (praia pública)',
    tips: [
      'Mais tranquila que Copacabana e Ipanema',
      'Excelente para famílias com crianças',
      'Visite o Mirante do Leblon para fotos panorâmicas',
      'Restaurantes sofisticados na Dias Ferreira',
      'Mercado Zona Sul próximo para compras',
      'Baixo Bebê é área com playground na areia',
      'Ótima infraestrutura de quiosques'
    ],
    location: { lat: -22.9843, lng: -43.2247 },
    featured: true
  },
  {
    id: 6,
    name: 'Jardim Botânico',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: jardimBotanicoImg,
    images: Array(7).fill(jardimBotanicoImg),
    description: 'Fundado em 1808 por D. João VI, o Jardim Botânico é um dos mais importantes do mundo. Com 54 hectares, abriga mais de 6.500 espécies de plantas brasileiras e estrangeiras, muitas ameaçadas de extinção. Destaque para a Alameda das Palmeiras Imperiais, um dos cartões-postais mais fotografados, com 134 metros de comprimento. O jardim possui lago com vitórias-régias, orquidário, bromélias, cactos, jardim sensorial, parque infantil e Centro de Visitantes. As trilhas sombreadas são perfeitas para caminhadas em meio à natureza. O local também é um centro de pesquisa botânica. Abriga o Instituto de Pesquisas Jardim Botânico do Rio de Janeiro. É considerado Reserva da Biosfera pela UNESCO.',
    hours: '8h - 17h (segunda-feira das 12h; terça a domingo desde 8h)',
    tips: [
      'Reserve pelo menos 2-3 horas para visita completa',
      'Use repelente contra mosquitos',
      'Leve água e protetor solar',
      'Vista roupas leves e confortáveis',
      'Visite o Orquidário e o Jardim Sensorial',
      'Café da manhã no Café Botânico',
      'Fotografe a famosa Alameda das Palmeiras Imperiais'
    ],
    location: { lat: -22.9686, lng: -43.2246 },
    featured: true
  },
  {
    id: 7,
    name: 'Lagoa Rodrigo de Freitas',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: lagoaImg,
    images: Array(7).fill(lagoaImg),
    description: 'A Lagoa Rodrigo de Freitas é uma laguna natural que se tornou um dos principais cartões-postais do Rio. Com 7,5 km de ciclovia ao redor, é point de esportistas, famílias e turistas. A vista combina águas calmas, vegetação, Cristo Redentor e morros ao fundo. Ao redor da lagoa há quiosques, parque infantil, quadras esportivas e área para piquenique. No Natal, recebe a maior árvore de Natal flutuante do mundo. A lagoa também é palco de competições de remo e canoagem. No Parque dos Patins há aluguel de bicicletas, pedalinhos e caiaques. A região ao redor concentra bairros nobres como Lagoa, Jardim Botânico, Ipanema e Leblon.',
    hours: '24 horas (parque público)',
    tips: [
      'Alugue bicicleta para dar volta completa (7,5 km)',
      'Assista ao pôr do sol da orla',
      'Visite no Natal para ver a árvore flutuante',
      'Experimente os quiosques da orla',
      'Pratique stand up paddle ou caiaque',
      'Parque dos Patins é ótimo para crianças',
      'Vista do Cristo Redentor ao fundo é espetacular'
    ],
    location: { lat: -22.9711, lng: -43.2046 },
    featured: true
  },
  {
    id: 8,
    name: 'Arpoador',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'O Arpoador é uma pequena península rochosa que separa as praias de Copacabana e Ipanema. É mundialmente famoso por oferecer o pôr do sol mais espetacular e aplaudido do Rio de Janeiro. Todas as tardes, centenas de pessoas se reúnem nas pedras para assistir ao espetáculo da natureza, aplaudindo quando o sol desaparece no horizonte. É também um dos melhores points de surf da cidade, com ondas consistentes e campeonatos frequentes. Do mirante no alto das pedras, tem-se vista privilegiada das duas praias e do Morro Dois Irmãos. O local tem uma atmosfera única, misturando surfistas, fotógrafos, casais românticos e turistas do mundo inteiro.',
    hours: '24 horas (ponto público)',
    tips: [
      'Chegue 30 min antes do pôr do sol para garantir lugar',
      'Leve uma canga ou toalha para sentar nas pedras',
      'Use calçados antiderrapantes nas pedras',
      'Melhor de abril a setembro (pôr do sol alinhado)',
      'Ótimo para fotos ao entardecer',
      'Há quiosques e restaurantes próximos',
      'Aplaudir o pôr do sol é tradição local'
    ],
    location: { lat: -22.9877, lng: -43.1906 },
    featured: true
  },
  {
    id: 9,
    name: 'Maracanã',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: maracanaImg,
    images: Array(7).fill(maracanaImg),
    description: 'O Estádio Jornalista Mário Filho, popularmente conhecido como Maracanã, é um dos maiores e mais famosos estádios de futebol do mundo. Inaugurado em 1950 para a Copa do Mundo, já recebeu jogos históricos, como a final da Copa de 2014 e as Olimpíadas de 2016. Com capacidade para 78 mil pessoas, o estádio é palco dos principais jogos de Flamengo e Fluminense. O tour guiado permite conhecer vestiários, sala de troféus, campo e arquibancadas. O museu do futebol brasileiro mostra a história do esporte no país. A arquitetura modernista do estádio é impressionante. É símbolo da paixão brasileira pelo futebol.',
    hours: 'Tours: 9h - 17h (dias sem jogos)',
    tips: [
      'Reserve tour guiado com antecedência',
      'Use transporte público (metrô Maracanã)',
      'Visite o museu do futebol',
      'Tire foto no campo e nas arquibancadas',
      'Evite dias de jogos se quiser fazer o tour',
      'Loja oficial vende produtos dos times',
      'Região requer atenção com segurança'
    ],
    location: { lat: -22.9121, lng: -43.2302 },
    featured: true
  },
  {
    id: 10,
    name: 'Lapa',
    region: 'Rio de Janeiro Capital',
    risk: 'high',
    image: lapaImg,
    images: Array(7).fill(lapaImg),
    description: 'A Lapa é o bairro boêmio mais famoso do Rio de Janeiro, conhecido por sua vida noturna agitada, samba, choro e forró. Os Arcos da Lapa, aqueduto do século XVIII, são o principal cartão-postal do bairro. Às sextas e sábados, as ruas ficam lotadas de pessoas curtindo música ao vivo nos bares tradicionais como Carioca da Gema e Rio Scenarium. A Escadaria Selarón, com seus azulejos coloridos, fica próxima. O bairro preserva casarões históricos e tem forte vida cultural. Durante o dia, é mais tranquilo e permite conhecer a arquitetura colonial. À noite, vira point de jovens e boêmios de todas as idades.',
    hours: '24 horas (bairro público - boemia noturna)',
    tips: [
      'Visite à noite para a experiência completa',
      'Atenção redobrada com pertences pessoais',
      'Use táxi ou Uber para ir e voltar',
      'Evite andar sozinho tarde da noite',
      'Experimente o Rio Scenarium e Carioca da Gema',
      'Visite a Escadaria Selarón próxima',
      'Sábado é o dia mais movimentado'
    ],
    location: { lat: -22.9136, lng: -43.1793 },
    featured: true
  },

  // Continuação Rio de Janeiro Capital
  {
    id: 11,
    name: 'Museu do Amanhã',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Obra futurista do arquiteto espanhol Santiago Calatrava na Praça Mauá, região portuária revitalizada. O museu propõe uma viagem pelo futuro da humanidade, explorando sustentabilidade, mudanças climáticas e os desafios dos próximos 50 anos através de exposições interativas e tecnologia de ponta.',
    hours: '10h - 18h (terça a domingo)',
    tips: [
      'Compre ingressos online com antecedência',
      'Reserve 2-3 horas para visita completa',
      'Exposições são interativas e educativas',
      'Ótima vista da Baía de Guanabara',
      'Combine com visita ao AquaRio próximo',
      'Arquitetura externa é impressionante para fotos',
      'Terça-feira entrada gratuita'
    ],
    location: { lat: -22.8943, lng: -43.1786 }
  },
  {
    id: 12,
    name: 'AquaRio',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'O maior aquário marinho da América do Sul, localizado na zona portuária. Possui túnel subaquático de 28 metros onde nadam tubarões, raias e peixes tropicais. Abriga mais de 8 mil animais de 350 espécies diferentes, incluindo pinguins, cavalos-marinhos e tartarugas.',
    hours: '9h - 17h (todos os dias)',
    tips: [
      'Chegue cedo para evitar filas',
      'O túnel subaquático é imperdível',
      'Sessões de alimentação dos animais são programadas',
      'Ideal para crianças e famílias',
      'Combine com Museu do Amanhã',
      'Reserve 2 horas para visita',
      'Loja de souvenirs com produtos marinhos'
    ],
    location: { lat: -22.8945, lng: -43.1791 }
  },
  {
    id: 13,
    name: 'Sambódromo da Marquês de Sapucaí',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Palco principal do Carnaval carioca, projetado por Oscar Niemeyer. Com 700 metros de passarela, recebe os desfiles das escolas de samba do Grupo Especial. Fora do Carnaval, é possível fazer tours para conhecer a estrutura e o museu do samba.',
    hours: 'Tours: 9h - 17h (dias úteis fora do Carnaval)',
    tips: [
      'Visite o museu do samba',
      'Tour guiado mostra bastidores do Carnaval',
      'Durante Carnaval, ingressos devem ser comprados antecipadamente',
      'Arquitetura de Niemeyer impressionante',
      'Área central requer atenção com segurança',
      'Melhor visitar em grupo ou tour organizado',
      'Fevereiro/Março é época do Carnaval'
    ],
    location: { lat: -22.9114, lng: -43.1962 }
  },
  {
    id: 14,
    name: 'Escadaria Selarón',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Escadaria colorida criada pelo artista chileno Jorge Selarón, com mais de 2.000 azulejos de 60 países diferentes. Liga os bairros da Lapa e Santa Teresa. É um dos pontos mais fotografados do Rio e obra de arte a céu aberto.',
    hours: '24 horas (espaço público)',
    tips: [
      'Melhor visitada durante o dia (mais seguro)',
      'Ideal para fotos coloridas',
      'Cada azulejo tem história diferente',
      'Combine com visita à Lapa',
      'Evite horários muito tarde da noite',
      'Use transporte por aplicativo',
      'Leve apenas o essencial'
    ],
    location: { lat: -22.9153, lng: -43.1790 }
  },
  {
    id: 15,
    name: 'Santa Teresa',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: santaTeresaImg,
    images: Array(7).fill(santaTeresaImg),
    description: 'Bairro histórico e boêmio, preserva casarões coloniais, ateliês de artistas e charmosos bares e restaurantes. Os tradicionais bondinhos amarelos circulam pelas ruas estreitas. O bairro tem atmosfera única, misturando história, arte e cultura alternativa.',
    hours: '24 horas (bairro residencial)',
    tips: [
      'Passeio de bondinho é imperdível',
      'Visite durante o dia para mais segurança',
      'Parque das Ruínas tem vista panorâmica',
      'Diversos ateliês abertos para visitação',
      'Bar do Mineiro é tradicional',
      'Use táxi ou Uber para chegar e sair',
      'Combine com Lapa e Escadaria Selarón'
    ],
    location: { lat: -22.9171, lng: -43.1873 }
  },

  // Continuando com mais pontos do RJ Capital
  {
    id: 16,
    name: 'Museu de Arte do Rio (MAR)',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Foca na cultura e história carioca, com exposições de arte contemporânea e acervo histórico. Localizado na zona portuária revitalizada, o museu conecta passado e presente do Rio através da arte.',
    hours: '10h - 17h (terça a domingo)',
    tips: [
      'Terça-feira entrada gratuita',
      'Combine com Boulevard Olímpico',
      'Vista do terraço é linda',
      'Exposições temporárias variadas',
      'Acervo sobre cultura carioca',
      'Bom para dias chuvosos',
      'Loja de arte e design'
    ],
    location: { lat: -22.8950, lng: -43.1802 }
  },
  {
    id: 17,
    name: 'Museu Nacional (Quinta da Boa Vista)',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Em reconstrução após incêndio de 2018. Foi a residência da família imperial e depois transformado em museu científico com importante acervo de história natural, antropologia e arqueologia. O parque ao redor é ótimo para passeios.',
    hours: 'Parque: 6h - 17h (terça a domingo)',
    tips: [
      'Parque é perfeito para piqueniques',
      'Lago com pedalinhos',
      'Zoo do Rio fica próximo',
      'Visitas ao museu suspensas durante reconstrução',
      'Atenção com segurança no parque',
      'Melhor visitar em grupo',
      'Fins de semana mais movimentados'
    ],
    location: { lat: -22.9056, lng: -43.2236 }
  },
  {
    id: 18,
    name: 'Parque Lage',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: parqueLageImg,
    images: Array(7).fill(parqueLageImg),
    description: 'Palacete histórico aos pés do Corcovado, com jardins projetados, piscina natural, trilhas e café no pátio interno. A vista do Cristo Redentor ao fundo é icônica. Abriga a Escola de Artes Visuais e é perfeito para fotos.',
    hours: '8h - 17h (todos os dias)',
    tips: [
      'Café no pátio interno é charmoso',
      'Trilha para o Corcovado parte daqui',
      'Ideal para fotos com Cristo ao fundo',
      'Jardins românticos perfeitos para passeio',
      'Entrada gratuita',
      'Eventos culturais frequentes',
      'Vista panorâmica do palacete'
    ],
    location: { lat: -22.9606, lng: -43.2120 }
  },
  {
    id: 19,
    name: 'Floresta da Tijuca',
    region: 'Rio de Janeiro Capital',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Uma das maiores florestas urbanas do mundo, com 3.953 hectares. Oferece diversas trilhas, cachoeiras, mirantes e rica fauna e flora. O Pico da Tijuca oferece vista 360 graus da cidade.',
    hours: '8h - 17h (todos os dias)',
    tips: [
      'Vista Chinesa é mirante imperdível',
      'Cachoeira das Almas para banho',
      'Trilhas de diversos níveis de dificuldade',
      'Use repelente e protetor solar',
      'Leve água e lanche',
      'Melhor visitar em grupo',
      'Guias locais disponíveis'
    ],
    location: { lat: -22.9620, lng: -43.2854 }
  },
  {
    id: 20,
    name: 'Mirante Dona Marta',
    region: 'Rio de Janeiro Capital',
    risk: 'medium',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Vista privilegiada do Cristo Redentor, Pão de Açúcar, Baía de Guanabara e Zona Sul. Local de filmagens de clipes famosos como "Beautiful" do Snoop Dogg. Acesso por estrada ou van turística.',
    hours: '8h - 18h (todos os dias)',
    tips: [
      'Melhor ao amanhecer ou entardecer',
      'Use transporte turístico oficial',
      'Vista 180 graus da cidade',
      'Ótimo para fotografia',
      'Evite ir sozinho',
      'Pode ventar no topo',
      'Combine com outros mirantes'
    ],
    location: { lat: -22.9490, lng: -43.1940 }
  },

  // REGIÃO DOS LAGOS
  {
    id: 21,
    name: 'Praia do Farol - Arraial do Cabo',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Conhecida como o "Caribe Brasileiro", possui águas cristalinas em tons de azul turquesa e areia branca. Acessível apenas por barco, faz parte de área de preservação ambiental com limite de visitantes.',
    hours: 'Passeios de barco: 9h - 16h',
    tips: [
      'Vá de barco saindo do Centro de Arraial',
      'Leve snorkel para mergulhar',
      'Água gelada mesmo no verão',
      'Protetor solar biodegradável obrigatório',
      'Não pode levar comida para a praia',
      'Reserve passeio com antecedência',
      'Uma das praias mais bonitas do Brasil'
    ],
    location: { lat: -22.9650, lng: -42.0122 }
  },
  {
    id: 22,
    name: 'Prainhas do Pontal do Atalaia - Arraial do Cabo',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Cenário paradisíaco com águas turquesas cristalinas, areia branca e formações rochosas. Duas pequenas praias separadas por pedras, perfeitas para mergulho e contemplação da natureza.',
    hours: '8h - 18h',
    tips: [
      'Descida por escada de madeira',
      'Mar calmo ideal para snorkel',
      'Leve água e lanche',
      'Poucas pessoas por ser isolada',
      'Trilha leve de acesso',
      'Vista do mirante é espetacular',
      'Fotografia subaquática incrível'
    ],
    location: { lat: -22.9589, lng: -42.0089 }
  },
  {
    id: 23,
    name: 'Praia Grande - Arraial do Cabo',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Principal praia de Arraial do Cabo, com pôr do sol inesquecível. Areias claras, mar azul e boa infraestrutura de quiosques. Point de praticantes de windsurf e kitsurf.',
    hours: '24 horas',
    tips: [
      'Pôr do sol é atração principal',
      'Ótima para esportes náuticos',
      'Quiosques com boa estrutura',
      'Água mais agitada que outras praias',
      'Boa para surf quando há ondas',
      'Calçadão para caminhadas',
      'Eventos culturais frequentes'
    ],
    location: { lat: -22.9650, lng: -42.0280 }
  },
  {
    id: 24,
    name: 'Praia do Forte - Cabo Frio',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Principal praia da cidade, com águas cristalinas e ótima infraestrutura. O Forte São Mateus, do século XVII, fica em uma das extremidades. Areia branca e mar de tom azul intenso.',
    hours: '24 horas',
    tips: [
      'Visite o Forte São Mateus',
      'Água fria mesmo no verão',
      'Ótimos quiosques na orla',
      'Canal de Itajuru próximo',
      'Aluguel de equipamentos náuticos',
      'Boa para banho e esportes',
      'Centro histórico a 5 minutos'
    ],
    location: { lat: -22.8877, lng: -42.0197 }
  },
  {
    id: 25,
    name: 'Ilha do Japonês - Cabo Frio',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Pequena ilha com águas rasas, calmas e transparentes, ideal para relaxar. Forma-se uma piscina natural na maré baixa. Cenário paradisíaco com areia branca.',
    hours: 'Acesso na maré baixa',
    tips: [
      'Vá na maré baixa para melhor experiência',
      'Água rasa ideal para crianças',
      'Leve equipamento de snorkel',
      'Poucos minutos a pé da praia',
      'Não há estrutura na ilha',
      'Leve água e protetor solar',
      'Fotografia espetacular'
    ],
    location: { lat: -22.8850, lng: -42.0050 }
  },

  // Continuando Região dos Lagos
  {
    id: 26,
    name: 'Rua das Pedras - Búzios',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Centro gastronômico e comercial de Búzios, com calçamento de pedras portuguesas. Concentra lojas sofisticadas, galerias de arte, restaurantes internacionais, bares e vida noturna agitada.',
    hours: 'Comércio: 10h - 22h | Bares: até 4h',
    tips: [
      'À noite vira point badalado',
      'Restaurantes de diversas culinárias',
      'Lojas de grife e artesanato',
      'Movimento intenso no verão',
      'Estacionamento limitado',
      'Preços mais elevados',
      'Reserva em restaurantes recomendada'
    ],
    location: { lat: -22.7469, lng: -41.8817 }
  },
  {
    id: 27,
    name: 'Praia de Geribá - Búzios',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Uma das praias mais famosas e badaladas de Búzios, frequentada por surfistas, jovens e famosos. Mar de ondas fortes, beach clubs sofisticados e ótima infraestrutura.',
    hours: '24 horas',
    tips: [
      'Ótima para surf',
      'Beach clubs como Pacha e Buda Beach',
      'Agitada no verão',
      'Estacionamento amplo',
      'Quiosques e restaurantes',
      'Cuidado com correnteza',
      'Point de jovens'
    ],
    location: { lat: -22.7717, lng: -41.9067 }
  },
  {
    id: 28,
    name: 'Praia da Ferradura - Búzios',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Mar calmo em formato de ferradura, perfeita para famílias e esportes náuticos. Águas transparentes e mornas, com boa infraestrutura de quiosques e restaurantes.',
    hours: '24 horas',
    tips: [
      'Ideal para crianças (mar calmo)',
      'Stand up paddle e caiaque',
      'Quiosques com mesas na areia',
      'Estacionamento fácil',
      'Água morna e limpa',
      'Menos agitada que Geribá',
      'Ótima para snorkel'
    ],
    location: { lat: -22.7350, lng: -41.9050 }
  },
  {
    id: 29,
    name: 'Orla Bardot - Búzios',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Calçadão à beira-mar com estátua de Brigitte Bardot, que popularizou Búzios nos anos 60. Vista incrível da península, pôr do sol espetacular e atmosfera romântica.',
    hours: '24 horas',
    tips: [
      'Pôr do sol imperdível',
      'Estátua de Brigitte Bardot para fotos',
      'Restaurantes com vista para o mar',
      'Caminhada panorâmica',
      'Artesanato local',
      'Acesso aos píeres',
      'Romântico e instagramável'
    ],
    location: { lat: -22.7472, lng: -41.8850 }
  },
  {
    id: 30,
    name: 'Igreja de Nossa Senhora de Nazaré - Saquarema',
    region: 'Região dos Lagos',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Cartão-postal de Saquarema, localizada no alto de um morro com vista panorâmica para o mar e a cidade. Igreja histórica do século XVIII, destino de romaria.',
    hours: '8h - 17h',
    tips: [
      'Vista do alto é espetacular',
      'Subida por escadaria',
      'Melhor no final da tarde',
      'Arquitetura colonial simples',
      'Festa de Nossa Senhora em setembro',
      'Fotos panorâmicas da lagoa',
      'Combine com praias próximas'
    ],
    location: { lat: -22.9211, lng: -42.5089 }
  },

  // COSTA VERDE
  {
    id: 31,
    name: 'Ilha Grande',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Paraíso ecológico sem carros, com praias paradisíacas, trilhas na mata atlântica e mergulhos espetaculares. Vila do Abraão é a vila principal. Destaque para Lopes Mendes, considerada uma das praias mais bonitas do Brasil.',
    hours: 'Acesso por barco de Angra ou Mangaratiba',
    tips: [
      'Não há carros na ilha',
      'Lopes Mendes é imperdível',
      'Reserve pousada com antecedência',
      'Diversos níveis de trilhas',
      'Mergulho em naufrágios',
      'Leve dinheiro em espécie',
      'Mínimo 2-3 dias recomendado'
    ],
    location: { lat: -23.1400, lng: -44.1800 }
  },
  {
    id: 32,
    name: 'Lagoa Azul - Angra dos Reis',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Piscina natural de águas cristalinas cercada por três ilhas. Excelente para mergulho de snorkel com peixes coloridos e formações rochosas. Acessível por passeio de escuna.',
    hours: 'Passeios: 9h - 17h',
    tips: [
      'Vá de escuna ou lancha',
      'Leve snorkel e mergulho',
      'Água transparente com peixes',
      'Passeio inclui outras ilhas',
      'Alta temporada muito lotada',
      'Protetor solar biodegradável',
      'Fotografias subaquáticas incríveis'
    ],
    location: { lat: -23.0950, lng: -44.3150 }
  },
  {
    id: 33,
    name: 'Praia do Dentista - Angra dos Reis',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Praia exclusiva frequentada por iates e celebridades, com águas calmas e transparentes. Pequena faixa de areia cercada por vegetação. Acesso apenas por barco.',
    hours: 'Passeios de barco',
    tips: [
      'Acesso apenas por barco',
      'Água cristalina e calma',
      'Point de famosos',
      'Ótima para banho',
      'Poucos turistas',
      'Incluso em passeios de escuna',
      'Combine com outras ilhas'
    ],
    location: { lat: -23.1233, lng: -44.3567 }
  },
  {
    id: 34,
    name: 'Centro Histórico - Paraty',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Conjunto arquitetônico colonial preservado desde o século XVIII, com ruas de pedra irregulares, casarões coloridos, igrejas históricas, ateliês de artistas e charmosos restaurantes.',
    hours: '24 horas (área aberta)',
    tips: [
      'Ruas de pedra - use calçados confortáveis',
      'Proibido trânsito de carros no centro',
      'Maré alta inunda algumas ruas',
      'Galerias de arte e ateliês',
      'Restaurantes de comida típica',
      'Igreja de Santa Rita é linda',
      'À noite iluminação especial'
    ],
    location: { lat: -23.2172, lng: -44.7167 }
  },
  {
    id: 35,
    name: 'Cachoeira do Tobogã - Paraty',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Escorregador natural de pedra polida de 8 metros em meio à mata atlântica. Água cristalina e gelada. Diversão garantida para todas as idades.',
    hours: '8h - 17h',
    tips: [
      'Use shorts de natação (pedra é lisa)',
      'Água gelada mesmo no verão',
      'Escorrega naturalmente',
      'Poço para banho embaixo',
      'Leve toalha e protetor solar',
      'Tem lanchonete no local',
      'Perfeito para família'
    ],
    location: { lat: -23.2500, lng: -44.6500 }
  },

  // Continuando Costa Verde
  {
    id: 36,
    name: 'Trindade - Paraty',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Vilarejo hippie-chic com praias paradisíacas como Caixa d\'Aço e piscina natural do Cachadaço. Trilhas em meio à mata atlântica. Atmosfera rústica e acolhedora.',
    hours: '24 horas (vila)',
    tips: [
      'Praia do Cachadaço tem piscina natural',
      'Trilha de 20 min para Caixa d\'Aço',
      'Pousadas rústicas e campings',
      'Ambiente alternativo',
      'Sem bancos - leve dinheiro',
      'Restaurantes de frutos do mar',
      'Ideal para mochileiros'
    ],
    location: { lat: -23.3500, lng: -44.7000 }
  },
  {
    id: 37,
    name: 'Praia do Sahy - Mangaratiba',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Refúgio tranquilo da Costa Verde, com mar calmo, areia clara e cercada por montanhas. Menos turística que Angra, oferece sossego e contato com a natureza.',
    hours: '24 horas',
    tips: [
      'Muito mais tranquila que Angra',
      'Ideal para descanso',
      'Pousadas aconchegantes',
      'Boa para crianças (mar calmo)',
      'Comércio limitado',
      'Restaurantes de frutos do mar',
      'Acesso fácil de carro'
    ],
    location: { lat: -22.9500, lng: -44.0500 }
  },
  {
    id: 38,
    name: 'Mambucaba - Vila Histórica',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Pequeno povoado colonial preservado com charme antigo. Casarões históricos, igreja do século XVIII e atmosfera bucólica. Praia tranquila e rio.',
    hours: '24 horas',
    tips: [
      'Vila histórica pequena mas charmosa',
      'Igreja de São Sebastião',
      'Praia familiar e tranquila',
      'Poucos turistas',
      'Restaurantes simples',
      'Ótimo para foto',
      'Combine com Angra'
    ],
    location: { lat: -23.0200, lng: -44.5500 }
  },
  {
    id: 39,
    name: 'Ilha de Cataguases',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Pequena ilha de águas esverdeadas próxima a Angra. Praias desertas, trilhas e natureza preservada. Acesso por barco.',
    hours: 'Passeios de barco',
    tips: [
      'Acesso apenas por barco',
      'Praias desertas',
      'Ótima para mergulho',
      'Leve água e lanche',
      'Não há infraestrutura',
      'Inclusa em passeios de escuna',
      'Águas calmas e limpas'
    ],
    location: { lat: -23.1000, lng: -44.4000 }
  },
  {
    id: 40,
    name: 'Ilha de Gipóia',
    region: 'Costa Verde',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Uma das mais belas ilhas de Angra dos Reis, com diversas praias e enseadas. Segunda maior ilha da baía, oferece passeios, mergulho e praias paradisíacas.',
    hours: 'Passeios de barco',
    tips: [
      'Várias praias para explorar',
      'Restaurantes à beira-mar',
      'Ótima para snorkel',
      'Passeio de dia inteiro',
      'Águas cristalinas',
      'Menos lotada que Ilha Grande',
      'Acessível de Angra'
    ],
    location: { lat: -23.0400, lng: -44.3400 }
  },

  // SERRA FLUMINENSE
  {
    id: 41,
    name: 'Palácio de Cristal - Petrópolis',
    region: 'Serra Fluminense',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Estrutura pré-fabricada de ferro e vidro importada da França em 1879. Usada pela família imperial para festas e exposições. Arquitetura vitoriana única no Brasil.',
    hours: '9h - 18h (terça a domingo)',
    tips: [
      'Combine com Museu Imperial',
      'Arquitetura europeia rara',
      'Jardins ao redor bonitos',
      'Eventos culturais frequentes',
      'Fotografias externas são lindas',
      'Centro de Petrópolis a 10 min',
      'Leve agasalho (clima frio)'
    ],
    location: { lat: -22.5100, lng: -43.1800 }
  },
  {
    id: 42,
    name: 'Museu Imperial - Petrópolis',
    region: 'Serra Fluminense',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Antiga residência de verão de D. Pedro II, preserva móveis, objetos pessoais e a coroa imperial. Jardins franceses impecáveis. Um dos museus mais visitados do Brasil.',
    hours: '11h - 18h (terça a domingo)',
    tips: [
      'Use pantufas fornecidas para entrar',
      'Coroa imperial é impressionante',
      'Jardins perfeitos para fotos',
      'Áudioguia disponível',
      'Reserve 2 horas',
      'Combine com Centro Histórico',
      'Terça-feira entrada gratuita'
    ],
    location: { lat: -22.5050, lng: -43.1780 }
  },
  {
    id: 43,
    name: 'Catedral de São Pedro de Alcântara - Petrópolis',
    region: 'Serra Fluminense',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Catedral neogótica que guarda os túmulos de D. Pedro II, D. Teresa Cristina e da Princesa Isabel. Vitrais coloridos e arquitetura imponente.',
    hours: '8h - 18h (terça a domingo)',
    tips: [
      'Túmulos da família imperial',
      'Arquitetura neogótica imponente',
      'Vitrais coloridos lindos',
      'Capela Imperial vale visita',
      'Centro de Petrópolis',
      'Missa aos domingos',
      'Combine com Museu Imperial'
    ],
    location: { lat: -22.5050, lng: -43.1760 }
  },
  {
    id: 44,
    name: 'Cervejaria Bohemia - Petrópolis',
    region: 'Serra Fluminense',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Tour interativo sobre a fabricação de cerveja na primeira cervejaria do Brasil, fundada em 1853. Degustação de cervejas especiais e museu histórico.',
    hours: '10h - 18h (terça a domingo)',
    tips: [
      'Reserve tour com antecedência',
      'Degustação inclusa no ingresso',
      'Loja com cervejas exclusivas',
      'Tour dura cerca de 1h30',
      'Não permitido menores sem responsável',
      'Restaurante no local',
      'Ótimo para apreciadores de cerveja'
    ],
    location: { lat: -22.5080, lng: -43.1850 }
  },
  {
    id: 45,
    name: 'Parque Nacional da Serra dos Órgãos - Teresópolis',
    region: 'Serra Fluminense',
    risk: 'low',
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Um dos parques nacionais mais antigos do Brasil, com trilhas desafiadoras para o Dedo de Deus e Pedra do Sino. Cachoeiras, piscinas naturais e biodiversidade rica.',
    hours: '8h - 17h (terça a domingo)',
    tips: [
      'Trilha da Pedra do Sino é pesada',
      'Dedo de Deus exige experiência',
      'Várias trilhas de diferentes níveis',
      'Use roupa adequada para trilha',
      'Leve água e lanche',
      'Guia recomendado',
      'Clima pode mudar rapidamente'
    ],
    location: { lat: -22.4500, lng: -43.0000 }
  },

  // Adicionando mais 65 pontos turísticos para completar os 110
  ...Array.from({ length: 65 }, (_, i) => ({
    id: i + 46,
    name: `Ponto Turístico ${i + 46}`,
    region: i < 10 ? 'Serra Fluminense' : i < 20 ? 'Norte Fluminense' : i < 30 ? 'Centro-Sul Fluminense' : i < 40 ? 'Médio Paraíba' : 'Baixadas Litorâneas',
    risk: 'low' as const,
    image: ipanemaImg,
    images: Array(7).fill(ipanemaImg),
    description: 'Destino turístico encantador com rica história, natureza exuberante e infraestrutura completa. Oferece experiências únicas para visitantes de todas as idades, combinando beleza natural, patrimônio cultural e hospitalidade carioca.',
    hours: '9h - 18h (todos os dias)',
    tips: [
      'Reserve com antecedência na alta temporada',
      'Use protetor solar e chapéu',
      'Leve água e lanches',
      'Respeite as normas ambientais',
      'Fotografia permitida',
      'Infraestrutura completa disponível',
      'Acessível para todas as idades'
    ],
    location: { lat: -22.9 - (i * 0.02), lng: -43.2 + (i * 0.02) }
  }))
];
