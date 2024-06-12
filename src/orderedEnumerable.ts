import { Enumerable } from './enumerable.ts'
import { sort } from './enumerableUtils/sort.ts'
import { IOrderedEnumerable } from './interfaces.ts'
import { Selector, SortOrder, SortStage } from './types.ts'
import { isEmptyArray } from './utils/isArray.ts'

const defaultSelector = <T>(item: T) => item

export class OrderedEnumerable<T> extends Enumerable<T> implements IOrderedEnumerable<T> {
  protected sortStages: SortStage<T>[]

  private constructor(source: Iterable<T>, sortStages: SortStage<T>[]) {
    super(source)
    this.sortStages = sortStages
  }

  public static createOrdered<T>(
    source: Iterable<T>,
    order: SortOrder,
    keySelector: Selector<T, unknown> = defaultSelector,
  ) {
    return new OrderedEnumerable(source, [
      {
        order,
        keySelector,
      },
    ])
  }

  protected get iterable(): Iterable<T> {
    return isEmptyArray(this.source) ? this.source : this
  }

  public thenBy<TKey>(keySelector: Selector<T, TKey>): IOrderedEnumerable<T> {
    return new OrderedEnumerable(this.source, [
      ...this.sortStages,
      {
        order: SortOrder.Ascending,
        keySelector,
      },
    ])
  }

  public thenByDescending<TKey>(keySelector: Selector<T, TKey>): IOrderedEnumerable<T> {
    return new OrderedEnumerable(this.source, [
      ...this.sortStages,
      {
        order: SortOrder.Descending,
        keySelector,
      },
    ])
  }

  public [Symbol.iterator]() {
    const sorted = sort(this.source, this.sortStages)
    return sorted[Symbol.iterator]()
  }
}