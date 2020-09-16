const state = require('./state.js')

const lastUpdate = ''
let running = false
let waiting = []

function writeLoop (func) {
  waiting.push(func)
  if (!running) {
    timer()
  }
}

module.exports = writeLoop

function timer () {
  running = true

  const interval = state.options.writeTime * 1000
  let expected = Date.now() + interval
  setTimeout(run, interval)

  function run() {
    if (waiting.length) {
      const time = Date.now()
      const drift = time - expected
      if (drift > interval) {
        console.warn(`[KeepArray] Timer loop out of sync`)
      }
      waiting.forEach(func => func())
      waiting = []
      lastUpdate = time

      expected += interval
      setTimeout(run, Math.max(0, interval - drift))
    } else {
      running = false
    }
  }
}