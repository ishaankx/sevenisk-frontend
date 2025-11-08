/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // This is the image config we added
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;