![KeepArray logo](logo-small.png)

A tiny datastore that looks like an array. Use regular array methods, while KeepArray automatically tracks changes and saves a JSON file for you.

# Install
```shell
npm install keeparray
```
```js
const KeepArray = require('keeparray')
```

# Usage
## Create a KeepArray
Create a datastore with `KeepArray.create()`
```js
let data = KeepArray.create('table-name')
```
That's it, you have a simple KeepArray datastore!
## Use your table
You can use simple array methods to manipulate your datastore:
```js
data.push('apple', 'banana', 'cherry')  
data = data.map(fruit => fruit.toUpperCase())
data.pop()

console.log(data) // ['APPLE', 'BANANA']
```