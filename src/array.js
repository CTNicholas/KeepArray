const DbProxy = require('./proxy.js')

class DbArray extends Array {
  constructor (inputArray = [], keepArray = {}) {
    super()

    Object.defineProperty(this, 'keepArray', {
      value: keepArray,
      writable: false
    })

    if (Array.isArray(inputArray)) {
      inputArray.forEach((val, index) => 
      this[index] = val
      )
    } else {
      console.log('Not an array')
    }
  }
}

class ProxyArray {
  constructor (...args) {
    return new Proxy(new DbArray(...args), DbProxy())
  }
}

overrideArrayMethods()
overrideToString()

function overrideArrayMethods () {
  const arrayProps = Object.getOwnPropertyNames(Array.prototype)
  arrayProps.forEach(prop => {
    if (typeof [][prop]  === 'function' && prop !== 'toString') {
      return addMethod(prop)
    }
  })
}

function addMethod (prop) {
  DbArray.prototype[prop] = function (...args) {
    const result = [][prop].bind(this, ...args)()
    if (Array.isArray(result)) {
      return new ProxyArray(result, this.keepArray || {})
    }
    return result
  }
}

function overrideToString() {
  DbArray.prototype.toString = function (...args) {
    return '[FeatherDB] ' + this.join(',')
  }
}

module.exports = ProxyArray
