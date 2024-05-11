const data = [
  'bebidas',
  'despensa',
  'panaderia',
  'carnes',
  'supermercado',
  'desayuno',
  'congelados',
  'aseo',
  'lacteos_huevos',
];

interface Category {
  category: string;
  id: number;
  image: string;
}

const newCategories = data.map((category, i) => {
  return {
    category,
    id: i,
    image: `/images/${category}.jpg`,
  };
});
