import { useTranslations } from 'next-intl';
import HydratedPosts from '@/app/[locale]/components/HTodos';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';

export default function PrincipalPage() {
  const t = useTranslations('index');

  return (
    <div>
      <h2>{t('message')}</h2>
      <LocaleSwitcher />
      <HydratedPosts />
    </div>
  );
}
