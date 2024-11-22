import "./env.mjs";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/supabase"],
};

// Wrap the existing configuration with the `next-intl` plugin
export default withNextIntl(nextConfig);
