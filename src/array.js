const proxyHandler = require('./proxy.js')
const KeepArrayTable = require('./table.js')

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
    return new Proxy(new DbArray(inputArray, keepArray), proxyHandler(keepArray))
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
      console.log(this.KeepArray)
      const newTable = new KeepArrayTable(this.KeepArray.name, this.KeepArray.path || {})
      newTable.reconnect(result)
      // console.log('NEWTABLE', newTable)
      return newTable
    }
    return result
  }
}

function overrideToString() {
  DbArray.prototype.toString = function (...args) {
    let { path, table, lastWrite } = this.KeepArray
    const date = new Date(lastWrite)
    lastWrite = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`
    return `[KeepArray] ${this.join(',')} (Table: ${table}, Path: ${path}, Last write: ${lastWrite})`
  }
}

module.exports = ProxyArray
