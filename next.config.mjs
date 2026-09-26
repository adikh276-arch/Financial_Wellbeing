/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "/financial_wellbeing",
  images: {
    unoptimized: true,
  },
  // Suppress warnings that might invalidate the config
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/financial_wellbeing',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
