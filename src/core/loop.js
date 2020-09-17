const state = require('./state.js')

let running = false
let waiting = {}

/* 
 *  If loop enabled, start loop
 *  If not already waiting for db, add to list
 *  If not already running timer, run timer with a delay (throttling)
 */
function writeLoop (filePath, func) {
  if (!state.options.loop) {
    return func()
  }

  if (waiting[filePath] === undefined) {
    waiting[filePath] = func
  }

  if (!running) {
    setTimeout(() => timer(), state.options.delayTime * 1000)
  }
}

module.exports = writeLoop

/*
*  Self-adjusting timer
*  If not already running timer, run instantly
*  
*  When run() is activated:
*  If changes are waiting, run all, and start  new timer
*  If no changes, don't run new timer  
*  
*/
function timer () {  
  const interval = state.options.writeTime * 1000
  let expected = Date.now() + interval
  
  if (!running) {
    run()
    setTimeout(run, interval)
    running = true
  }

  function run() {
    if (Object.keys(waiting).length) {
      const time = Date.now()
      const drift = time - expected
      if (drift > interval) {
        console.warn(`[KeepArray] WARNING: Timer loop out of sync`)
      }
      Object.values(waiting).forEach(func => func())
      waiting = {}

      expected += interval
      setTimeout(run, Math.max(0, interval - drift))
    } else {
      running = false
    }
  }
}
