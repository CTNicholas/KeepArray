const KeepArrayTable = require('./table.js')
const ProxyArray = require('./array.js')




const tab = new KeepArrayTable('fruit-' + Math.random() * 1000)
let tabtest = tab.create([7, 8, 9])
tabtest.push('lemons')
tabtest = tabtest.map(x => x + 12)
tab.write()

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