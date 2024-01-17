import { createLogger, format, transports, type Logger } from 'winston'

const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.simple(),
    format.colorize({ all: true, colors: { info: 'blue', error: 'red' } }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
})

export { logger }
