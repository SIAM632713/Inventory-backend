import express from "express";
import {
    creatProduct,
    deleteProduct,
    getProduct,
    ListbyBrand,
    ListbyCategory, ListByKeywordService,
    updateProduct
} from "../controller/productController.js";

const router = express.Router();

router.post("/creat-product",creatProduct)
router.get("/get-product",getProduct)
router.post("/update-product/:id",updateProduct)
router.delete("/delete-product/:id",deleteProduct)
router.get("/get-ProductListByBrand/:brandID",ListbyBrand)
router.get("/get-ProductListBycategory/:categoryID",ListbyCategory)
router.get("/search-product",ListByKeywordService)

export default router;