import { distinct, distinctBy } from '../../src/enumerableUtils/distinct.ts'
import { expectIterable } from '../../src/utils/testUtils.ts'

describe('distinct', () => {
  describe('distinct', () => {
    test('Should return empty array, if source is empty', () => {
      const source = [] as never[]
      expect(distinct(source)).toEqual(source)
    })
    test('Should return same array, if no duplicates', () => {
      const source = [1, 2, 3]
      expectIterable(distinct(source)).toEqual(source)
    })
    test('Should save first element, if duplicated', () => {
      const source = [1, 2, 3, 2]
      expectIterable(distinct(source)).toEqual([1, 2, 3])
    })
    test('Should remove all duplicates, if multiple', () => {
      const source = [2, 1, 2, 3, 1]
      expectIterable(distinct(source)).toEqual([2, 1, 3])
    })
  })
  describe('distinctBy', () => {
    const createObjArray = (source: number[]) => {
      return source.map(e => ({ value: e }))
    }
    const selector = (e: { value: number }) => e.value

    test('Should return empty array, if source is empty', () => {
      const source = createObjArray([] as never[])
      expect(distinctBy(source, selector)).toEqual(source)
    })
    test('Should return same array, if no duplicates', () => {
      const source = createObjArray([1, 2, 3])
      expectIterable(distinctBy(source, selector)).toEqual(source)
    })
    test('Should save first element, if duplicated', () => {
      const source = createObjArray([1, 2, 3, 2])
      expectIterable(distinctBy(source, selector)).toEqual(createObjArray([1, 2, 3]))
    })
    test('Should remove all duplicates, if multiple', () => {
      const source = createObjArray([2, 1, 2, 3, 1])
      expectIterable(distinctBy(source, selector)).toEqual(createObjArray([2, 1, 3]))
    })
  })
})