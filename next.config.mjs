/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bnksolution.com',
        port: '',
        pathname: '/assets/**'
      }
    ]
  }
}

export default nextConfig
