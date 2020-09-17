const state = require('./state.js')

const traps = [
  // 'construct',
  //'defineProperty'
  'deleteProperty',
  'set'
]

/*
 *  Call state.change() on proxy traps defined by traps
 *  And reflect proxy method
 */
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
