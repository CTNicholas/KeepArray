const KeepArray = require('../src/index.js')

KeepArray.options({
  writeTime: 10,
  delayTime: 0
})

const db = KeepArray.create('temp-table', ['apples', 'bananas'], './tests/datastore')

setTimeout(() => {
  db.push('cherries')
  setTimeout(() => process.exit(1), 2000)
}, 1000)

console.log('Ready for exit...')

setInterval(() => {}, 10000)
