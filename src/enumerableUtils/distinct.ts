import { isEmptyArray } from '../utils/isArray.ts'

export const distinct = <T>(source: Iterable<T>) => {
  if (isEmptyArray(source)) {
    return source
  }

  return distinctIterator(source)
}

export const distinctBy = <T, TKey>(source: Iterable<T>, keySelector: (element: T) => TKey) => {
  if (isEmptyArray(source)) {
    return source
  }

  return distinctIterator(source, keySelector)
}

function* distinctIterator<T, TKey = T>(source: Iterable<T>, keySelector?: (element: T) => TKey) {
  const iterator = source[Symbol.iterator]()

  let result = iterator.next()
  if (result.done) {
    return
  }
  const set = new Set<T | TKey>()

  do {
    const current = result.value
    const currentKey = keySelector ? keySelector(current) : current
    if (!set.has(currentKey)) {
      set.add(currentKey)
      yield current
    }
    result = iterator.next()
  } while (!result.done)
}