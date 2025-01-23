/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@/app'] = path.join(__dirname, 'app')
    config.resolve.alias['@/components'] = path.join(__dirname, 'components')
    config.resolve.alias['@/lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['@/styles'] = path.join(__dirname, 'styles')
    config.resolve.alias['@/public'] = path.join(__dirname, 'public')
    config.resolve.alias['@/store'] = path.join(__dirname, 'store')
    return config
  }
}

module.exports = nextConfig
