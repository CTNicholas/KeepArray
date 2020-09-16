const KeepArrayManager = require('./manager.js')
const KeepArrayTable = require('./table.js')
const ProxyArray = require('./array.js')
const KeepArray = require('./main.js')

const funcs = [ka2, ka1, manager1, createRandom, createLemon, updateLemon]


console.log('\n\n')
// funcs[0]()
console.log('\n\n')


function ka2 () {
  let db = KeepArray.connect('fruit-lemon')
  db.push('pear')
  db = db.map(x => x + ' hi')
  db.push('durian')
  console.log(db)
}

function ka1 () {
  let db = KeepArray.create('table-' + Math.random() * 100000)
  db.push(7)
  db.push('hello')
  db = db.map(x => x + x)
  db.push('apple')
  console.log(db)
}

function manager1 () {
  const tab = new KeepArrayTable('fruit-' + Math.random() * 100000)
  KeepArrayManager.add(tab)
  
  let tabtest = tab.create([7, 8, 9])

  tabtest.push('potato')
  //console.log('first', tabtest, tabtest.KeepArray)
  tabtest = tabtest.map(x => x + 12)
  tabtest.push('lemons')
  //console.log('second', tabtest, tabtest.KeepArray)
}

function createRandom () {
  const tab = new KeepArrayTable('fruit-' + Math.random() * 100000)
  let tabtest = tab.create([7, 8, 9])
  //console.log(tab, tabtest)
  tabtest.push('potato')
  console.log('first', tabtest, tabtest.KeepArray)
  tabtest = tabtest.map(x => x + 12)
  tabtest.push('lemons')
  console.log('second', tabtest, tabtest.KeepArray)
  tab.write()
  // console.log(tabtest)
  //tabtest.write()
  // KeepArray.write(tabtest)
  //tab.write()
}

function createLemon () {
  const tab = new KeepArrayTable('fruit-lemon')
  let tabtest = tab.create([7, 8, 9])
  tabtest.push('lemons ')
  tabtest.push('cherries ')
  tabtest = tabtest.map(x => x + 12)
  tabtest.push('bananas ')
  tab.write()
}

function updateLemon () {
  const tab = new KeepArrayTable('fruit-lemon')
  let tabtest = tab.connect()
  //console.log(tab)
  //console.log(tabtest)
  tabtest.push('apples')
  tab.write()
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