import { toArray } from './enumerableUtils/collections.ts'
import { defaultIfEmpty } from './enumerableUtils/defaultIfEmpty.ts'
import { distinct, distinctBy } from './enumerableUtils/distinct.ts'
import { firstOrDefault } from './enumerableUtils/first.ts'
import { lastOrDefault } from './enumerableUtils/last.ts'
import { minBy } from './enumerableUtils/min.ts'
import { select } from './enumerableUtils/select.ts'
import { where, whereNotNull } from './enumerableUtils/where.ts'

export interface IEnumerable<out T> extends Iterable<T> {
  toArray: () => T[]
  firstOrDefault: (filter?: (element: T) => boolean) => T | undefined
  lastOrDefault: () => T | undefined
  minBy: <TKey>(selector: (element: T) => TKey) => T | undefined

  defaultIfEmpty: <TDefault extends T | undefined = undefined>(defaultValue?: TDefault) => IEnumerable<T | TDefault>

  where: (filter: (element: T) => boolean) => IEnumerable<T>
  select: <TResult>(selector: (element: T) => TResult) => IEnumerable<TResult>
  whereNotNull: () => IEnumerable<NonNullable<T>>

  distinct: () => IEnumerable<T>
  distinctBy: <TKey>(keySelector: (element: T) => TKey) => IEnumerable<T>
}

export class Enumerable<out T> implements IEnumerable<T> {
  protected source: Iterable<T>

  private constructor(source: Iterable<T>) {
    this.source = source
  }

  public static from<T>(iterable: Iterable<T>): IEnumerable<T> {
    return new Enumerable(iterable)
  }

  public toArray() {
    return toArray(this.source)
  }

  public firstOrDefault(filter?: (element: T) => boolean) {
    return firstOrDefault(this.source, filter)
  }

  public lastOrDefault() {
    return lastOrDefault(this.source)
  }

  public minBy<TKey>(selector: (element: T) => TKey) {
    return minBy(this.source, selector)
  }

  public defaultIfEmpty<TDefault extends T | undefined = undefined>(defaultValue?: TDefault) {
    return Enumerable.from(defaultIfEmpty(this.source, defaultValue))
  }

  public where(filter: (element: T) => boolean) {
    return Enumerable.from(where(this.source, filter))
  }

  public select<TResult>(selector: (element: T) => TResult) {
    return Enumerable.from(select(this.source, selector))
  }

  public whereNotNull() {
    return Enumerable.from(whereNotNull(this.source))
  }

  distinct(): IEnumerable<T> {
    return Enumerable.from(distinct(this.source))
  }

  distinctBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<T> {
    return Enumerable.from(distinctBy(this.source, keySelector))
  }

  [Symbol.iterator]() {
    return this.source[Symbol.iterator]()
  }
}

