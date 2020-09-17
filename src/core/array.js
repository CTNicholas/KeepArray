const proxyHandler = require('./proxy.js')
const state = require('./state.js')

/*
 *  Extends array, adds hidden KeepArray properties
 *  Initialises from inputArray
 */
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
      console.log('[KeepArray] ERROR: Variable passed to KeepArray is not an array')
    }
  }
}

/*
 *  Adds a proxy to a new DbArray
 *  When proxy triggered calls proxyHandler ('./proxy.js')
 */
class ProxyArray {
  constructor (inputArray = [], keepArray = {}) {
    const newArray = new DbArray(inputArray, keepArray)
    return new Proxy(newArray, proxyHandler(newArray))
  }
}

overrideArrayMethods()
overrideToString()

/*
 *  Iterates through all array prototype methods, and passes to addMethod()
 *  toString() ignored
 */
function overrideArrayMethods () {
  const arrayProps = Object.getOwnPropertyNames(Array.prototype)
  arrayProps.forEach(prop => {
    if (typeof [][prop]  === 'function' && prop !== 'toString') {
      return addMethod(prop)
    }
  })
}

/*
 *  If method returns array, modifies method and adds to DbArray prototype
 *  All modified methods return a new ProxyArray, and notify state of a possible change
 */
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

/* 
 *  Overrides toString(). Example output:
 *  [KeepArray] 1,2,3 (Table: example-table, Path: datastore, Last write: 1600283836225)
 */
function overrideToString() {
  DbArray.prototype.toString = function (...args) {
    let { path, name, lastWrite } = this.KeepArray
    const date = new Date(lastWrite)
    lastWrite = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`
    return `[KeepArray] ${this.join(',')} (Table: ${name}, Path: ${path}, Last write: ${lastWrite})`
  }
}

module.exports = ProxyArray
