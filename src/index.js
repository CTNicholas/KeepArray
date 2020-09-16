const KeepArrayTable = require('./table.js')
const ProxyArray = require('./array.js')





const funcs = [createRandom, createLemon, updateLemon]

funcs[0]()

function createRandom () {
  const tab = new KeepArrayTable('fruit-' + Math.random() * 1000)
  let tabtest = tab.create([7, 8, 9])
  tabtest.push('lemons')
  tabtest = tabtest.map(x => x + 12)
  tabtest.push('lemons')
  // console.log(tabtest)
  tabtest.write()
  //tab.write()
}

function createLemon () {
  const tab = new KeepArrayTable('fruit-lemon')
  let tabtest = tab.create([7, 8, 9])
  tabtest.push('lemons ')
  tabtest = tabtest.map(x => x + 12)
  tabtest.push('bananas ')
  tabtest.write()
}

function updateLemon () {
  const tab = new KeepArrayTable('fruit-lemon')
  let tabtest = tab.connect()
  //console.log(tab)
  //console.log(tabtest)
  tabtest.push('apples')
  tabtest.write()
}

/*
let a = new ProxyArray([1, 2, 3, '1'], { path: '', table: '', lastWrite: Date.now() })
const c = a[1]
const d = a.filter(x => x === 1) 
const e = d
const f = d[0]
//a = [4, 5, 7]
console.log(a, a.KeepArray)
console.log(d, d.KeepArray)
console.log(a.toString())

for (let item of a) {
  console.log(item)
}



*/