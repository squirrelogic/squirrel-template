/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/supabase"],
  experimental: {
    instrumentationHook: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
