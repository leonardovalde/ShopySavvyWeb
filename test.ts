const d = [
  {
    name: 'Besitos Horneados De Queso Taeq 120 Gr',
    price: '16050',
    photosUrl:
      'https://imagescomparalo.blob.core.windows.net/imagenes-productos/54a4c687-45a5-4aa0-8056-4acaace063bb.jpg',
    category: 'panaderia',
    storeName: 'exito,carulla',
    ean: '7701001844435',
    additionalPrices: [
      {
        price: '16500',
        storeId: 'carulla',
      },
      {
        price: '16050',
        storeId: 'exito',
      },
    ],
  },
  {
    name: '40 Ml',
    price: '121550',
    photosUrl:
      'https://imagescomparalo.blob.core.windows.net/imagenes-productos/71c8153d-ebe9-43ba-b291-7f8583ec19e4.jpg',
    category: 'panaderia',
    storeName: 'exito,olimpica',
    ean: '3401329447977',
    additionalPrices: [
      {
        price: '131450',
        storeId: 'olimpica',
      },
      {
        price: '121550',
        storeId: 'exito',
      },
    ],
  },
  {
    name: 'Café Nescafé Dolce Gusto Chai Tea Latte 159 G ',
    price: '33290',
    photosUrl:
      'https://imagescomparalo.blob.core.windows.net/imagenes-productos/9f8a6dd1-294e-45c1-84ae-d7cf0e6e265e.jpg',
    category: 'despensa',
    storeName: 'exito,jumbo,carulla,olimpica,metro',
    ean: '7613032864491',
    additionalPrices: [
      {
        price: '36000',
        storeId: 'olimpica',
      },
      {
        price: '33290',
        storeId: 'jumbo',
      },
      {
        price: '33290',
        storeId: 'metro',
      },
      {
        price: '38600',
        storeId: 'carulla',
      },
      {
        price: '36750',
        storeId: 'exito',
      },
    ],
  },
  {
    name: 'Mezcla Te Neg Premium Cafe Hindu 32 Gr',
    price: '11990',
    photosUrl:
      'https://imagescomparalo.blob.core.windows.net/imagenes-productos/86e48f87-da08-4ad1-9f64-a88ed4c03111.jpg',
    category: 'despensa',
    storeName: 'exito,jumbo,carulla,olimpica,metro,makro',
    ean: '7702746014060',
    additionalPrices: [
      {
        price: '14200',
        storeId: 'carulla',
      },
      {
        price: '11990',
        storeId: 'olimpica',
      },
      {
        price: '13000',
        storeId: 'exito',
      },
      {
        price: '11990',
        storeId: 'jumbo',
      },
      {
        price: '13990',
        storeId: 'metro',
      },
      {
        price: '12100',
        storeId: 'makro',
      },
    ],
  },
  {
    name: 'Alim Gato Felix Carne 85G ',
    price: '3350',
    photosUrl:
      'https://imagescomparalo.blob.core.windows.net/imagenes-productos/b4325f06-b77c-483c-bb8d-d754bc8a9850.jpg',
    category: 'carnes',
    storeName: 'exito,jumbo,olimpica,colsubsidio',
    ean: '7891000311752',
    additionalPrices: [
      {
        price: '3390',
        storeId: 'jumbo',
      },
      {
        price: '3950',
        storeId: 'exito',
      },
      {
        price: '3900',
        storeId: 'colsubsidio',
      },
      {
        price: '3350',
        storeId: 'olimpica',
      },
    ],
  },
];

console.log(d.find((product) => product.ean === '3401329447977'));
