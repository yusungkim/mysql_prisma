/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // env: {
  //   PASSWORD_SALT_ROUND: process.env.PASSWORD_SALT_ROUND || "10"
  // },

  i18n: {
    locales: ['en-US', 'fr', 'ja_JP', 'zh-CN'],
    defaultLocale: 'en-US'
  }
}

module.exports = nextConfig
