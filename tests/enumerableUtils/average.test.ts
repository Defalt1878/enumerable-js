import { average } from '../../src/enumerableUtils/average.ts'

describe('average', () => {
  test('Should return undefined, if array is empty', () => {
    const source = [] as number[]
    expect(average(source, e => e)).toBeUndefined()
  })
  test('Should return undefined, if iterable is empty', () => {
    const source = [] as number[]
    expect(average(source.values(), e => e)).toBeUndefined()
  })
  test('Should return only element, if array contains only element', () => {
    const source = [5]
    expect(average(source, e => e)).toBe(source[0])
  })
  test('Should return average of elements, if array contains multiple elements', () => {
    const source = [5, 1, 3]
    expect(average(source, e => e)).toBe(3)
  })
})