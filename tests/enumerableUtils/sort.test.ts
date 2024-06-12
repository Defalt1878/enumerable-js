import { sort } from '../../src/enumerableUtils/sort.ts'
import { SortOrder, SortStage } from '../../src/types.ts'
import { assertNoIteratorCall, enrichWithIteratorMock, expectIterable } from '../testUtils.ts'

describe('sort', () => {
  test('Should return same array without calling iterator, if stages is empty', () => {
    const source = enrichWithIteratorMock([2, 1, 3])
    expect(sort(source, [])).toEqual(source)
    assertNoIteratorCall(source)
  })
  test('Should return same array without calling iterator, if array is empty', () => {
    const source = enrichWithIteratorMock([])
    const stages: SortStage<number>[] = [{ order: SortOrder.Ascending, keySelector: e => e }]
    expect(sort(source, stages)).toEqual(source)
    assertNoIteratorCall(source)
  })
  test('Should sort array in ascending order, if one ascending stage passed', () => {
    const source = [3, 1, 2]
    const stages: SortStage<number>[] = [{ order: SortOrder.Ascending, keySelector: e => e }]
    expectIterable(sort(source, stages)).toEqual([1, 2, 3])
  })
  test('Should sort array in ascending order, if has same elements in array', () => {
    const source = [3, 1, 2, 1]
    const stages: SortStage<number>[] = [{ order: SortOrder.Ascending, keySelector: e => e }]
    expectIterable(sort(source, stages)).toEqual([1, 1, 2, 3])
  })
  test('Should sort array in descending order, if one descending stage passed', () => {
    const source = [3, 1, 2]
    const stages: SortStage<number>[] = [{ order: SortOrder.Descending, keySelector: e => e }]
    expectIterable(sort(source, stages)).toEqual([3, 2, 1])
  })
  test('Should sort array in descending order, if has same elements in array', () => {
    const source = [3, 1, 2, 1]
    const stages: SortStage<number>[] = [{ order: SortOrder.Descending, keySelector: e => e }]
    expectIterable(sort(source, stages)).toEqual([3, 2, 1, 1])
  })
  test('Should correct sort, if multiple stages in ascending order passed', () => {
    const source = [
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 1, b: 3 },
    ]
    const stages: SortStage<{ a: number; b: number }>[] = [
      { order: SortOrder.Ascending, keySelector: e => e.a },
      { order: SortOrder.Ascending, keySelector: e => e.b },
    ]
    expectIterable(sort(source, stages)).toEqual([
      { a: 1, b: 3 },
      { a: 2, b: 1 },
      { a: 2, b: 2 },
    ])
  })
  test('Should correct sort, if multiple stages in descending order passed', () => {
    const source = [
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 1, b: 3 },
    ]
    const stages: SortStage<{ a: number; b: number }>[] = [
      { order: SortOrder.Descending, keySelector: e => e.a },
      { order: SortOrder.Descending, keySelector: e => e.b },
    ]
    expectIterable(sort(source, stages)).toEqual([
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 1, b: 3 },
    ])
  })
  test('Should correct sort, if multiple stages with different order passed', () => {
    const source = [
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 1, b: 3 },
    ]
    const stages: SortStage<{ a: number; b: number }>[] = [
      { order: SortOrder.Ascending, keySelector: e => e.a },
      { order: SortOrder.Descending, keySelector: e => e.b },
    ]
    expectIterable(sort(source, stages)).toEqual([
      { a: 1, b: 3 },
      { a: 2, b: 2 },
      { a: 2, b: 1 },
    ])
  })
})