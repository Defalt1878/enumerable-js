export function* select<T, TResult>(source: Iterable<T>, selector: (element: T) => TResult) {
  for (const e of source) {
    yield selector(e)
  }
}