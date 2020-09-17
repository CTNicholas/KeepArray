const options = require('../options.js')

module.exports = {
  // Holds options
  options: options,

  // Holds all currently watched tables
  tables: {},

  // Adds a table
  add (table) {
    this.tables[table.filePath] = table
  },

  // If table being watched, gets table, and notifies of a change (via table.write())
  change (arr = { KeepArray: {} }) {
    const table = this.tables[createPath(arr.KeepArray.name, arr.KeepArray.path)] || null
    if (!table) {
      console.error('[KeepArray] ERROR: Table not already being watched')
    } else { 
      table.array = arr
      table.write()
    }
  },

  // Immediately writes all tables to disk
  writeAll (instant) {
    try {
      Object.values(this.tables).forEach(table => table.write(instant))
      return true
    } catch (err) {
      console.error('[KeepArray] ERROR: Write all tables failed, check for errors above')
      return false
    }
  },

  // Removes a currently watched table
  remove (name, path) {
    const filterFunc = ([filePath]) => filePath !== createPath(name, path)
    this.tables = Object.fromEntries(Object.entries(this.tables).filter(filterFunc))
  },

  // Gets a currenty watched table
  get (name, path) {
    return this.tables[createPath(name, path)] || false
  },

  // Checks if table currently watched
  isOpen (name, path) {
    return !!this.get(name, path)
  }
}

const path = require('path')

function createPath (name, filePath) {
  return path.join(filePath, name + '.json')
}
