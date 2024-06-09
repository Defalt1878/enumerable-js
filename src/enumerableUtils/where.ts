export function* where<T>(source: Iterable<T>, filter: (element: T) => boolean) {
  for (const e of source) {
    if (filter(e)) {
      yield e
    }
  }
}

export const whereNotNull = <T>(source: Iterable<T>) =>
  where(source, e => e != null) as Iterable<Exclude<T, null | undefined>>