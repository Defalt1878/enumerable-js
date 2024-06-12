import { Predicate, Selector } from './types.ts'

export interface IEnumerable<T> extends Iterable<T> {
  toArray: () => T[]
  firstOrDefault: (filter?: Predicate<T>) => T | undefined
  lastOrDefault: () => T | undefined
  minBy: <TKey>(selector: Selector<T, TKey>) => T | undefined
  count: (filter?: Predicate<T>) => number
  all: (predicate: Predicate<T>) => boolean
  any: (predicate?: Predicate<T>) => boolean
  average: (selector: Selector<T, number>) => number | undefined
  contains: (element: T) => boolean
  elementAtOrDefault: (index: number) => T | undefined

  defaultIfEmpty: <TDefault extends T | undefined = undefined>(defaultValue?: TDefault) => IEnumerable<T | TDefault>

  where: (filter: Predicate<T>) => IEnumerable<T>
  select: <TResult>(selector: Selector<T, TResult>) => IEnumerable<TResult>
  whereNotNull: () => IEnumerable<NonNullable<T>>

  distinct: () => IEnumerable<T>
  distinctBy: <TKey>(keySelector: Selector<T, TKey>) => IEnumerable<T>

  order: () => IOrderedEnumerable<T>
  orderDescending: () => IOrderedEnumerable<T>
  orderBy: <TKey>(keySelector: Selector<T, TKey>) => IOrderedEnumerable<T>
  orderByDescending: <TKey>(keySelector: Selector<T, TKey>) => IOrderedEnumerable<T>
}

export interface IOrderedEnumerable<T> extends IEnumerable<T> {
  thenBy: <TKey>(keySelector: Selector<T, TKey>) => IOrderedEnumerable<T>
  thenByDescending: <TKey>(selector: Selector<T, TKey>) => IOrderedEnumerable<T>
}
