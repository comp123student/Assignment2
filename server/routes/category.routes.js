

import express from "express";
import * as categoryCtrl from "../controllers/category.controller.js";

const router = express.Router();

router.route("/api/categories")
  .get(categoryCtrl.listAllCategories)
  .post(categoryCtrl.createCategory);


export default router;
