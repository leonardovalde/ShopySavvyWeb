'use client';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { getServerSession } from 'next-auth';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Providers(params: PageProps) {
  const queryClient = new QueryClient();
  let messages;
  try {
    messages = (await import(`../dictionaries/es.json`)).default;
  } catch (error) {
    notFound();
  }
  const session = await getServerSession(authOptions);
  return (
    // <NextIntlClientProvider locale={params.locale} messages={messages}>
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{params.children}</ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
    // </NextIntlClientProvider>
  );
}

interface PageProps {
  children: ReactNode;
  locale: string;
}
