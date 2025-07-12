import express from "express";
import {
    creatCategory,
    deleteCategory,
    getAllcategories,
    ListByKeywordService,
    updateCategory
} from "../controller/categoryController.js";

const router = express.Router();

router.post("/creat-category",creatCategory)
router.get("/get-category",getAllcategories)
router.post("/update-category/:id",updateCategory)
router.delete("/delete-category/:id",deleteCategory)
router.get("/search-category",ListByKeywordService)

export default router;