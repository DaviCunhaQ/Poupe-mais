import { Router } from "express"

import { UsersController } from "../controllers/usersController"
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate"

const usersRoutes = Router()
const controller = new UsersController()

usersRoutes.post('/users/create', controller.create )

usersRoutes.use(ensureAuthenticate)

usersRoutes.get('/users/list', controller.list )
usersRoutes.get('/users/show/:id', controller.show )
usersRoutes.put('/users/update/:id', controller.update )
usersRoutes.delete('/users/delete/:id', controller.delete )
usersRoutes.put('/users/redefine/:id', controller.redefine)

export {usersRoutes}