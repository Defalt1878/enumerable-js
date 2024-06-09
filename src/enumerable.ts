import { toArray } from './enumerableUtils/collections.ts'
import { defaultIfEmpty } from './enumerableUtils/defaultIfEmpty.ts'
import { firstOrDefault } from './enumerableUtils/first.ts'
import { lastOrDefault } from './enumerableUtils/last.ts'
import { minBy } from './enumerableUtils/min.ts'
import { select } from './enumerableUtils/select.ts'
import { where, whereNotNull } from './enumerableUtils/where.ts'

export interface Enumerable<out T> {
  [Symbol.iterator]: () => Iterator<T>

  toArray: () => T[]
  firstOrDefault: (filter?: (element: T) => boolean) => T | undefined
  lastOrDefault: () => T | undefined
  minBy: <TKey>(selector: (element: T) => TKey) => T | undefined

  defaultIfEmpty: <TDefault extends T | undefined = undefined>(defaultValue?: TDefault) => Enumerable<T | TDefault>

  where: (filter: (element: T) => boolean) => Enumerable<T>
  select: <TResult>(selector: (element: T) => TResult) => Enumerable<TResult>
  whereNotNull: () => Enumerable<Exclude<T, null | undefined>>
}

export const Enumerable = <T>(source: Iterable<T>): Enumerable<T> => ({
  [Symbol.iterator]: () => source[Symbol.iterator](),

  toArray: () => toArray(source),
  firstOrDefault: (filter?: (element: T) => boolean) => firstOrDefault(source, filter),
  lastOrDefault: () => lastOrDefault(source),
  minBy: <TKey>(selector: (element: T) => TKey) => minBy(source, selector),

  defaultIfEmpty: <TDefault extends T | undefined = undefined>(defaultValue?: TDefault) =>
    Enumerable(defaultIfEmpty(source, defaultValue)),

  where: (filter: (element: T) => boolean) => Enumerable(where(source, filter)),
  select: <TResult>(selector: (element: T) => TResult) => Enumerable(select(source, selector)),
  whereNotNull: () => Enumerable(whereNotNull(source)),
})
