/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: '/api',
    CONTENTFUL_SPACE_ID: 'xaf1u9ud36pf',
    CONTENTFUL_ACCESS_TOKEN: 'GDGLwdo-m0WnMlmf5O55qyhydEYYJyN7_P_THkKf_74',
    nodeAppApi: 'https://ko-sports-users.onrender.com/api',
    SENDGRID_api_KEY: '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'
  },
  images: {
    domains: ['cdn.contentful.com', 'images.ctfassets.net'],
  },
  headers: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    // ...
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ko-sports-users.onrender.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig

