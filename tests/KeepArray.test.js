const KeepArray = require('../src/main.js')

KeepArray.options({
  defaultPath: './tests/datastore'
})

test('options working', () => {
  expect(KeepArray.options().defaultPath).toBe('./tests/datastore')
})

const table1Name = 'test-db'
let table1 = KeepArray.create(table1Name, [1, 2, 3])

test('is array', () => {
  expect(Array.isArray(table1)).toBe(true)
})

test('array correct length', () => {
  expect(table1.length).toBe(3)
})

test('toString correct', () => {
  expect(table1.toString().startsWith('[KeepArray] 1,2,3')).toBe(true)
})

test('pop working', () => {
  expect(table1.pop()).toBe(3)
})

test('filter working', () => {
  expect(table1.filter(x => x === 2).length).toBe(1)
})

test('push working', () => {
  expect(table1.push(3)).toBe(3)
})

test('method returns same type', () => {
  expect(typeof table1).toBe(typeof table1.filter(x => x))
})

test('map working', () => {
  expect(table1.map(x => ++x)[0]).toBe(2)
})

test('doesn\'t revert to array', () => {
  expect(table1.filter).toBe(table1.map(x => x).filter)
})

test('delete table works', () => {
  expect(KeepArray.delete(table1Name)).toBe(true)
})

const table2Name = 'permanent-test-db'
let table2 = KeepArray.connect(table2Name)
let lastWrite

test('read table works', () => {
  lastWrite = table2.KeepArray.lastWrite
  expect(table2.length === 3 && table2[0] === 'one').toBe(true)
})

test('write table works', () => {
  expect(KeepArray.write(table2Name) && table2.KeepArray.lastWrite > lastWrite).toBe(true)
})
