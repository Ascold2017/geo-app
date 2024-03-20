import { ServiceBroker } from 'moleculer'
import path from 'path'
export const broker = new ServiceBroker()

broker.loadServices(path.resolve(__dirname, '../services'), '*.service.ts')