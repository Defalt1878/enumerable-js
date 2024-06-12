import { defaultIfEmpty } from '../../src/enumerableUtils/defaultIfEmpty.ts'
import { assertNoIteratorCall, enrichWithIteratorMock, expectIterable } from '../testUtils.ts'

describe('defaultIfEmpty', () => {
  test('Should return same array without calling iterator, if has elements, iterable is array', () => {
    const source = enrichWithIteratorMock([1, 2, 3])
    expect(defaultIfEmpty(source)).toEqual(source)
    assertNoIteratorCall(source)
  })
  test('Should return default value without calling iterator, if no elements, default passed, iterable is array', () => {
    const source = enrichWithIteratorMock<number>([])
    expect(defaultIfEmpty(source, 1)).toEqual([1])
    assertNoIteratorCall(source)
  })
  test('Should return undefined without calling iterator, if no elements, default passed, iterable is array', () => {
    const source = enrichWithIteratorMock([])
    expect(defaultIfEmpty(source)).toEqual([undefined])
    assertNoIteratorCall(source)
  })
  test('Should return same array, if has elements, iterable is not array', () => {
    const source = [1, 2, 3]
    expectIterable(defaultIfEmpty(source.values())).toEqual(source)
  })
  test('Should return default value, if no elements, default passed, iterable is not array', () => {
    expectIterable(defaultIfEmpty([].values() as Iterable<number>, 1)).toEqual([1])
  })
  test('Should return undefined, if no elements, default passed, iterable is not array', () => {
    expectIterable(defaultIfEmpty([].values())).toEqual([undefined])
  })
})