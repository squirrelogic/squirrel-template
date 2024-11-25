import type { Config } from "tailwindcss";
import sharedConfig from "@repo/ui/tailwind.config";

const config = {
  // Extend the shared config
  ...sharedConfig,
  // Override content paths to include web app paths
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Include UI package components
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;

export default config;
