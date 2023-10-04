import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import httpLogger from 'morgan'

import db from '../db'
import logger from '../logger'

import apiRouter from './routes'

const webapp = express()

webapp.use(express.json())
webapp.use(express.urlencoded({ extended: false }))
webapp.use(cookieParser())
webapp.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin)
    }
  })
)

if (process.env.NODE_ENV !== 'production') {
  webapp.use(httpLogger('dev'))
}

webapp.use('/api', apiRouter)

async function openWebApp() {
  try {
    const r = await db.findOne({ key: 'serverport' })
    const webport = r && r.value ? r.value : 9999
    webapp.listen(webport, () => {
      logger.info(`webapp listening on port ${webport}`)
    })
  } catch (err) {
    logger.err(`webapp open error: ${err}`)
  }
}

export { webapp, openWebApp }
