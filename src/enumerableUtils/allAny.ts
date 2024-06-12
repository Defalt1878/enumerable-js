import { Predicate } from '../types.ts'
import { isArray, isEmptyArray } from '../utils/isArray.ts'

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
  if (isArray(source)) {
    if (source.length === 0) {
      return false
    }
    if (!predicate) {
      return true
    }
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