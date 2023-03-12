import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import 'reflect-metadata'

import { router } from './routes/index.routes'
import { AppDataSource } from './config/typeorm'

import { AppError } from './errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())

process.env.NODE_ENV != 'test' &&
  AppDataSource.initialize()
    .then(() => console.log('databaseStarted'))
    .catch((err) => console.log(err))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  return res.status(500).json({ message: err.message })
})

export { app }
