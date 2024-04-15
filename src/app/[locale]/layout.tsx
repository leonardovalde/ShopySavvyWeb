import Providers from '@/helpers/Providers';
import '../globals.css';
import { useLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

export default function PrincipalLayout({ params, children }: PageProps) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }


  const t = useTranslations('index');
  return (
    <html lang={params.locale}>
      <body>
        <Providers locale={params.locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

interface PageProps {
  params: {
    locale: string;
  };
  children: React.ReactNode;
}
