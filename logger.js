import winston from 'winston';
import 'winston-daily-rotate-file';

const { transports, createLogger } = winston;

const transport = new transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = createLogger({
  level: 'silly',
  transports: [transport]
});

export default logger;
