import 'dotenv/config'

import { Server } from './server'
import { Whatsapp } from './bot/whatsapp'
import { logger } from './lib/winston'

async function bootstrap({ env, port }: any) {
  const whatsapp = new Whatsapp({
    session: 'whatsapp-bot',
    headless: 'new',
    devtools: false,
    debug: env === 'development',
    disableSpins: env === 'production',
  })

  const server = new Server()

  server.start(port, async () => {
    await whatsapp.initService()
    logger.info(`Server is running on port ${port}`)
  })
}

;(async (): Promise<void> => {
  const PORT = Number(process.env.PORT)
  const ENV = process.env.NODE_ENV as 'development' | 'production' | 'test'

  await bootstrap({ env: ENV, port: PORT })
})()
