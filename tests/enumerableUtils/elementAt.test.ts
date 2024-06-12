import { elementAtOrDefault } from '../../src/enumerableUtils/elementAt.ts'

describe('elementAt', () => {
  describe('elementAtOrDefault', () => {
    describe('array' , () => {
      describe('zero or positive index', () => {
        test('Should return undefined, if empty', () => {
          const source = [] as number[]
          expect(elementAtOrDefault(source, 0)).toBeUndefined()
        })
        test('Should return undefined, if no element at this index', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source, 3)).toBeUndefined()
        })
        test('Should return correct element, if has element at this index', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source, 1)).toBe(3)
        })
      })
      describe('negative index', () => {
        test('Should return undefined, if empty', () => {
          const source = [] as number[]
          expect(elementAtOrDefault(source, -1)).toBeUndefined()
        })
        test('Should return undefined, if no element at this index', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source, -4)).toBeUndefined()
        })
        test('Should return last element, if index -1', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source, -1)).toBe(1)
        })
        test('Should return first element, if index is -array.length', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source, -source.length)).toBe(2)
        })
      })
    })

    describe('iterable' , () => {
      describe('zero or positive index', () => {
        test('Should return undefined, if empty', () => {
          const source = [] as number[]
          expect(elementAtOrDefault(source.values(), 0)).toBeUndefined()
        })
        test('Should return undefined, if no element at this index', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source.values(), 3)).toBeUndefined()
        })
        test('Should return correct element, if has element at this index', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source.values(), 1)).toBe(3)
        })
      })
      describe('negative index', () => {
        test('Should return undefined, if empty iterable', () => {
          const source = [] as number[]
          expect(elementAtOrDefault(source.values(), -1)).toBeUndefined()
        })
        test('Should return undefined, if no element at this index', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source.values(), -4)).toBeUndefined()
        })
        test('Should return last element, if index -1', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source.values(), -1)).toBe(1)
        })
        test('Should return first element, if index is -array.length', () => {
          const source = [2, 3, 1]
          expect(elementAtOrDefault(source.values(), -source.length)).toBe(2)
        })
      })
    })
  })
})