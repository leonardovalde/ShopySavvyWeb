const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function Register(email: string, password: string) {
  const response = await fetch(`${backendUrl}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return { response: response.json(), status: response.status };
}
