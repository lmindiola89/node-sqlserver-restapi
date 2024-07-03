import { Router } from "express";
import {
  getProducts,
  createProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/products", getProducts);

router.post("/products", createProducts);

router.get("/products/:id", getProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
