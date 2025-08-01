import express from "express";
import { ShippingController } from "../../../controllers/index.js";
import { Helper } from "../../../utils/helpers/index.js";

import upload from "../../../middlewares/multer.js"; // Multer for file upload

const router = express.Router();

router.post(
  "/createshipment",
  Helper.authMiddleware,
  upload.single("proofOfWeight"),
  ShippingController.createShipment
);

router.get(
  "/my-shipments",
  Helper.authMiddleware,
  ShippingController.getUserShipments
);

export default router;
