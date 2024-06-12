import { expectIterable } from '../testUtils.ts'
import { select } from '../../src/enumerableUtils/select.ts'

describe('select', () => {
  test('Should return empty, if source is empty', () => {
    expectIterable(select([], e => e * 10)).toEqual([])
  })

  test('Should update elements', () => {
    expectIterable(select([2, 1, 3], e => e * 10)).toEqual([20, 10, 30])
  })
})