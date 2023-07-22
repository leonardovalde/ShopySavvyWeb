export const getTodos = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/todos`);
  return response.json();
};
