const path = require('path')
const fs = require('fs')
const state = require('./state.js')
const writeLoop = require('./loop.js')

class KeepArrayTable {
  constructor (arrayName, arrayPath = state.defaultPath) {
    this.name = arrayName
    this.path = arrayPath
    this.filePath = path.join(this.path, this.name + '.json')
    return this
  }
  
  create (inputArray) {
    if (!checkFileDirectory(this)) {
      return false
    }
    this.array = createArray(this, inputArray)
    writeLoop(this.filePath, () => writeArray(this, this.array))
    return this.array
  }
  
  connect () {
    const db = loadArray(this.name, this.path)
    if (!db) {
      console.warn(`[KeepArray] Table '${this.name}' does not exist`)
      return null
    } 
    
    this.array = createArray(this, db.content)
    return this.array
  }
  
  reconnect (inputArray) {
    this.array = createArray(this, inputArray)
    return this.array
  }
  
  write (instant) {
    if (instant) {
      return writeArray(this, this.array)
    }
    return writeLoop(this.filePath, () => writeArray(this, this.array))
  }

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

function createArray ({ path, name, lastWrite = Date.now() }, inputArray) {
  return new ProxyArray(inputArray, { path, name, lastWrite })
}

function loadArray (name, filePath) {
  name += '.json'
  const dbContents = JSON.parse(fs.readFileSync(path.normalize(path.join(filePath, name))))
  return dbContents || null
}

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
    console.error(`[KeepArray] Problem writing '${context.name || 'table'}' to disk`)
    return false
  }
}

function deleteArray (name, filePath) {
  try {
    fs.unlinkSync(path.normalize(filePath))
    return true
  } catch (err) {
    console.error(`[KeepArray] Table ${name} cannot be deleted`, err)
    return false
  }
}

function checkFileDirectory (context) {
  if (!fs.existsSync(context.path)) {
    fs.mkdirSync(context.path)
  } else {
    if (fs.existsSync(context.filePath)) {
      console.log(`[KeepArray] Table '${context.name}' already exists, use another name or use KeepArray.connect()`)
      return false
    }
  }
  return true
}