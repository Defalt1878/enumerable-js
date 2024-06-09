export const isArray = <T>(iterable: Iterable<T>): iterable is T[] => Array.isArray(iterable)
