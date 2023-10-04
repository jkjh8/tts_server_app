const { parentPort, workerData } = require('worker_threads')
const { PythonShell } = require('python-shell')
const path = require('path')
const os = require('os')
const platform = process.platform || os.platform()

const pythonPath = path.resolve(
  process.env.NODE_ENV === 'production' ? process.resourcePath : '',
  'venv',
  platform === 'win32' ? 'Scripts' : 'bin',
  'python'
)

const options = {
  mode: 'json',
  pythonPath: pythonPath,
  pythonOptions: ['-u'],
  scriptPath: './src-electron/api/tts',
  args: [JSON.stringify(workerData)]
}

PythonShell.run('tts.py', options)
  .then((result) => {
    if (result[0]) {
      parentPort.postMessage(result[0])
    } else {
      parentPort.postMessage(workerData)
    }
    parentPort.close()
  })
  .catch((err) => {
    parentPort.emit('error', err)
    parentPort.close()
  })
