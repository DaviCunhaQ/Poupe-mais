import { Router } from "express"

import { ExpenditureController } from "../controllers/expenditureController"
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate"

const expenditureRoutes = Router()
const controller = new ExpenditureController()

expenditureRoutes.use(ensureAuthenticate)

expenditureRoutes.post('/create/:userId', controller.create ) 
expenditureRoutes.get('/list/:userId', controller.list )
expenditureRoutes.get('/listByDate/:userId', controller.listByDate )
expenditureRoutes.delete('/delete/:id', controller.delete )

export {expenditureRoutes}