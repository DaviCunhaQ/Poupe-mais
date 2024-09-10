import { Router } from "express"
import { usersRoutes } from "./usersRoutes"
import { authenticateRoutes } from "./authenticateRoutes"
import { balanceRoutes } from "./balanceRoutes"
import { expenditureRoutes } from "./expenditureRoutes"
const routes = Router()

routes.use('/sessions', authenticateRoutes)
routes.use('/',usersRoutes)
routes.use('/balances', balanceRoutes)
routes.use('/expenditures', expenditureRoutes)

export {routes}