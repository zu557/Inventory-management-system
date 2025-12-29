import { Router } from "express";
import {
  createPurchase,
  getPurchases
} from "../controllers/purchase.controller.js";

const router = Router();

router.post("/", createPurchase);
router.get("/", getPurchases);

export default router;
