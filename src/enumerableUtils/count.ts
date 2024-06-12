import { Filter } from '../types.ts'
import { isArray } from '../utils/isArray.ts'
import { where } from './where.ts'

export const count = <T>(source: Iterable<T>, filter?: Filter<T>) => {
  if (isArray(source) && !filter) {
    return source.length
  }

  if (filter) {
    source = where(source, filter)
  }

  const iterator = source[Symbol.iterator]()

  let count = 0

  while (!iterator.next().done) {
    count++
  }
  return count
}