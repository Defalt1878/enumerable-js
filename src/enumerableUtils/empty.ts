export const empty = <T>(): Iterable<T> => {
  const iterator: Iterator<T> = {
    next: () => ({
      value: undefined,
      done: true,
    }),
  }

  return {
    [Symbol.iterator]: () => iterator,
  }
}