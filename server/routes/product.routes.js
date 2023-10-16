import express from "express";
import * as productCtrl from "../controllers/product.controller.js";

const router = express.Router();

router.route("/api/product")
  .get(productCtrl.listAllProducts)
  .post(productCtrl.createProduct);

router.route("/api/product/:productId")
  .get(productCtrl.getProduct)
  .put(productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct);
  
  router.route("/api/products")
  .delete(productCtrl.removeAllProducts);

router.param("productId", productCtrl.productByID);
router.get('/api/products', productCtrl.searchProductsByName);

export default router;
