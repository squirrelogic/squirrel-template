import {withSentryConfig} from "@sentry/nextjs";
import "./env.mjs";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/supabase"],
  serverExternalPackages: [
    '@sentry/node',
    'require-in-the-middle',
    'import-in-the-middle'
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 
        '@sentry/node',
        'require-in-the-middle',
        'import-in-the-middle'
      ];
    }
    return config;
  },
};

// Wrap the existing configuration with the `next-intl` plugin
export default withSentryConfig(withNextIntl(nextConfig), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "squirrelogic",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
reactComponentAnnotation: {
enabled: true,
},

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});