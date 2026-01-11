import { Router } from "express";
import { requireAuth } from "@clerk/express";

import * as productController from "../controllers/productController";

const router = Router();

// Get all products Get all products Get all products Get all products Get all products
router.get("/", productController.getAllProducts);

// Get current user's products Get current user's products Get current user's products
router.get("/my", requireAuth(), productController.getMyProducts);

// Get product by ID  Get product by ID  Get product by ID  Get product by ID  Get product by ID
router.get("/:id", productController.getProductById);

// Create new product Create new product Create new product Create new product Create new product
router.post("/", requireAuth(), productController.createProduct);

// Update product Update product Update product Update product Update product Update product
router.put("/:id", requireAuth(), productController.updateProduct);

// Delete product Delete product Delete product Delete product Delete product Delete product 
router.delete("/:id", requireAuth(), productController.deleteProduct)

export default router;
