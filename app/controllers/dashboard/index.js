import { Shipping } from "../../models/index.js";
import { Helper, constants } from "../../utils/index.js";

const {
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
} = constants;

/**
 * A collection of methods to handle Dashboard-related operations
 * @class DashboardController
 */
class DashboardController {
  /**
   * Returns user dashboard details
   * - Name
   * - User Type
   * - Total Shipments
   * - Shipments in Transit
   * - Pending Shipments
   * - Cancelled Shipments
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  static async getDashboard(req, res, next) {
    try {
      const user = req.user; // From auth middleware

      // Fetch shipments for user
      const shipments = await Shipping.find({ user: user._id });

        console.log("working");

      // Count shipment statuses
      const totalShipping = shipments.length;
      const shippingInTransit = shipments.filter(s => s.status === "in_transit").length;
      const shippingPending = shipments.filter(s => s.status === "pending").length;
      const shippingCancelled = shipments.filter(s => s.status === "cancelled").length;

      // Respond with dashboard data
      return Helper.successResponse(res, {
        message: DASHBOARD_SUCCESS,
        name: user.name,
        userType: user.userType,
        totalShipping,
        shippingInTransit,
        shippingPending,
        shippingCancelled
        
      });
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: DASHBOARD_FAILURE,
        status: 500,
        errors: err.message
      });
    }
  }
}

export default DashboardController;
