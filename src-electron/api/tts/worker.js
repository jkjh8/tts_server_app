const { parentPort, workerData } = require('worker_threads')
const { PythonShell } = require('python-shell')

const options = {
  mode: 'json',
  pythonPath: workerData.pythonPath,
  pythonOptions: ['-u'],
  scriptPath: __dirname,
  args: [JSON.stringify(workerData.args)]
}

PythonShell.run('tts.py', options)
  .then((result) => {
    if (result[0]) {
      parentPort.postMessage(result[0])
    } else {
      parentPort.postMessage(workerData.args)
    }
    parentPort.close()
  })
  .catch((err) => {
    parentPort.emit('error', err)
    parentPort.close()
  })
