import path from 'path'
import os from 'os'
import { PythonShell } from 'python-shell'
import { app } from 'electron'
import db from 'src-electron/db'
import uniqueId from '../uniqueId'
import { Worker } from 'worker_threads'

// const pythonfilepath = path.resolve(__dirname, './tts.py')
const platform = process.platform || os.platform()

const pythonPath = path.resolve(
  process.env.NODE_ENV === 'production' ? process.resourcePath : '',
  'venv',
  platform === 'win32' ? 'Scripts' : 'bin',
  'python'
)

async function getMediaFolder() {
  const r = await db.findOne({ key: 'mediafolder' })
  if (r && r.value) {
    return r.value
  } else {
    return app.getPath('documents')
  }
}

function ttsGet(args) {
  return new Promise(async (resolve, reject) => {
    const command = { ...args }
    const mediafolder = await getMediaFolder()
    console.log(mediafolder)
    PythonShell.run('tts.py', {
      mode: 'json',
      pythonPath: pythonPath,
      pythonOptions: ['-u'],
      scriptPath: './src-electron/api/tts',
      args: [
        JSON.stringify({
          ...args,
          filename: path.resolve(mediafolder, `${uniqueId(12)}.wav`)
        })
      ]
    })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })

    // if (command.comm === 'make_file') {
    //   command['filename'] = path.join(mediafolder, `${uniqueId(12).wav}`)
    // }
    // const workerPath = path.resolve('./src-electron/api/tts/', 'worker.js')
    // console.log(workerPath)
    // const worker = new Worker(workerPath, {
    //   workerData: command
    // })
    // worker.on('message', (message) => {
    //   resolve(message)
    // })
    // worker.on('exit', () => {
    //   resolve()
    // })
    // worker.on('error', (err) => {
    //   reject(err)
    // })
  })
}

export { ttsGet }
