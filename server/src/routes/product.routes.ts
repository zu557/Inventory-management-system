import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { permit } from "../middleware/rbac.js";


import {
  createProduct,
  getProducts,
  // getProduct,
  updateProduct, 
  deleteProduct
} from "../controllers/product.controller.js";

const router = Router();

// router.use(authMiddleware);

router.get("/", getProducts);
// router.get("/:id", getProduct);
router.post("/", createProduct);
// router.post("/", permit("admin", "manager"), createProduct);
router.patch("/:id", permit("admin", "manager"), updateProduct);
router.delete("/:id", permit("admin"), deleteProduct);
// router.get("/", authenticate, getProducts);
// router.get("/:id", authenticate, getProduct);
// router.post("/", authenticate, permit("ADMIN", "MANAGER"), createProduct);
// router.patch("/:id", authenticate, permit("ADMIN", "MANAGER"), updateProduct);
// router.delete("/:id", authenticate, permit("ADMIN"), deleteProduct);

export default router;
