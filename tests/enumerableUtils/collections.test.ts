import { toArray } from '../../src/enumerableUtils/collections.ts'
import { assertNoIteratorCall, enrichWithIteratorMock } from '../../src/utils/testUtils.ts'

describe('collections', () => {
  describe('toArray', () => {
    test('Should return same array without calling iterator, if source is array', () => {
      const source = enrichWithIteratorMock([1, 2, 3])
      expect(toArray(source)).toEqual(source)
      assertNoIteratorCall(source)
    })
    test('Should return same array, if source not array', () => {
      const source = [1, 2, 3]
      expect(toArray(source)).toEqual(source)
    })
  })
})