import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';
import { GraphQLError } from 'graphql';



// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// 

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const createDevLogger = ()=>{
  // logs dir
  const logDir: string = join(__dirname, LOG_DIR);

  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }

  const devLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: [
      // debug log setting
      new winstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/debug', // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        json: false,
        zippedArchive: true,
      }),
      // error log setting
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error', // log file /logs/error/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        handleExceptions: true,
        json: false,
        zippedArchive: true,
      }),
    ],
  });
  
  devLogger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
    }),
  );

  return devLogger;
}


const prodLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
    }),
  ],
});

export const logger = process.env.NODE_ENV === 'production' ? prodLogger : createDevLogger();

export const responseLogger = request => {
  const { query } = request.request;
  logger.info(query);
};

export const errorLogger = (error: GraphQLError) => {
  const { validationErrors } = error.extensions.exception;

  let message = '';
  if (validationErrors) {
    message = validationErrors.map(error => Object.values(error.constraints)).join(', ');
  } else {
    message = error.message;
  }
  logger.error(message);
};
