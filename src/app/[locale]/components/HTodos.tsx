import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '../../../helpers/get-query-client';
import { getTodos } from '@/services/todo';
import { Todos } from '@/app/[locale]/components/Todos';

/**
 * @name HTodos
 * @description Hydrated Todos component - This component is used to hydrate the Todos component
 * */
export default async function HTodos() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['todos'], () => getTodos()); // <-- This line does the request with params
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Todos />
    </Hydrate>
  );
}
