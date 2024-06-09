export const enrichWithIteratorMock = <T>(source: T[]) => {
  source[Symbol.iterator] = jest.fn(source[Symbol.iterator])
  return source
}

export const assertNoIteratorCall = (source: unknown[]) => expect(source[Symbol.iterator]).not.toHaveBeenCalled()

export const expectIterable = <T>(iterable: Iterable<T>) => expect([...iterable])