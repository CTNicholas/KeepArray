const KeepArrayTable = require('./table.js')

function arrayChange (trap, keepArray, args) {
  if (trap === 'set') {
    console.log('SETTING', trap)
  }
}

module.exports = { arrayChange }
