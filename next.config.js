/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "github.com"],
  },

  experimental: {
    images: {
      allowFutureImage: true
    }
  }
  
}

module.exports = nextConfig
