export const isArray = <T>(iterable: Iterable<T>): iterable is T[] => Array.isArray(iterable)
export const isEmptyArray = <T>(iterable: Iterable<T>): iterable is never[] =>
  Array.isArray(iterable) && iterable.length === 0
