const KeepArrayTable = require('./table.js')

class KeepArray {
  static create (name, arr = [], path = '') {
    const table = new KeepArrayTable(name, path)
    return table.create(arr)
  }
  
  static connect (name, path = '') {
    const table = new KeepArrayTable(name, path)
    return table.connect(name, path)
  }

  static reconnect (name, path = '', arr) {
    const table = new KeepArrayTable(name, path)
    return table.reconnect(arr)
  }
}

module.exports = KeepArray