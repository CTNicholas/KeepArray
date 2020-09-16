const state = require('./state.js')
const KeepArrayTable = require('./table.js')

class KeepArray {
  static options (opts = {}) {
    state.options = { ...state.options, ...opts }
    return { ...state.options }
  }

  static create (name, arr = [], path = state.options.defaultPath) {
    const table = new KeepArrayTable(name, path)
    state.add(table)
    return table.create(arr)
  }
  
  static connect (name, path = state.options.defaultPath) {
    const table = new KeepArrayTable(name, path)
    state.add(table)
    return table.connect()
  }

  static write(name, path = state.options.defaultPath) {
    const table = state.get(name, path)
    if (table) {
      return table.write()
    }
    return false
  }
  
  static delete (name, path = state.options.defaultPath) {
    const table = new KeepArrayTable(name, path)
    const deleted = table.delete()
    if (deleted) {
      state.remove(name, path)
    }
    return deleted
  }
}

module.exports = KeepArray
