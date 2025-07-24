import { AddItems } from '../../models/index.js'
import { Helper } from '../../utils/index.js'

/**
 * Controller for uploading items with cloud proof
 * @class AddItemsController
 */
class AddItemsController {
  static async uploadItemWithProof(req, res) {
    try {
      const { user, items } = req.body

      if (!req.file || !req.file.path) {
        return Helper.errorResponse(req, res, {
          message: 'Proof of weight file is required',
          status: 400
        })
      }

      const newItem = await AddItems.create({
        user,
        items,
        proof_of_weight: req.file.path, // Cloudinary URL
        filename: req.file.originalname || req.file.filename
      })

      return Helper.successResponse(res, {
        message: 'Item and proof of weight uploaded successfully',
        data: newItem
      })
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: 'Failed to upload item',
        status: 500,
        errors: err.message
      })
    }
  }
}

export default AddItemsController
