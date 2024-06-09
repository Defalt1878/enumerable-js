import { Enumerable } from '../src'

describe('Enumerable', () => {
  const source = [2, 1, 3]

  test('Should iterate over passed collection', () => {
    const enumerable = Enumerable.from(source)
    expect([...enumerable]).toEqual(source)
  })
})