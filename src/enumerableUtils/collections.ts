import { isArray } from '../utils/isArray.ts'

export const toArray = <T>(source: Iterable<T>): T[] => (isArray(source) ? source : Array.from(source))