const path = require('path')
const fs = require('fs')
const options = require('./options.js')
const ProxyArray = require('./array.js')

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
    writeArray(this, this.array)
    return this.array
  }

  connect () {
    
   // return createArray(this, inputArray)
  }

  reconnect (inputArray) {
    this.array = createArray(this, inputArray)
    return this.array
  }

  write () {
    writeArray(this, this.array)
  }
}

module.exports = KeepArrayTable

function createArray (context, inputArray) {
  return new ProxyArray(inputArray, { path: context.path, table: context.name, lastWrite: Date.now() })
}

function writeArray (context, inputArray) {
  const fileContent = {
    content: inputArray,
    info: inputArray.KeepArray
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