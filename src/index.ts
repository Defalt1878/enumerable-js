// First import OrderedEnumerable to initialize Enumerable module and resolve circular class dependency
import './orderedEnumerable.ts'

export { Enumerable, Enumerable as default } from './enumerable.ts'
export type { IEnumerable, IOrderedEnumerable } from './interfaces.ts'
