import { useTranslations } from 'next-intl';
import HydratedPosts from '@/app/[locale]/components/HTodos';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Todos } from '@/app/[locale]/components/Todos';

export default function PrincipalPage() {
  const t = useTranslations('index');

  return (
    <div>
      <h2>{t('message')}</h2>
      <LocaleSwitcher />
      <ThemeSwitcher />
      <HydratedPosts />
    </div>
  );
}
