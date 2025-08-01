import { Shipping } from "../../models/index.js";
import { Helper } from "../../utils/index.js";
import { constants } from "../../utils/index.js";
import cloudinary from "../../../config/cloundinary.js";

const {
  SHIPPING_CREATION_SUCCESS,
  SHIPPING_CREATION_FAILURE,
} = constants;

/**
 * Controller to handle Shipping operations
 * @class ShippingController
 */
class ShippingController {
  /**
   * Create a new shipment with sender, receiver, and proof of weight.
   * @param {Request} req
   * @param {Response} res
   */
  static async createShipment(req, res) {
    try {
      const {
        senderFirstName,
        senderLastName,
        senderAddressLine1,
        senderAddressLine2,
        senderCountry,
        senderStateProvince,
        senderCity,
        senderPhoneNumber,
        senderAlternatePhone,
        receiverFirstName,
        receiverLastName,
        receiverAddressLine1,
        receiverAddressLine2,
        receiverCountry,
        receiverStateProvince,
        receiverCity,
        receiverPhoneNumber,
        receiverAlternatePhone,
        destination,
        origin,
        serviceType,
        weight,
        price,
        estimatedDelivery,
        itemsDescription,
      } = req.body;

      // =====================
      // Upload Proof of Weight to Cloudinary
      // =====================
      let proofOfWeightData = {};

      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "shipping-proof",
        });
        proofOfWeightData = {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        };
      }

      // =====================
      // Save Shipment
      // =====================
      const shipment = await Shipping.create({
        user: req.user.id, // from auth middleware
        senderFirstName,
        senderLastName,
        senderAddressLine1,
        senderAddressLine2,
        senderCountry,
        senderStateProvince,
        senderCity,
        senderPhoneNumber,
        senderAlternatePhone,
        receiverFirstName,
        receiverLastName,
        receiverAddressLine1,
        receiverAddressLine2,
        receiverCountry,
        receiverStateProvince,
        receiverCity,
        receiverPhoneNumber,
        receiverAlternatePhone,
        destination,
        origin,
        serviceType,
        weight,
        price,
        estimatedDelivery,
        itemsDescription,
        proofOfWeight: proofOfWeightData,
      });

      return Helper.successResponse(res, {
        message: SHIPPING_CREATION_SUCCESS || "Shipment created successfully",
        data: shipment,
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: SHIPPING_CREATION_FAILURE || "Failed to create shipment",
        status: 500,
        errors: err.message,
      });
    }
  }

  /**
   * Get all shipments of a user
   * @param {Request} req
   * @param {Response} res
   */
  static async getUserShipments(req, res) {
    try {
      const shipments = await Shipping.find({ user: req.user.id }).sort({
        createdAt: -1,
      });

      return Helper.successResponse(res, {
        message: "User shipments retrieved successfully",
        data: shipments,
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: "Failed to retrieve shipments",
        status: 500,
        errors: err.message,
      });
    }
  }
}

export default ShippingController;
