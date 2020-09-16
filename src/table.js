const path = require('path')
const fs = require('fs')
const options = require('./options.js')

class KeepArrayTable {
  constructor (arrayName, arrayPath = options.defaultPath) {
    this.name = arrayName
    this.path = arrayPath
    this.filePath = path.join(this.path, this.name + '.json')
    return this
  }
  
  create (inputArray) {
    console.log('create()')
    if (!checkFileDirectory(this)) {
      return false
    }
    this.array = createArray(this, inputArray)
    console.log(this.array)
    writeArray(this, this.array)
    return this.array
  }
  
  connect () {
    console.log('connect()')
    const db = loadArray(this.name, this.path)

    if (!db) {
      console.warn(`[KeepArray] Table '${this.name}' does not exist`)
      return null
    } 
    
    this.array = createArray(db, db.content)
    console.log(this.array)
    return this.array
    // return createArray(this, inputArray)
  }
  
  reconnect (inputArray) {
    console.log('reconnect()')
    this.array = createArray(this, inputArray)
    return this.array
  }
  
  write () {
    console.log('write()')
    writeArray(this, this.array)
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
  fs.writeFileSync(context.filePath, JSON.stringify(fileContent))
  if (context.array) {
    context.array.lastWrite = Date.now()
  }
}

function checkFileDirectory (context) {
  if (!fs.existsSync(context.path)) {
    fs.mkdirSync(context.path)
  } else {
    if (fs.existsSync(context.filePath)) {
      console.log('Table name already exists, use another name or use KeepArray.connect()')
      return false
    }
  }
  return true
}