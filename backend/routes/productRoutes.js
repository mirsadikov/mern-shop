import express from "express";
const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middeware/authMiddleware.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default router;
