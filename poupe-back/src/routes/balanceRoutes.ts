import { Router } from "express"

import { BalancesController } from "../controllers/balancesController"
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate"

const balanceRoutes = Router()
const controller = new BalancesController()

balanceRoutes.use(ensureAuthenticate)

balanceRoutes.post('/create/:userId', controller.create ) 
balanceRoutes.get('/list/:userId', controller.list )
balanceRoutes.delete('/delete/:id', controller.delete )

export {balanceRoutes}