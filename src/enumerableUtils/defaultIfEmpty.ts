import { isArray } from '../utils/isArray.ts'

export const defaultIfEmpty = <T, TDefault extends T | undefined = undefined>(
  source: Iterable<T>,
  defaultValue?: TDefault,
) => {
  if (!isArray(source)) {
    return defaultIfEmptyIterator(source, defaultValue)
  }

  if (source.length > 0) {
    return source
  }
  return [defaultValue as TDefault]
}

export function* defaultIfEmptyIterator<T, TDefault extends T | undefined = undefined>(
  source: Iterable<T>,
  defaultValue?: TDefault,
) {
  const iterator = source[Symbol.iterator]()
  let result = iterator.next()

  if (result.done) {
    yield defaultValue as TDefault
  }

  while (!result.done) {
    yield result.value
    result = iterator.next()
  }
}
