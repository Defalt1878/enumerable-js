export type Selector<T, TResult> = (item: T) => TResult
export type Filter<T> = (item: T) => boolean

export enum SortOrder {
  Ascending,
  Descending,
}

export type SortStage<T> = {
  keySelector: Selector<T, unknown>
  order: SortOrder
}