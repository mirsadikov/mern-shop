import express from "express";
import { getSavedProducts } from "../controllers/savedController.js";
const router = express.Router();

import { protect } from "../middeware/authMiddleware.js";

router.route("/").get(protect, getSavedProducts);

export default router;
