export function lastOrDefault<T>(source: Iterable<T>) {
  if (Array.isArray(source)) {
    return (source[source.length - 1] as T) ?? undefined
  }

  const iterator = source[Symbol.iterator]()
  let result = iterator.next()
  let value: T | undefined = undefined

  while (!result.done) {
    value = result.value
    result = iterator.next()
  }

  return value
}