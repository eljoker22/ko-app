/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'https://strapi-122894-0.cloudclusters.net/api', 
    nodeAppApi: 'https://ko-sports-users.onrender.com/api',
    SENDGRID_api_KEY: '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'
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = nextConfig

