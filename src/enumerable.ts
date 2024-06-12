import { toArray } from './enumerableUtils/collections.ts'
import { count } from './enumerableUtils/count.ts'
import { defaultIfEmpty } from './enumerableUtils/defaultIfEmpty.ts'
import { distinct, distinctBy } from './enumerableUtils/distinct.ts'
import { firstOrDefault } from './enumerableUtils/first.ts'
import { lastOrDefault } from './enumerableUtils/last.ts'
import { minBy } from './enumerableUtils/min.ts'
import { select } from './enumerableUtils/select.ts'
import { where, whereNotNull } from './enumerableUtils/where.ts'
import { IEnumerable } from './interfaces.ts'
import { OrderedEnumerable } from './orderedEnumerable.ts'
import { Predicate, Selector, SortOrder } from './types.ts'

export class Enumerable<T> implements IEnumerable<T> {
  protected source: Iterable<T>

  protected constructor(source: Iterable<T>) {
    this.source = source
  }

  public static from<T>(iterable: Iterable<T>) {
    return new Enumerable(iterable)
  }

  protected get iterable(): Iterable<T> {
    return this.source
  }

  public toArray() {
    return toArray(this.iterable)
  }

  public firstOrDefault(filter?: Predicate<T>) {
    return firstOrDefault(this.iterable, filter)
  }

  public lastOrDefault() {
    return lastOrDefault(this.iterable)
  }

  public minBy<TKey>(selector: Selector<T, TKey>) {
    return minBy(this.iterable, selector)
  }

  public count(filter?: Predicate<T>) {
    return count(this.iterable, filter)
  }

  public defaultIfEmpty<TDefault extends T | undefined = undefined>(defaultValue?: TDefault) {
    return Enumerable.from(defaultIfEmpty(this.iterable, defaultValue))
  }

  public where(filter: Predicate<T>) {
    return Enumerable.from(where(this.iterable, filter))
  }

  public select<TResult>(selector: Selector<T, TResult>) {
    return Enumerable.from(select(this.iterable, selector))
  }

  public whereNotNull() {
    return Enumerable.from(whereNotNull(this.iterable))
  }

  public distinct() {
    return Enumerable.from(distinct(this.iterable))
  }

  public distinctBy<TKey>(keySelector: Selector<T, TKey>) {
    return Enumerable.from(distinctBy(this.iterable, keySelector))
  }

  public order() {
    return OrderedEnumerable.createOrdered(this.iterable, SortOrder.Ascending)
  }

  public orderDescending() {
    return OrderedEnumerable.createOrdered(this.iterable, SortOrder.Descending)
  }

  public orderBy<TKey>(keySelector: Selector<T, TKey>) {
    return OrderedEnumerable.createOrdered(this.iterable, SortOrder.Ascending, keySelector)
  }

  public orderByDescending<TKey>(keySelector: Selector<T, TKey>) {
    return OrderedEnumerable.createOrdered(this.iterable, SortOrder.Descending, keySelector)
  }

  public [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]()
  }
}