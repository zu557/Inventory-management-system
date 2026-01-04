import { Router } from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  getPurchaseCountForSupplier,
} from "../controllers/supplier.controller.js";

const router = Router();

router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);
router.get('/:id/purchase-count', getPurchaseCountForSupplier); // ← Delete check

export default router;
