const KeepArray = require('./main.js')

const funcs = [
  readWrite,
  writeTimes
]

KeepArray.options({
  writeTime: 10
})

console.log('\n\n')
funcs[0]()
keepAlive()
console.log('\n\n')

function readWrite () {
  const db = KeepArray.connect('fruit-lemon')
  db.push('hi')
  setTimeout(() => db.push('hello'), 2000)
  setTimeout(() => db.push('two'), 3000)
  setTimeout(() => db.push('three'), 15000)
}

function writeTimes () {
  const db = KeepArray.create('test-db-name', [5, 6, 7])
  db.push('hi')
  setTimeout(() => db.push('hello'), 6000)
  setTimeout(() => db.push('two'), 8000)
  setTimeout(() => db.push('three'), 15000)
}

function keepAlive () {
  setInterval(() => {}, 3000)
}
