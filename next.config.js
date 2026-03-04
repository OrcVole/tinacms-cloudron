/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ["mongodb-level"],
};

module.exports = nextConfig;
