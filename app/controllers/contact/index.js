import Contact from '../../models/contact.js';
import { Helper } from '../../utils/helpers/index.js'

/**
 * Controller for handling contact submissions
 * @class ContactController
 */
class ContactController {
  /**
   * Handles submission of contact form
   * @param {Request} req
   * @param {Response} res
   */
  static async submitContact(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        reason_for_enquiry,
        message
      } = req.body

      // Create and save the contact
      const contact = await Contact.create({
        first_name,
        last_name,
        email,
        phone_number,
        reason_for_enquiry,
        message
      })

      return Helper.successResponse(res, {
        message: 'Contact submitted successfully',
        data: contact
      })
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: 'Failed to submit contact',
        status: 500,
        errors: err.message
      })
    }
  }
}

export default ContactController
