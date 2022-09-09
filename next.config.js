/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'https://ko-app-sports.herokuapp.com/api', 
    nodeAppApi: 'https://ko-sports-node-js.herokuapp.com/api',
    SENDGRID_api_KEY: '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'
  }
}

module.exports = nextConfig

