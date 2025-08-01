import { Rate } from "../../models/index.js";
import { Helper, constants } from "../../utils/index.js";

const {
  RATE_NAME_SUCCESS,
  RATE_NAME_FAILURE,
  RATE_NAME_CREATION_FAILURE,
  RATE_NAME_UPDATE_ERROR,
} = constants;

/**
 * A collection of methods to handle domestic & express rates
 * @class RateController
 */
class RateController {
  /**
   * Returns Domestic and Express shipping rates with their price and duration
   * @param {Request} req
   * @param {Response} res
   */
  static async getRates(req, res) {
    try {
      const rate = await Rate.findOne(); // Assuming one document holds both rates
      if (!rate) {
        return Helper.errorResponse(req, res, {
          message: "No rates found. Please create rates first.",
          status: 404,
        });
      }

      const formattedRates = {
        domestic: {
          price: `₦${Number(rate.domesticPrice).toLocaleString()}`,
          duration: rate.domesticDuration,
        },
        express: {
          price: `₦${Number(rate.expressPrice).toLocaleString()}`,
          duration: rate.expressDuration,
        },
      };

      return Helper.successResponse(res, {
        message: RATE_NAME_SUCCESS,
        data: formattedRates,
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
   * Updates the price and/or duration for Domestic or Express
   * Accepts any combination of fields in req.body
   * @param {Request} req
   * @param {Response} res
   */
  static async updateRate(req, res) {
    try {
      const {
        domesticPrice,
        domesticDuration,
        expressPrice,
        expressDuration,
      } = req.body;

      const rate = await Rate.findOne();
      if (!rate) {
        return Helper.errorResponse(req, res, {
          message: "Rate record not found. Please create it first.",
          status: 404,
        });
      }

      if (domesticPrice !== undefined) rate.domesticPrice = domesticPrice;
      if (domesticDuration !== undefined) rate.domesticDuration = domesticDuration;
      if (expressPrice !== undefined) rate.expressPrice = expressPrice;
      if (expressDuration !== undefined) rate.expressDuration = expressDuration;

      await rate.save();

      return Helper.successResponse(res, {
        message: "Rates updated successfully",
        data: {
          domestic: {
            price: `₦${Number(rate.domesticPrice).toLocaleString()}`,
            duration: rate.domesticDuration,
          },
          express: {
            price: `₦${Number(rate.expressPrice).toLocaleString()}`,
            duration: rate.expressDuration,
          },
        },
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: RATE_NAME_UPDATE_ERROR,
        status: 500,
        errors: err.message,
      });
    }
  }

  /**
   * Creates initial rate record
   * @param {Request} req
   * @param {Response} res
   */
  static async createRate(req, res) {
    try {
      const {
        domesticDuration,
        domesticPrice,
        expressDuration,
        expressPrice,
      } = req.body;

      const newRate = await Rate.create({
        domesticDuration,
        domesticPrice,
        expressDuration,
        expressPrice,
      });

      return Helper.successResponse(res, {
        status: 200,
        message: "Rates created successfully",
        data: {
          domestic: {
            price: `₦${Number(newRate.domesticPrice).toLocaleString()}`,
            duration: newRate.domesticDuration,
          },
          express: {
            price: `₦${Number(newRate.expressPrice).toLocaleString()}`,
            duration: newRate.expressDuration,
          },
        },
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
