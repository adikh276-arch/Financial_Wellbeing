/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "/financial_wellbeing",
  assetPrefix: "/financial_wellbeing",
  images: {
    unoptimized: true,
  },
  // Suppress warnings that might invalidate the config
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
