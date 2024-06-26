import { Selector } from '../types.ts'
import { isEmptyArray } from '../utils/isArray.ts'

export function minBy<T, TKey>(source: Iterable<T>, selector: Selector<T, TKey>) {
  if (isEmptyArray(source)) {
    return undefined
  }

  const iterator = source[Symbol.iterator]()
  let result = iterator.next()

  if (result.done) {
    return undefined
  }

  let min = result.value
  let minKey = selector(min)

  result = iterator.next()
  while (!result.done) {
    const curKey = selector(result.value)
    if (curKey < minKey) {
      min = result.value
      minKey = curKey
    }
    result = iterator.next()
  }

  return min
}