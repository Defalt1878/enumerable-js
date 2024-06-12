import { SortOrder, SortStage } from '../types.ts'
import { isEmptyArray } from '../utils/isArray.ts'

export const sort = <T>(source: Iterable<T>, stages: SortStage<T>[]) => {
  if (isEmptyArray(source) || stages.length === 0) {
    return source
  }

  const array = Array.from(source)
  array.sort(createComparator(stages))
  return array
}

const createComparator = <T>(stages: SortStage<T>[]) => {
  return (a: T, b: T) => {
    for (const { keySelector, order } of stages) {
      const result = compare(keySelector(a), keySelector(b))
      if (result !== 0) {
        return order === SortOrder.Ascending ? result : 0 - result
      }
    }
    return 0
  }
}

const compare = <T>(a: T, b: T) => {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}