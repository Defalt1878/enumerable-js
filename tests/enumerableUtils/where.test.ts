import { expectIterable } from '../../src/utils/testUtils.ts'
import { where, whereNotNull } from '../../src/enumerableUtils/where.ts'

describe('where', () => {
  describe('where', () => {
    test('Should return empty array, if source is empty', () => {
      expectIterable(where([], e => e > 1)).toEqual([])
    })
    test('Should return empty array, if no valid elements by filter', () => {
      expectIterable(where([1, 2, 3], () => false)).toEqual([])
    })
    test('Should filter elements', () => {
      expectIterable(where([1, 2, 0], e => e > 1)).toEqual([2])
    })
  })
  describe('whereNotNull', () => {
    test('Should return same, if no null values', () => {
      const source = ['', 0, {}]
      expectIterable(whereNotNull(source)).toEqual(source)
    })
    test('Should filter null values', () => {
      expectIterable(whereNotNull([null])).toEqual([])
    })
    test('Should filter undefined values', () => {
      expectIterable(whereNotNull([undefined])).toEqual([])
    })
    test('Should filter all null values', () => {
      expectIterable(whereNotNull([1, null, 2, undefined, null, 3])).toEqual([1, 2, 3])
    })
  })
})
