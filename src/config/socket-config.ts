import type { ServerOptions } from 'socket.io'

const socketConfig: Partial<ServerOptions> = {
  cors: {
    origin: '*',
  },
  connectionStateRecovery: {},
}

export default socketConfig
