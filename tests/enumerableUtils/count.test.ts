import { count } from '../../src/enumerableUtils/count.ts'

describe('count', () => {
  test('Should return 0, if source is empty, no filter', () => {
    expect(count([])).toBe(0)
  })
  test('Should return 0, if source is empty, with filter', () => {
    expect(count([], e => e)).toBe(0)
  })
  test('Should return 0, if no matching elements by filter', () => {
    expect(count([1, 2, 3], e => e > 5)).toBe(0)
  })
  test('Should return valid count of all elements, if no filter passed', () => {
    expect(count([1, 2, 3])).toBe(3)
  })
  test('Should return valid count of elements matching filter, if filter passed', () => {
    expect(count([1, 2, 3], e => e > 1)).toBe(2)
  })
})