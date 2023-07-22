'use client';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/services/todo';

export function Todos() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos, // <-- This line does the request without params
  });
  return (
    <>
      {data && (
        <ul>
          {data.map((todo: any) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

interface ComponentProps {
  data: any;
}
