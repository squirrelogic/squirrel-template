import pino from "pino";

export function getLogger(options = {}) {
  return pino({
    level: process.env.LOG_LEVEL || "info",
    ...options,
    browser: {
      asObject: true,
    },
  });
}
