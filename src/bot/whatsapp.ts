import { EventEmitter } from 'node:events'
import { create, type Whatsapp as Venom, type CreateOptions } from 'venom-bot'
import { logger } from '../lib/winston'

export class Whatsapp extends EventEmitter {
  private client: Venom | null
  private readonly options: CreateOptions

  constructor(options: CreateOptions) {
    super()

    // Whatsapp client
    this.client = null
    // Whatsapp options to create the client
    this.options = options
  }

  /**
   * @description Initialize the Whatsapp service
   */
  public async initService(): Promise<void> {
    try {
      this.client = await create(this.options)
    } catch (error: any) {
      logger.error(error)
    }
  }

  /**
   * @description Get the Whatsapp client
   */
  public getClient(): Venom {
    if (!this.client) {
      throw new Error('Client is not initialized')
    }

    return this.client
  }
}
