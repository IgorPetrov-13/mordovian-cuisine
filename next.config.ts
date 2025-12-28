import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // статья с примерами блюд
      //https://dzen.ru/a/aI3ylugaJDovgTCF?ysclid=mjpyv71uye621780009
      {
        protocol: 'https',
        hostname: 'avatars.dzeninfra.ru',
        pathname: '/get-zen_doc/**',
      },
      {
        protocol: 'https',
        hostname: 'eda.ru',
      },
    ],
  },
};

export default nextConfig;
