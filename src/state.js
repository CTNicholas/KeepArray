const options = require('./options.js')

module.exports = {
  options: options,

  tables: {},

  add (table) {
    this.tables[table.filePath] = table
  },

  change (arr = { KeepArray: {} }) {
    const table = this.tables[createPath(arr.KeepArray.name, arr.KeepArray.path)] || null
    if (!table) {
      console.error('[KeepArray] table not added')
    } else { 
      table.array = arr
      table.write()
    }
  },

  remove (name, path) {
    const filterFunc = ([filePath]) => filePath !== createPath(name, path)
    this.tables = Object.fromEntries(Object.entries(this.tables).filter(filterFunc))
  },

  get (name, path) {
    return this.tables[createPath(name, path)] || false
  },

  isOpen (name, path) {
    return !!this.get(name, path)
  }
}

const path = require('path')

function createPath (name, filePath) {
  return path.join(filePath, name + '.json')
}
