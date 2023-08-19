import { Router } from 'express'
import { adaptRoute } from '@/Main/adapters/express/expressRouteAdapter'
import { SalesControllerFactory } from '../factories/controllers/SalesControllerFactory'

export default (router: Router): void => {
   router.post('/sale', adaptRoute(SalesControllerFactory()))
}