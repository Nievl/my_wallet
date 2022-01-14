import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    info: {
      type: "dateFile",
      filename: "./logs/info",
      encoding: "utf-8",
      pattern: "yyyy-MM-dd-hh.log",
      maxLogSize: 20000000,
      alwaysIncludePattern: true,
      compress: true,
      keepFileExt: true,
      daysToKeep: 30,
    },
    maxInfo: {
      type: "logLevelFilter",
      appender: "info",
      level: "debug",
      maxLevel: "error",
    },
    error: {
      type: "dateFile",
      filename: "./logs/error-",
      pattern: "yyyy-MM-dd.log",
      maxLogSize: 20000000,
      encoding: "utf-8",
      alwaysIncludePattern: true,
      compress: true,
      keepFileExt: true,
      daysToKeep: 30,
    },
    minError: {
      type: "logLevelFilter",
      appender: "error",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["console", "maxInfo", "minError"],
      level: "info",
      enableCallStack: true,
    },
  },
});

export const logger = log4js.getLogger("common");
export const loggerMiddleware = log4js.connectLogger(logger, {});
