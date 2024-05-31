import { getProductByEan } from './cart';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GetProducts(token: string, page?: number) {
  const response = await fetch(
    `${backendUrl}/Products/products?pageSize=30&page=${page || 3}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return response;
}
export async function GetCategories(token: string) {
  const response = await fetch(`${backendUrl}/Products/list_categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return response;
}
export async function GetProductByCategory(
  token: string,
  category: string,
  page: number,
  limit: number,
) {
  const response = await fetch(
    `${backendUrl}/Products/products_category?category=${category}&pageSize=${limit}&page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return response;
}

export async function GetProductByName(
  token: string,
  name: string,
  page?: number,
  limit?: number,
) {
  const response = await fetch(
    `${backendUrl}/Products/products_containing?product_name=${name}&pageSize=${
      limit || 10
    }&page=${page || 1}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return response;
}

export async function GetFavoriteProducts(token: string) {
  const response = await fetch(`${backendUrl}/Preferences/preferences`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  if (response.length > 0) {
    const productByEan: any = await getProductByEan(token, [
      ...response.map((item: any) => item.ean),
    ]);
    console.log(productByEan);

    return productByEan;
  }
  return [];
}

export async function AddFavoriteProduct(token: string, ean: string) {
  const response = await fetch(`${backendUrl}/preferences/add?ean=${ean}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return response;
}

export async function RemoveFavoriteProduct(token: string, ean: string) {
  const response = await fetch(`${backendUrl}/preferences/remove?ean=${ean}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return response;
}
