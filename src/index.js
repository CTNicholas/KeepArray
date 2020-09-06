const ProxyArray = require('./array.js')

let a = new ProxyArray(() => {}, [1, 2, 3, '1'], { path: '', table: '' })
const c = a[1]
const d = a.filter(x => x === 1) 
const e = d
const f = d[0]
//a = [4, 5, 7]
console.log(a, a.feather, a.Handler, a.Target)
console.log(d, d.feather)
console.log(a.toString())

for (let item of a) {
  console.log(item)
}



