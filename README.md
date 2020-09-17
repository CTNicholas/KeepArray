![KeepArray logo](logo-small.png)

A zero dependency tiny datastore/database that looks and works like an array. Use regular array methods, while KeepArray automatically tracks changes and saves a JSON file for you.

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
let data = KeepArray.create('data-table')
```
That's it, you've created a KeepArray datastore!
## Use your array
You can use any array method to manipulate your datastore:
```js
// Create a datastore
let data = KeepArray.create('fruit')

// Example array methods
data.push('apple', 'banana', 'cherry')  
data = data.map(fruit => fruit.toUpperCase()) // Returns a connected KeepArray

console.log(data) // ['APPLE', 'BANANA', 'CHERRY']
```
 All array methods that return an array are supported. By default, the code above would save a JSON datastore to `datastore/fruit.json`
## Connect to an existing KeepArray
Connect to an existing datastore with `KeepArray.connect()`
```js
// Connect to a datastore
let data = KeepArray.connect('names')

// Example array methods
const list = ['Adam', 'Ben', 'Christian']
data.push(...list)
data = data.filter(name => name.length < 5) // Returns a connected KeepArray

console.log(data) // ['Adam', 'Ben']
```
By default, `connect()` will create a new datastore if one can not be found.
## Write to disk
Force a datastore to be immediately written to disk with `KeepArray.write()`
```js
// Create new store
let data = KeepArray.create('places', ['London', 'Paris', 'Berlin'])

// Instantly write to disk
KeepArray.write('places')
```
## Modify default options
Modify the default options with `KeepArray.options()`
```js
// Example
KeepArray.options({
  defaultPath: 'database',
  writeTime: 2
})
```
More info on options at the bottom of the page.
# API
## Methods
Name | Description | Syntax | Parameters
-|-|-|-
KeepArray.create() | Creates a new KeepArray datastore, and returns the linked array. | .create(name, *array*, *path*) | __name__ (String, required) The name of the new datastore.<br>__array__ (Array, optional) The contents of the newly created array.<br>__path__ (String, optional) The directory of the new datastore.
KeepArray.connect() | Loads a KeepArray datastore and returns the linked array. | .connect(name, *canCreate*, *path*) | __name__ (String, required) The name of the existing datastore.<br>__canCreate__ (Boolean, optional) Allow creation of a new KeepArray, if datastore does not exist.<br>__path__ (String, optional) The directory of the existing datastore.
KeepArray.disconnect() | Disconnects an array from KeepArray, and returns it as a regular array. | .disconnect(name, *path*) | __name__ (String, required) The name of the connected datastore.<br>__path__ (String, optional) The directory of the connected datastore.
KeepArray.write() | Forces the KeepArray to be written to disk. Returns `true` if successful, `false` if not. | .write(name, *path*) | __name__ (String, required) The name of the connected datastore.<br>__path__ (String, optional) The directory of the datastore.
KeepArray.exists() | Checks if KeepArray datastore exists. Returns `true` if it exists, `false` if not. | .exists(name, *path*) | __name__ (String, required) The name of the datastore.<br>__path__ (String, optional) The directory of the datastore.
KeepArray.delete() | Permanently deletes a KeepArray datastore. Returns `true` if it exists, `false` if not. | .delete(name, *path*) | __name__ (String, required) The name of the datastore.<br>__path__ (String, optional) The directory of the datastore.
KeepArray.options() | Modifiy the default options. The input is merged with the default options. Returns all options. | .options(*optionObject*) | __optionObject__ (Object, optional) The options applied (see section below).


## Options
Name | Description | Default
-|-|-
defaultPath | Default directory of the datastore. | 'datastore'
connectCanCreate | Specifies whether KeepArray.connect() will create a new datastore (instead of throwing an error) when an existing KeepArray is not found. | true
saveOnExit | Automatically write all open KeepArray datastores to disk when Node is exited. | true
saveOnCrash | Automatically write all open KeepArray datastores to disk on unhandledExceptions and unhandledRejections. | false
writeTime | Debounce time. Minimum time (in seconds) between disk writes, if a KeepArray has changed. | 5
delayTime | Throttle time. Time (in seconds) before saving to disk, after a KeepArray change. | 1
loop | Use debouncing and throttling to limit disk writes (recommended to leave this true). | true