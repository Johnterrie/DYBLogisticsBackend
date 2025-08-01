import express from "express";
import { DashboardController } from "../../../controllers/index.js";
import { Helper } from "../../../utils/helpers/index.js";


const router = express.Router();

router.get("/dashboard", Helper.authMiddleware, DashboardController.getDashboard);




export default router;
