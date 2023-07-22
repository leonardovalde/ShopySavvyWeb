'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Providers(params: PageProps) {
  const queryClient = new QueryClient();
  let messages;
  try {
    messages = (await import(`../dictionaries/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{params.children}</ThemeProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}

interface PageProps {
  children: ReactNode;
  locale: string;
}
