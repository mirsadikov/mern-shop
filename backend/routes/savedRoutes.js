import express from "express";
import {
  addSavedItem,
  deleteSavedItem,
  getSavedProducts,
} from "../controllers/savedController.js";
const router = express.Router();

import { protect } from "../middeware/authMiddleware.js";

router
  .route("/")
  .get(protect, getSavedProducts)
  .delete(protect, deleteSavedItem)
  .post(protect, addSavedItem);

export default router;
