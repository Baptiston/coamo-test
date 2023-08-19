import * as fs from 'fs';
import { Express, Router } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.get('/', (_, res) => res.send({ status: '200' }))
  app.use(router)

  fs.readdirSync(`${__dirname}/../routes`).map(async file => {
    (await import(`../routes/${file}`)).default(router)
  })
}
