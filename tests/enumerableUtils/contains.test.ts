import { contains } from '../../src/enumerableUtils/contains.ts'

describe('contains', () => {
  test('Should return false, if array is empty', () => {
    const source = [] as number[]
    expect(contains(source, 1)).toBeFalsy()
  })
  test('Should return undefined, if iterable is empty', () => {
    const source = [] as number[]
    expect(contains(source.values(), 3)).toBeFalsy()
  })
  test('Should return false, if source does not contain passed element', () => {
    const source = [2, 1, 3]
    expect(contains(source, 4)).toBeFalsy()
  })
  test('Should return true, if source contains passed element', () => {
    const source = [2, 1, 3]
    expect(contains(source, 1)).toBeTruthy()
  })
})