import { Calculator } from '../../models/index.js' // Adjust path to match your project
import { Helper } from '../../utils/index.js'

/**
 * Controller for saving a rate calculator user entry
 * @class CalculatorController
 */
class SenderController {
  /**
   * Saves a new rate calculation entry with user info
   * @param {Request} req
   * @param {Response} res
   */
  static async saveUserRateDetails(req, res) {
    try {
      const {
        user, // or from req.user.id
        first_name,
        lastt_name,
        address_line_1,
        address_line_2,
        country,
        state,
        city,
        postal_code,
        phone,
        email,
        alternate_phone
      } = req.body

      // Validate essential fields (basic example)
      const requiredFields = [
        'user', 'first_name', 'lastt_name', 'address_line_1', 'address_line_2',
        'country', 'state', 'city', 'postal_code', 'phone', 'email', 'alternate_phone'
      ]

      for (let field of requiredFields) {
        if (!req.body[field]) {
          return Helper.errorResponse(req, res, {
            message: `${field.replaceAll('_', ' ')} is required`,
            status: 400
          })
        }
      }

      const rateEntry = await Calculator.create({
        user,
        first_name,
        lastt_name,
        address_line_1,
        address_line_2,
        country,
        state,
        city,
        postal_code,
        phone,
        email,
        alternate_phone
      })

      return Helper.successResponse(res, {
        message: 'User rate calculation details saved successfully',
        data: rateEntry
      })
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: 'Failed to save user rate data',
        status: 500,
        errors: err.message
      })
    }
  }
}

export default SenderController
