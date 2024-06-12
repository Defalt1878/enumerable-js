import { minBy } from '../../src/enumerableUtils/min.ts'
import { assertNoIteratorCall, enrichWithIteratorMock } from '../testUtils.ts'

describe('min', () => {
  describe('minBy', () => {
    test('Should return min element, if has elements', () => {
      const source = [2, 1, 3]
      expect(minBy(source, e => e)).toBe(1)
    })
    test('Should return undefined without calling iterator, if source is empty array', () => {
      const source = enrichWithIteratorMock([])
      expect(minBy(source, e => e)).toBeUndefined()
      assertNoIteratorCall(source)
    })
    test('Should return undefined, if source is empty iterable', () => {
      expect(minBy([].values(), e => e)).toBeUndefined()
    })
  })
})