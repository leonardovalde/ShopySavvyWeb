const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GetProducts(token: string) {
  const response = await fetch(`${backendUrl}/Products/products`, {
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
export async function GetProductByCategory(token: string, category: string) {
  const response = await fetch(
    `${backendUrl}/Products/products_category?category=${category}`,
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
