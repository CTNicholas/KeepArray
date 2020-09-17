const state = require('./core/state.js')
const catchExit = require('./core/exit.js')
const KeepArrayTable = require('./core/table.js')

/**
 * Public API for KeepArray
 * Methods: create, connect, delete, disconnect, options, write
 */
class KeepArray {
  /**
   * Modifiy the default options. The input is merged with he default options
   * @param {Object} opts optional - An object to be combined with options
   * @returns {Object} The merged options object
   */
  static options (opts = {}) {
    state.options = { ...state.options, ...opts }
    return { ...state.options }
  }
  
  /**
   * Creates a new KeepArray, and returns
   * @param {String} name required - The name of the table 
   * @param {Array} arr optional - The base array to be converted
   * @param {String} path optional - The directory of the datastore
   * @returns {KeepArray} The KeepArray connected array
   */
  static create (name, arr = [], path = state.options.defaultPath) {
    const table = new KeepArrayTable(name, path)
    state.add(table)
    return table.create(arr)
  }
  
  /**
   * Loads an array from a KeepArray JSON file, creates a new KeepArray, and returns
   * If canCreate == true, and the table does not exist, create a new table
   * @param {String} name required - The name of the table
   * @param {Boolean} canCreate optional - If true, create a table if it does not exist
   * @param {String} path optional - The directory of the datastore
   * @returns {KeepArray} The KeepArray connected array
   */
  static connect (name, canCreate = true, path = state.options.defaultPath) {
    if (!KeepArray.exists(name, path) && canCreate) {
      return KeepArray.create(name, [], path)
    }

    const table = new KeepArrayTable(name, path)
    state.add(table)
    return table.connect()
  }

   /**
   * Disconnects an array from KeepArray, and returns a regular array
   * @param {String} name required - The name of the table
   * @param {String} path optional - The directory of the datastore
   * @returns {KeepArray} The newly created regular array
   */
  static disconnect (name, path = state.options.defaultPath) {
    let arr = state.get(name, path)
    state.remove(name, path)
    const newArr = [...arr.array]
    arr = undefined
    return newArr
  }
  
  /**
   * Forces the input table to be written to disk immediately
   * @param {String} name required - The name of the table
   * @param {String} path optional - The directory of the datastore
   * @returns {Boolean} True if write is successful, false if not
   */
  static write (name, path = state.options.defaultPath) {
    const table = state.get(name, path)
    if (table) {
      return table.write(true)
    }
    return false
  }

  /**
   * Checks if a KeepArray table exists in the datastore
   * @param {String} name required - The name of the table
   * @param {String} path optional - The directory of the datastore
   * @returns {Boolean} True if table file exists, false if not
   */
  static exists (name, path = state.options.defaultPath) {
    const table = new KeepArrayTable(name, path)
    return table.exists()
  }
  
  /**
   * Deletes the input KeepArray table from the disk
   * @param {String} name required - The name of the table
   * @param {String} path optional - The directory of the datastore
   * @returns {Boolean} True if deletion successful, false if not
   */
  static delete (name, path = state.options.defaultPath) {
    const table = new KeepArrayTable(name, path)
    const deleted = table.delete()
    if (deleted) {
      state.remove(name, path)
    }
    return deleted
  }
}

// Export API class
module.exports = KeepArray

// On exit, catch, and make sure to save arrays before closing
catchExit()
