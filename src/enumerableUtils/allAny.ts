import { Predicate } from '../types.ts'
import { isEmptyArray } from '../utils/isArray.ts'

export const all = <T>(source: Iterable<T>, predicate: Predicate<T>) => {
  if (isEmptyArray(source)) {
    return true
  }

  for (const e of source) {
    if (!predicate(e)) {
      return false
    }
  }
  return true
}

export const any = <T>(source: Iterable<T>, predicate?: Predicate<T>) => {
  if (isEmptyArray(source)) {
    return false
  }

  if (!predicate) {
    return !source[Symbol.iterator]().next().done
  }

  for (const e of source) {
    if (predicate(e)) {
      return true
    }
  }
  return false
}