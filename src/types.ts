export type Selector<T, TResult> = (item: T) => TResult
export type Filter<T> = (item: T) => boolean