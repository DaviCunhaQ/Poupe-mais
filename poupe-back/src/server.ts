import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import {routes} from './routes'
import { interceptError } from './errors/interceptError'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(interceptError)

app.listen(3333, ()=>{
  console.log('Deu Bom')
})