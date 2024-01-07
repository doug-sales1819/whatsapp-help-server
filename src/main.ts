import 'dotenv/config'

import { Server } from './server'

const PORT = Number(process.env.PORT)

async function bootstrap() {
  const server = new Server()

  server.start(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

;(async (): Promise<void> => {
  await bootstrap()
})()
