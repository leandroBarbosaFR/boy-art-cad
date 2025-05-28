import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  /* config options here */
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
}

export default nextConfig
