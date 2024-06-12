import { Selector } from '../types.ts'
import { isEmptyArray } from '../utils/isArray.ts'

export const average = <T>(source: Iterable<T>, selector: Selector<T, number>) => {
  if (isEmptyArray(source)) {
    return undefined
  }

  let sum = 0
  let count = 0

  for (const e of source) {
    count++
    sum += selector(e)
  }

  return count === 0 ? undefined : sum / count
}