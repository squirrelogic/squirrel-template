// import {withSentryConfig} from "@sentry/nextjs";
import "./env.mjs";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { dangerouslyAllowSVG: true },
  transpilePackages: ["@repo/supabase"],
  serverExternalPackages: [
    "@sentry/node",
    "require-in-the-middle",
    "import-in-the-middle",
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "@sentry/node",
        "require-in-the-middle",
        "import-in-the-middle",
      ];
    }
    return config;
  },
};

// Wrap the existing configuration with the `next-intl` plugin
export default withNextIntl(nextConfig);
