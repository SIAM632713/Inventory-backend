import express from 'express';
import {
    creatBrand,
    deleteBrand,
    getAllBrands,
    ListByKeywordService,
    updateBrand
} from "../controller/brandController.js";

const router = express.Router();

router.post("/creat-brand",creatBrand)
router.get("/get-brand",getAllBrands)
router.post("/update-brand/:id",updateBrand)
router.delete("/delete-brand/:id",deleteBrand)
router.get("/search-brand",ListByKeywordService)


export default router;