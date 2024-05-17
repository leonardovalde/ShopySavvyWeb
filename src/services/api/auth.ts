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
  return { response: await response.json(), status: response.status };
}
async function Login(email: string, password: string) {
  const response = await fetch(`${backendUrl}/login`, {
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
  return response.json();
}

export async function manageGoogleLogin(email: string) {
  const newPassword = cryptPassword(email);
  const response = await Register(email, newPassword);
  console.log(await response);
  const response2 = await Login(email, newPassword);
  return await response2.accessToken;
}

function cryptPassword(password: string) {
  return password === 'leonardovalde16@gmail.com'
    ? btoa(password)
    : btoa(password) + 'S@a2';
}

// 116004889621573314329
// 116004889621573314329
