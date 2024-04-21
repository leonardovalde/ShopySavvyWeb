import { getSession } from 'next-auth/react';
import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({
  // The list of all supported locales
  locales: ['en', 'es'],
  // The default locale
  defaultLocale: 'en',
});

export default async function customMiddleware({ req, res, next }: any) {
  // Validate session here before continuing
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    // Redirect to login page if session does not exist
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  // If session exists, continue to the next middleware or route handler
  return middleware(req);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
