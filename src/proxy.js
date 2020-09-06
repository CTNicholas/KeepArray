const { arrayChange } = require('./store.js')

const traps = [
  'set',
  'construct',
  'deleteProperty',
  'defineProperty'
]

function proxyHandler (keepArray) {
  const handler = {}
  traps.forEach(trap => {
    handler[trap] = function (...args) {
      arrayChange(trap, keepArray, args)
      return Reflect[trap](...args)
    }
  })
  return handler
}

module.exports = proxyHandler