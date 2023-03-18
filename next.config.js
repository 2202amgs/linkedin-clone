/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'linkedin.com',
      "static.licdn.com",
      "static-exp1.licdn.com",
    ],
  },
}

module.exports = nextConfig
