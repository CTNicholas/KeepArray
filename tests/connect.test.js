const KeepArray = require('../src/index.js')

KeepArray.options({
  defaultPath: './tests/datastore',
  loop: false
})

const table1Name = 'permanent-test-db'
let table1 = KeepArray.connect(table1Name)
let lastWrite

test('exists works', () => {
  expect(KeepArray.exists(table1Name)).toBe(true)
})

test('read table works', () => {
  lastWrite = table1.KeepArray.lastWrite
  expect(table1.length === 3 && table1[0] === 'one').toBe(true)
})

test('write table works', () => {
  expect(KeepArray.write(table1Name) && table1.KeepArray.lastWrite > lastWrite).toBe(true)
})

test('disconnect works', () => {
  const dcArray = KeepArray.disconnect(table1Name)
  expect(Array.isArray(dcArray)).toBe(true)
  expect(dcArray.KeepArray).toBe(undefined)
})


const table2Name = 'connect-table-2'
let table2

test('connect, but create table, because not exist, works', () => {
  expect(KeepArray.exists(table2Name)).toBe(false)
  table2 = KeepArray.connect(table2Name)
  expect(KeepArray.exists(table2Name)).toBe(true)
})

test('delete table works', () => {
  expect(KeepArray.delete(table2Name)).toBe(true)
})

