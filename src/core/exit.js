const options = require('../options.js')
const state = require('./state.js')

let exitHandled = false

/*
 *  Catches exists and crashes, if enabled, and saves to disk before closing
 */
function catchExit () {
  //so the program will not close instantly
  process.stdin.resume()
  if (options.saveOnExit) {
    saveOnExit()
  }
  if (options.saveOnCrash) {
    saveOnCrash()
  }
}

function exitHandler (opts, exitCode) {
  if (!exitHandled) {
    console.warn(`[KeepArray] TERMINATING: Saving on exit...`)
    state.writeAll(true)
    exitHandled = true
  }
  if (opts.exit) {
    process.exit()
  }
}

function saveOnExit () {  
  //do something when app is closing
  process.on('exit', exitHandler.bind(null, { cleanup:true }))
  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit:true }))
  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit:true }))
  process.on('SIGUSR2', exitHandler.bind(null, { exit:true }))
}

function saveOnCrash () { 
  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit:true }))
  process.on('uncaughtRejection', exitHandler.bind(null, { exit:true }))
}

module.exports = catchExit
