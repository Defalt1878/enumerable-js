import { empty } from '../../src/enumerableUtils/empty.ts'
import { expectIterable } from '../../src/utils/testUtils.ts'

describe('empty', () => {
  test('Should return empty iterable', () => {
    expectIterable(empty()).toEqual([])
  })
})