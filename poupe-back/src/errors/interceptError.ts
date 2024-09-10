import express, { NextFunction, Request, Response } from "express"
import { AppError } from "./AppError"
import { ZodError } from "zod"

export const interceptError = (error: Error, req: Request, res: Response, next: NextFunction)=>{
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'Validation Error',
      message: error.issues
    })
  }
  
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}