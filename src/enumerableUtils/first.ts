import { Filter } from '../types.ts'
import { where } from './where.ts'

export function firstOrDefault<T>(source: Iterable<T>, filter?: Filter<T>) {
  if (Array.isArray(source) && !filter) {
    return (source[0] as T) ?? undefined
  }
  if (filter) {
    source = where(source, filter)
  }

  const result = source[Symbol.iterator]().next()
  return result.done ? undefined : result.value
}