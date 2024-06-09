import { firstOrDefault } from '../../src/enumerableUtils/first.ts'
import { enrichWithIteratorMock } from '../../src/utils/testUtils.ts'

describe('first', () => {
  describe('firstOrDefault', () => {
    test('Should return first element without calling iterator, if source is array', () => {
      const source = enrichWithIteratorMock([1, 2, 3])
      expect(firstOrDefault(source)).toBe(source[0])
      expect(source[Symbol.iterator]).not.toHaveBeenCalled()
    })
    test('Should return first element, if source is not array', () => {
      const source = [1, 2, 3]
      expect(firstOrDefault(source.values())).toBe(source[0])
    })
    test('Should return undefined, if no elements', () => {
      expect(firstOrDefault([].values())).toBeUndefined()
    })
    test('Should return first valid element, if filter passed', () => {
      const source = [1, 2, 3]
      expect(firstOrDefault(source.values(), e => e > 2)).toBe(3)
    })
    test('Should return undefined, if no all elements invalid by filter', () => {
      const source = [1, 2, 3]
      expect(firstOrDefault(source.values(), e => e > 3)).toBeUndefined()
    })
  })
})