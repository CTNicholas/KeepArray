const { table } = require('console')
const fs = require('fs')
const path = require('path')
const KeepArray = require('../src/index.js')

jest.useFakeTimers()

const table1Name = 'timer-db'
const fileDir = './tests/datastore'
const filePath = path.join(fileDir, table1Name + '.json')

KeepArray.options({
  defaultPath: fileDir,
  writeTime: 10,
  delayTime: 2,
  loop: true
})

let table1 = KeepArray.create(table1Name, [1, 2, 3])

test('push working', () => {
  expect(table1.push(4)).toBe(4)
})

test('throttle (delayTime) working', () => {
  expect(fs.existsSync(filePath)).toBe(false)
  jest.advanceTimersByTime(3000)
  expect(fs.existsSync(filePath)).toBe(true)
})

test('debounce (writeTime) working', () => {
  table1.push('hello')
  expect(fileIncludes('hello')).toBe(false)
  jest.advanceTimersByTime(10000)
  expect(fileIncludes('hello')).toBe(true)
})

test('throttle and debounce working more', () => {
  jest.advanceTimersByTime(100000)
  table1 = table1.map(x => x + 'lemon')
  expect(fileIncludes('lemon')).toBe(false)
  jest.advanceTimersByTime(3000)
  expect(fileIncludes('lemon')).toBe(true)
  table1 = table1.map(x => x + 'apple')
  expect(fileIncludes('apple')).toBe(false)
  jest.advanceTimersByTime(13000)
  expect(fileIncludes('apple')).toBe(true)
})

test('delete table works', () => {
  expect(KeepArray.delete(table1Name)).toBe(true)
})

function fileIncludes(str) {
  return fs.readFileSync(filePath).toString().includes(str)
}
