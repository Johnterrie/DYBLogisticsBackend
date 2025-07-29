import { Shipping, Rate } from "../../models/index.js";

import { Helper } from "../../utils/index.js";
import { constants } from "../../utils/index.js";

const {
  RATE_NAME_ERROR,
  RATE_NAME_SUCCESS,
  RATE_NAME_FAILURE,
  RATE_NAME_CREATION_FAILURE,
  RATE_NAME_UPDATE_ERROR,
} = constants;

/**
 * A collection of methods to handle rate-related operations
 * @class RateController
 */
class RateController {
  /**
   * Returns Express and Domestic shipping rates with their price and duration
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */

  static async getRates(req, res, next) {
    try {
      const rate = await Rate.find();

      return Helper.successResponse(res, {
        message: RATE_NAME_SUCCESS,
        data: rate,
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: RATE_NAME_FAILURE,
        status: 500,
        errors: err.message,
      });
    }
  }

  /**
   * Updates the price and/or duration for a shipping rate (Express or Domestic)
   * Accepts serviceType in the request body instead of URL params
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */

  static async updateRate(req, res, next) {
    try {
      const { name, price, duration } = req.body;

      if (!name) {
        return Helper.errorResponse(req, res, {
          message: RATE_NAME_ERROR,
          status: 400,
        });
      }

      // Find the rate entry and populate rate
      const rate = await Rate.findOne({ name });

      if (!rate) {
        return Helper.errorResponse(req, res, {
          message: `rate type '${name}' not found`,
          status: 404,
        });
      }

      // Update rate fields if provided
      if (price !== undefined) rate.price = price;
      if (duration !== undefined) rate.duration = duration;

      await rate.save();

      return Helper.successResponse(res, {
        message: `${name} rate updated successfully`,
        price: `₦${Number(rate.price).toLocaleString()}`,
        duration: rate.duration,
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: RATE_NAME_UPDATE_ERROR,
        status: 500,
        errors: err.message,
      });
    }
  }

  static async createRate(req, res) {
    try {
      const { name, price, duration } = req.body;

      const newRate = await Rate.create({ name, price, duration });

      return Helper.successResponse(res, {
        status: 200,
        message: `${name} service created successfully`,
        rate: newRate,
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: RATE_NAME_CREATION_FAILURE,
        status: 500,
        errors: err.message,
      });
    }
  }
}

export default RateController;
