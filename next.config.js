/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'https://strapi-122894-0.cloudclusters.net/api', 
    nodeAppApi: 'https://ko-sports-users.onrender.com/api',
    SENDGRID_api_KEY: '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'
  }
}

module.exports = nextConfig

