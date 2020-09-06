const traps = [
  'set',
  'construct',
  'deleteProperty',
  'defineProperty'
]

module.exports = function (callback = () => {}) {
  const handler = {}
  traps.forEach(trap => {
    handler[trap] = function (...args) {
      callback(trap, args)
      return Reflect[trap](...args)
    }
  })
  return handler
}
