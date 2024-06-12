import { Selector } from '../types.ts'
import { isEmptyArray } from '../utils/isArray.ts'

export function* select<T, TResult>(source: Iterable<T>, selector: Selector<T, TResult>) {
  if (isEmptyArray(source)) {
    return source
  }

  for (const e of source) {
    yield selector(e)
  }
}