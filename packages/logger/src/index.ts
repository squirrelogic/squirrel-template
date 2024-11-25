import pino from "pino";

const isDevelopment = process.env.NODE_ENV === "development";

export const logger = pino({
  level: isDevelopment ? "debug" : "info",
  browser: {
    asObject: true,
    write: (o) => {
      const { msg, ...rest } = o;
      const extras = Object.keys(rest).length ? rest : "";

      switch (o.level) {
        case 30: // info
          console.log("\x1b[32m%s\x1b[0m", msg, extras);
          break;
        case 20: // debug
          console.debug("\x1b[36m%s\x1b[0m", msg, extras);
          break;
        case 40: // warn
          console.warn("\x1b[33m%s\x1b[0m", msg, extras);
          break;
        case 50: // error
          console.error("\x1b[31m%s\x1b[0m", msg, extras);
          break;
        default:
          console.log(msg, extras);
      }
    },
  },
});
