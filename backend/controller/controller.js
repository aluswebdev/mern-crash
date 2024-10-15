import Products from "../model/product.model.js";
import mongoose from "mongoose"

export const getProducts = async (req, res) => {
  try {
    const product = await Products.find({});
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const postProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  const newProduct = new Products(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const product = await Products.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Products.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};