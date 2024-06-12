import { isEmptyArray } from '../utils/isArray.ts'

export const contains = <T>(source: Iterable<T>, element: T) => {
  if (isEmptyArray(source)) {
    return false
  }

  for (const e of source) {
    if (Object.is(e, element)) {
      return true
    }
  }
  return false
}