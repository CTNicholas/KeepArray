const DbArray = require('../src/array.js')

test('is array', () => {
  expect(Array.isArray(new DbArray([1, 2, 3]))).toBe(true)
})

test('array correct length', () => {
  expect(new DbArray([1, 2, 3]).length).toBe(3)
})

test('single is array', () => {
  expect(Array.isArray(new DbArray([1]))).toBe(true)
})

test('single array correct length', () => {
  expect(new DbArray([1]).length).toBe(1)
})

test('toString correct', () => {
  expect(new DbArray([1, 2, 3]).toString().endsWith('1,2,3')).toBe(true)
})

test('filter working', () => {
  expect(new DbArray([1, 2, 3]).filter(x => x === 2).length).toBe(1)
})

test('map working', () => {
  expect(new DbArray([1, 2, 3]).map(x => ++x)[0]).toBe(2)
})

test('method returns same type', () => {
  const arr = new DbArray([1, 2, 3])
  expect(typeof arr).toBe(typeof arr.filter(x => x))
})

test('doesn\'t revert to array', () => {
  const arr = new DbArray([1, 2, 3])
  expect(arr.filter).toBe(arr.map(x => x).filter)
})
