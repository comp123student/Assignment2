import Product from "../models/product.js";

// Function to list all products
export const listAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    // Handle errors
  }
};

// Function to create a new product
export const createProduct = async (req, res) => {
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
      error: err.message,
    });
  }
}

// Function to get a specific product by ID
export const getProduct = async (req, res) => {
  try {
    const product = req.product;
    product.hashed_password = undefined;
    product.salt = undefined;
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      error: "Failed to retrieve the product",
    });
  }
}

// Function to update a specific product by ID
export const updateProduct = async (req, res) => {
  try {
    const product = req.product;
    product.name = req.body.name;
    await product.save();
    product.hashed_password = undefined;
    product.salt = undefined;
    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to update the product",
    });
  }
}

// Function to delete a specific product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = req.product;

    // Use the deleteOne method to remove the product by its ID
    await Product.deleteOne({ _id: product._id });

    return res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(400).json({
      error: "Failed to delete the product",
    });
  }
}



// Middleware to handle the product ID parameter
export const productByID = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

// Function to search for products by name
export const searchProductsByName = async (req, res) => {
  const keyword = req.query.name;

  try {
    
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

// Function to remove all products
export const removeAllProducts = async (req, res) => {
  try {
    // Find and delete all products in the database
    await Product.deleteMany({});

    return res.status(200).json({
      message: "All products have been removed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
