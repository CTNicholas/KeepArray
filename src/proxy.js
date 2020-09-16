const state = require('./state.js')

const traps = [
  'set',
  // 'construct',
  // 'deleteProperty',
  //'defineProperty'
]

function proxyHandler (keepArray) {
  const handler = {}
  traps.forEach(trap => {
    handler[trap] = function (...args) {
      state.change(keepArray, ...args)
      return Reflect[trap](...args)
    }
  })
  return handler
}

module.exports = proxyHandler
