import { all, any } from '../../src/enumerableUtils/allAny.ts'

describe('anyAll', () => {
  describe('all', () => {
    test('Should return true, if array is empty', () => {
      const source = [] as never[]
      expect(all(source, () => false)).toBeTruthy()
    })
    test('Should return true, if all elements satisfy predicate', () => {
      const source = [1, 2, 3]
      expect(all(source, e => e !== 4)).toBeTruthy()
    })
    test('Should return true, if some elements not satisfy predicate', () => {
      const source = [1, 2, 3]
      expect(all(source, e => e !== 2)).toBeFalsy()
    })
  })
  describe('any', () => {
    test('Should return false, if no elements without predicate for array', () => {
      const source = [] as never[]
      expect(any(source)).toBeFalsy()
    })
    test('Should return false, if no elements without predicate for iterable', () => {
      const source = [] as never[]
      expect(any(source.values())).toBeFalsy()
    })
    test('Should return true, if has elements without predicate for array', () => {
      const source = [1, 2, 3]
      expect(any(source)).toBeTruthy()
    })
    test('Should return true, if has elements without predicate for iterable', () => {
      const source = [1, 2, 3]
      expect(any(source.values())).toBeTruthy()
    })
    test('Should return false, if all elements not satisfy predicate', () => {
      const source = [1, 2, 3]
      expect(any(source, e => e === 4)).toBeFalsy()
    })
    test('Should return true, if some elements satisfy predicate', () => {
      const source = [1, 2, 3]
      expect(any(source, e => e === 2)).toBeTruthy()
    })
  })
})