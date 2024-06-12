import { empty } from '../../src/enumerableUtils/empty.ts'
import { expectIterable } from '../testUtils.ts'

describe('empty', () => {
  test('Should return empty iterable', () => {
    expectIterable(empty()).toEqual([])
  })
})