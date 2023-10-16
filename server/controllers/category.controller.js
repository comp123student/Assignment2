import Category from "../models/category.js";

// Function to list all categories
export const listAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

// Function to create a new category
export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    return res.status(200).json({
      message: 'Category created successfully',
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

export default Category;
