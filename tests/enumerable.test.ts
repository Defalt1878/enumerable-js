import { Enumerable } from '../src'
import { assertNoIteratorCall, enrichWithIteratorMock } from './testUtils.ts'

describe('Enumerable', () => {

  test('Should iterate over passed collection', () => {
    const source = [3, 1, 2]
    const enumerable = Enumerable.from(source)
    expect([...enumerable]).toEqual(source)
  })

  test('toArray should return source array without calling iterator, if no modification', () => {
    const source = enrichWithIteratorMock([2, 1, 3])
    const enumerable = Enumerable.from(source)
    expect(enumerable.toArray()).toEqual(source)
    assertNoIteratorCall(source)
  })

  test('toArray should return sorted array, if order was called', () => {
    const source = [3, 1, 2]
    const enumerable = Enumerable.from(source)
    expect(enumerable.order().toArray()).toEqual([1, 2, 3])
  })
})