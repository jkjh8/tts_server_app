import express from 'express'
import path from 'path'
import fs from 'fs'
import { ttsGet } from 'src-electron/api/tts'

const router = express.Router()

let ttsinfo = null

router.get('/', async (req, res) => {
  try {
    if (!ttsinfo) {
      ttsinfo = await ttsGet({ comm: 'get_info' })
    }
    res.status(200).json({ result: ttsinfo })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/refresh', async (req, res) => {
  try {
    ttsinfo = await ttsGet({ comm: 'get_info' })
    res.status(200).json({ result: ttsinfo })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/stream', (req, res) => {
  const filepath = req.query.filepath

  if (!fs.existsSync(filepath)) {
    res.status(500).json({ error: 'File not found' })
  }

  const fileStat = fs.statSync(filepath)
  const { size } = fileStat
  const { range } = req.headers

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0])
    const end = parts[1] ? parseInt(parts[1]) : size - 1
    const chunk = end - start + 1
    const stream = fs.createReadStream(filepath, { start, end })
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunk,
      'Content-Type': 'audio/mpeg'
    })
    stream.pipe(res)
  } else {
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': 'audio/mpeg'
    })
    fs.createReadStream(filepath).pipe(res)
  }
})

router.get('/filestream', (req, res) => {
  try {
    const filepath = req.params.filepath
    const fileReadStream = fs.createReadStream(filepath)
    fileReadStream.pipe(res)
  } catch (error) {
    res.status(500).json({ error, message: 'internal server error' })
  }
})

router.post('/', (req, res) => {
  try {
    const { voice, rate, message } = req.body
    ttsGet({ comm: 'make_file', voice, rate, message })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default router
