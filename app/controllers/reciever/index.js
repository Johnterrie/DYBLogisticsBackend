import Calculator from '../../models/calculator.model.js' // Adjust path if needed
import { Helper } from '../../utils/index.js'

/**
 * Controller for saving receiver details
 * @class ReceiverController
 */
class ReceiverController {
  /**
   * Save receiver details to the database
   * @param {Request} req
   * @param {Response} res
   */
  static async saveReceiverDetails(req, res) {
    try {
      const {
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
      } = req.body

      const requiredFields = [
        'user', 'first_name', 'lastt_name', 'address_line_1', 'address_line_2',
        'country', 'state', 'city', 'postal_code', 'phone', 'email', 'alternate_phone'
      ]

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return Helper.errorResponse(req, res, {
            message: `${field.replaceAll('_', ' ')} is required`,
            status: 400
          })
        }
      }

      const receiverEntry = await Calculator.create({
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
        message: 'Receiver details saved successfully',
        data: receiverEntry
      })
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: 'Failed to save receiver details',
        status: 500,
        errors: err.message
      })
    }
  }
}

export default ReceiverController
