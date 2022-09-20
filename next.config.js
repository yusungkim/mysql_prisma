/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    PASSWORD_SALT_ROUND: process.env.PASSWORD_SALT_ROUND
  }
}

module.exports = nextConfig
