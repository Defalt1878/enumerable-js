import { Filter, Selector } from './types.ts'

export interface IEnumerable<out T> extends Iterable<T> {
  toArray: () => T[]
  firstOrDefault: (filter?: Filter<T>) => T | undefined
  lastOrDefault: () => T | undefined
  minBy: <TKey>(selector: Selector<T, TKey>) => T | undefined
  count: (filter?: Filter<T>) => number

  defaultIfEmpty: <TDefault extends T | undefined = undefined>(defaultValue?: TDefault) => IEnumerable<T | TDefault>

  where: (filter: Filter<T>) => IEnumerable<T>
  select: <TResult>(selector: Selector<T, TResult>) => IEnumerable<TResult>
  whereNotNull: () => IEnumerable<NonNullable<T>>

  distinct: () => IEnumerable<T>
  distinctBy: <TKey>(keySelector: Selector<T, TKey>) => IEnumerable<T>

  order: () => IOrderedEnumerable<T>
  orderDescending: () => IOrderedEnumerable<T>
  orderBy: <TKey>(keySelector: Selector<T, TKey>) => IOrderedEnumerable<T>
  orderByDescending: <TKey>(keySelector: Selector<T, TKey>) => IOrderedEnumerable<T>
}

export interface IOrderedEnumerable<out T> extends IEnumerable<T> {
  thenBy: <TKey>(keySelector: Selector<T, TKey>) => IOrderedEnumerable<T>
  thenByDescending: <TKey>(selector: Selector<T, TKey>) => IOrderedEnumerable<T>
}
