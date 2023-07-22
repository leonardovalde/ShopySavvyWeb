'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '@/helpers/get-query-client';
import { useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

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
        {params.children}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
interface PageProps {
  children: React.ReactNode;
  locale: string;
}
