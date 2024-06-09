import { lastOrDefault } from '../../src/enumerableUtils/last.ts'
import { enrichWithIteratorMock } from '../../src/utils/testUtils.ts'

describe('last', () => {
  describe('lastOrDefault', () => {
    test('Should return first element without calling iterator, if source is array', () => {
      const source = enrichWithIteratorMock([1, 2, 3])
      expect(lastOrDefault(source)).toBe(source[2])
      expect(source[Symbol.iterator]).not.toHaveBeenCalled()
    })
    test('Should return undefined element without calling iterator, if source is empty iterable', () => {
      const source = enrichWithIteratorMock([])
      expect(lastOrDefault(source)).toBeUndefined()
      expect(source[Symbol.iterator]).not.toHaveBeenCalled()
    })
    test('Should return first element, if source is not array', () => {
      const source = [1, 2, 3]
      expect(lastOrDefault(source.values())).toBe(source[2])
    })
    test('Should return undefined, if no elements', () => {
      expect(lastOrDefault([].values())).toBeUndefined()
    })
  })
})