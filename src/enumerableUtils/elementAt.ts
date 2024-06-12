import { isArray } from '../utils/isArray.ts'

export const elementAtOrDefault = <T>(source: Iterable<T>, index: number) => {
  if (isArray(source)) {
    if (index > 0) {
      return source[index]
    } else {
      return source[source.length + index]
    }
  }

  if (index >= 0) {
    let i = 0
    for (const e of source) {
      if (i++ === index) {
        return e
      }
    }
    return undefined
  }

  const iterator = source[Symbol.iterator]()
  let result = iterator.next()
  if (result.done) {
    return undefined
  }

  const indexFromEnd = -index
  const queue: T[] = []

  do {
    if (queue.length === indexFromEnd) {
      queue.shift()
    }
    queue.push(result.value)
    result = iterator.next()
  } while (!result.done)

  return queue.length === indexFromEnd ? queue.shift() : undefined
}