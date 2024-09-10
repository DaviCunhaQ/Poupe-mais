import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken'
import { AppError } from "../errors/AppError";


export function ensureAuthenticate(
  req: Request, 
  res: Response, 
  next: NextFunction
)
{
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).json({
      message:'Token Required'
    })
  }

  const [_, token] = authHeader.split(' ');
  try {
    //verifica se o token existe
    const {sub} = verify(token, 'minhachavemuitosecreta')
    req.userId = sub as String

    next()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}