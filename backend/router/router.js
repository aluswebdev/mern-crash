import express from "express"
// import Products from "../model/product.model.js"
// import mongoose from "mongoose"
import { getProducts, postProduct, updateProduct, deleteProduct } from "../controller/controller.js"

const router = express.Router()

router.get("/", getProducts);

router.post("/", postProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router