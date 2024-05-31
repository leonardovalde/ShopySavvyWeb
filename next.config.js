/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

module.exports = withNextIntl({
  images: {
    domains: ['lh3.googleusercontent.com', 'shopy-savvy-web.vercel.app'],
  },
});
