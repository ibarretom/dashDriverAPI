import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { router } from './routes/index.routes'
import { AppDataSource } from './config/typeorm'

const app = express()

app.use(cors())
app.use(express.json())

AppDataSource.initialize()
  .then(() => console.log('databaseStarted'))
  .catch((err) => console.log(err))

app.use(router)

export { app }
