import { createLogger, format, transports } from 'winston';
const { combine, timestamp: timestampFormat, printf } = format;

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const devLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(
      timestampFormat({
        // eslint-disable-next-line quotes
        format: "DD MMM 'YY HH:mm:ss",
      }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

// do this if you want to change logger in production
// let logger = null;

// if (process.env.NODE_ENV === 'dev') {
//   logger = developmentLogger();
// }

export const logger = devLogger();
