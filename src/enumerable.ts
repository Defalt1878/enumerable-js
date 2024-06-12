import { all, any } from './enumerableUtils/allAny.ts'
import { average } from './enumerableUtils/average.ts'
import { toArray } from './enumerableUtils/collections.ts'
import { contains } from './enumerableUtils/contains.ts'
import { count } from './enumerableUtils/count.ts'
import { defaultIfEmpty } from './enumerableUtils/defaultIfEmpty.ts'
import { distinct, distinctBy } from './enumerableUtils/distinct.ts'
import { elementAtOrDefault } from './enumerableUtils/elementAt.ts'
import { empty } from './enumerableUtils/empty.ts'
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

  public static empty<T>() {
    return new Enumerable<T>(empty())
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

  public all(predicate: Predicate<T>) {
    return all(this.iterable, predicate)
  }

  public any(predicate?: Predicate<T>) {
    return any(this.iterable, predicate)
  }

  public average(selector: Selector<T, number>) {
    return average(this.iterable, selector)
  }

  public contains(element: T) {
    return contains(this.iterable, element)
  }

  public elementAtOrDefault(index: number) {
    return elementAtOrDefault(this.iterable, index)
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