const KeepArrayManager = require('./manager.js')

function arrayChange (trap, arr, args) {
  if (trap === 'set') {
    //console.log('SETTING', trap, args[0].length, args)
    //console.log('SETTING', args[0].KeepArray)
    KeepArrayManager.change(args[0])
  }
   else {
     //console.log(trap.toUpperCase(), args)
   }
}

module.exports = { arrayChange }
