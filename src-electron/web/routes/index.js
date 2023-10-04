import express from 'express'
import tts from './tts'
const router = express.Router()

router.use('/tts', tts)
export default router
