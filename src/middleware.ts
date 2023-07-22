import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // The list of all supported locales
  locales: ['en', 'es'],
  // The default locale
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
