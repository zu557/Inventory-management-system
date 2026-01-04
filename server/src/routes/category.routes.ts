import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getProductCountForCategory
} from "../controllers/category.controller.js";

const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get('/:id/product-count', getProductCountForCategory); // ← Delete check

export default router;
