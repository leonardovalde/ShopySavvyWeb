export function getStoreImageByName(name: string) {
  switch (name) {
    case 'tiendas_d1':
      return '/svg/D1.svg';
    case 'exito':
      return '/svg/exito.png';
    case 'olimpica':
      return '/svg/Olimpica.png';
    case 'jumbo':
      return '/svg/Jumbo.png';
    case 'carulla':
      return '/svg/Carulla.png';
    case 'makro':
      return '/svg/makro.png';
    case 'metro':
      return '/svg/Metro.png';
    case 'colsubsidio':
      return '/svg/Colsubsidio.png';
    default:
  }
}
