const proxyHandler = require('./proxy.js')
const state = require('./state.js')

class DbArray extends Array {
  constructor (inputArray, keepArray) {
    super()

    Object.defineProperty(this, 'KeepArray', {
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
  constructor (inputArray = [], keepArray = {}) {
    const newArray = new DbArray(inputArray, keepArray)
    return new Proxy(newArray, proxyHandler(newArray))
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
      const newArray = new ProxyArray(result, this.KeepArray)
      state.change(newArray)
      return newArray
    }
    return result
  }
}

function overrideToString() {
  DbArray.prototype.toString = function (...args) {
    let { path, name, lastWrite } = this.KeepArray
    const date = new Date(lastWrite)
    lastWrite = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`
    return `[KeepArray] ${this.join(',')} (Table: ${name}, Path: ${path}, Last write: ${lastWrite})`
  }
}

module.exports = ProxyArray
