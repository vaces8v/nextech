/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: [
      'avatars.mds.yandex.net', 
      'ir.ozone.ru', 
      'i-ekb.ru', 
      'novosibirsk.kvadromax.ru', 
      'www.ephotozine.com', 
      'media.wired.com', 
      'cdn1.ozone.ru'
    ]
  }
}

module.exports = nextConfig
