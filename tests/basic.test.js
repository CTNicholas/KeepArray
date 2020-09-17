const KeepArray = require('../src/index.js')

KeepArray.options({
  defaultPath: './tests/datastore',
  loop: false
})

test('options working', () => {
  expect(KeepArray.options().defaultPath).toBe('./tests/datastore')
})

const table1Name = 'basic-table-1'
let table1 = KeepArray.create(table1Name, [1, 2, 3])

test('is KeepArray', () => {
  expect(Array.isArray(table1)).toBe(true)
  expect(table1.KeepArray.name).toBe(table1Name)
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
