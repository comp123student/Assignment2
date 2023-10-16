import { Product } from "../models/product.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  console.log("pppppp create req.body = ", req.body);
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    console.log("0000000000000 ", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  console.log("pppppp list");
  try {
    let product = await Product.find().select("name");
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  console.log("pppppp read");
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  console.log("pppppp update");
  try {
    let product = req.profile;
    product = extend(product, req.body);
    product.updated = Date.now();
    await product.save();
    product.hashed_password = undefined;
    product.salt = undefined;
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const productByID = async (req, res, next, id) => {
  console.log("pppppp productByID");
  try {
    let product = await Product.findById(id);
    if (!product)
      return res.status("400").json({
        error: "Product not found",
      });
    req.profile = product;
    next();
  } catch (err) {
    return res.status("400").json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res) => {
  console.log("pppppp remove");
  try {
    let product = req.profile;
    let deletedProduct = await product.deleteOne();
    deletedProduct.hashed_password = undefined;
    deletedProduct.salt = undefined;
    res.json(deletedProduct);
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export { create, productByID, read, list, remove, update };
