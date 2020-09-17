const path = require('path')
const fs = require('fs')
const state = require('./state.js')
const writeLoop = require('./loop.js')

/*
 *  Creates KeepArrayTables, used for writing tables to disk
 */
class KeepArrayTable {
  constructor (arrayName, arrayPath = state.defaultPath) {
    this.name = arrayName
    this.path = arrayPath
    this.filePath = path.join(this.path, this.name + '.json')
    this.previousSave = ''
    return this
  }
  
  // Creates a new KeepArray table, sends to writeLoop, returns table
  create (inputArray) {
    if (!checkFileDirectory(this)) {
      return false
    }
    this.array = createArray(this, inputArray)
    const arrString = JSON.stringify(this.array)
    if (this.previousSave !== arrString) {
      writeLoop(this.filePath, () => writeArray(this, this.array))
      this.previousSave = arrString
    }
    return this.array
  }
  
  // Loads a KeepArray JSON table, and returns
  connect () {
    const db = loadArray(this.name, this.path)
    if (!db) {
      console.error(`[KeepArray] ERROR: Table '${this.name}' does not exist`)
      return null
    } 
    
    this.array = createArray(this, db.content)
    return this.array
  }
  
  // Adds current table to writeLoop, returns ture if successful, false if not
  // If instant is true, write instantly instead
  write (instant) {
    if (instant) {
      return writeArray(this, this.array)
    }
    let returnVal = {}
    const arrString = JSON.stringify(this.array)
    if (this.previousSave !== arrString) {
      returnVal = writeLoop(this.filePath, () => writeArray(this, this.array))
      this.previousSave = arrString
    }
    return returnVal
  }

  exists () {
    return fs.existsSync(this.filePath)
  }

  // Deletes current table from disk, returns ture if successful, false if not
  delete () {
    if (deleteArray(this.name, this.filePath)) {
      this.array = null
      return true
    } else {
      return false
    }
  }
}

module.exports = KeepArrayTable

const ProxyArray = require('./array.js')

// Create new ProxyArray
function createArray ({ path, name, lastWrite = Date.now() }, inputArray) {
  return new ProxyArray(inputArray, { path, name, lastWrite })
}

// Load array from file
function loadArray (name, filePath) {
  name += '.json'
  const dbContents = JSON.parse(fs.readFileSync(path.normalize(path.join(filePath, name))))
  return dbContents || null
}

// Write array to file, if valid
function writeArray (context, inputArray) {
  const fileContent = {
    content: inputArray,
    meta: inputArray.KeepArray
  }
  try {
    fs.writeFileSync(context.filePath, JSON.stringify(fileContent))
    if (context.array) {
      context.array.KeepArray.lastWrite = Date.now()
    }
    return true
  } catch (err) {
    console.error(`[KeepArray] ERROR: Problem writing '${context.name || 'table'}' to disk`)
    return false
  }
}

// Deletes table from disk
function deleteArray (name, filePath) {
  try {
    fs.unlinkSync(path.normalize(filePath))
    return true
  } catch (err) {
    console.error(`[KeepArray] ERROR: Table ${name} cannot be deleted`, err)
    return false
  }
}

// Check if file and directory exist
function checkFileDirectory (context) {
  if (!fs.existsSync(context.path)) {
    fs.mkdirSync(context.path)
  } else {
    if (fs.existsSync(context.filePath)) {
      console.error(`[KeepArray] ERROR: Table '${context.name}' already exists, use another name or use KeepArray.connect()`)
      return false
    }
  }
  return true
}