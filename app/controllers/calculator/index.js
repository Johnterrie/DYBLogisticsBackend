import { Calculator } from '../../models/index.js'
import { Helper } from '../../utils/index.js'

/**
 * Controller for saving rate calculator entries
 * @class CalculatorController
 */
class CalculatorController {
  /**
   * Saves a new calculator entry into the database
   * @param {Request} req
   * @param {Response} res
   */
  static async saveRateCalculation(req, res) {
    try {
      const {
        to_country,
        to_state,
        to_city,
        from_country,
        from_state,
        from_city,
        currency,
        weight,
        duration
      } = req.body

      // Validate required fields (optional, if no Joi validation is used)
      if (
        !to_country || !to_state || !to_city ||
        !from_country || !from_state || !from_city ||
        !currency || !weight
      ) {
        return Helper.errorResponse(req, res, {
          message: 'All fields are required',
          status: 400
        })
      }

      const newCalculation = await Calculator.create({
        to_country,
        to_state,
        to_city,
        from_country,
        from_state,
        from_city,
        currency,
        weight,
        duration
      })

      return Helper.successResponse(res, {
        message: 'Rate calculation saved successfully',
        data: newCalculation
      })
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: 'Failed to save rate calculation',
        status: 500,
        errors: err.message
      })
    }
  }
}

export default CalculatorController
