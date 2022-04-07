import { factory } from '../../utils/factory.js'
import { createAlgorithmDD } from '../../type/matrix/utils/algorithmDD.js'
import { createAlgorithmDs } from '../../type/matrix/utils/algorithmDs.js'

const name = 'to'
const dependencies = [
  'typed',
  'matrix'
]

export const createTo = /* #__PURE__ */ factory(name, dependencies, ({ typed, matrix }) => {
  const algorithmDD = createAlgorithmDD({ typed })
  const algorithmDs = createAlgorithmDs({ typed })

  /**
   * Change the unit of a value.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.to(x, unit)
   *
   * Examples:
   *
   *    math.to(math.unit('2 inch'), 'cm')                   // returns Unit 5.08 cm
   *    math.to(math.unit('2 inch'), math.unit(null, 'cm'))  // returns Unit 5.08 cm
   *    math.to(math.unit(16, 'bytes'), 'bits')              // returns Unit 128 bits
   *
   * See also:
   *
   *    unit
   *
   * @param {Unit | Array | Matrix} x     The unit to be converted.
   * @param {Unit | Array | Matrix} unit  New unit. Can be a string like "cm"
   *                                      or a unit without value.
   * @return {Unit | Array | Matrix} value with changed, fixed unit.
   */
  return typed(name, {
    'Unit, Unit | string': function (x, unit) {
      return x.to(unit)
    },

    'Matrix, Matrix': function (x, y) {
      // SparseMatrix does not support Units
      return algorithmDD(x, y, this)
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return this(matrix(x), matrix(y)).valueOf()
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return this(matrix(x), y)
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return this(x, matrix(y))
    },

    'Matrix, any': function (x, y) {
      // SparseMatrix does not support Units
      return algorithmDs(x, y, this, false)
    },

    'any, Matrix': function (x, y) {
      // SparseMatrix does not support Units
      return algorithmDs(y, x, this, true)
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithmDs(matrix(x), y, this, false).valueOf()
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithmDs(matrix(y), x, this, true).valueOf()
    }
  })
})
