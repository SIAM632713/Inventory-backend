import productModel from "../model/productModel.js";
import mongoose from "mongoose";

const ObjectID=mongoose.Types.ObjectId

export const creatProduct=async (req,res)=>{
    const {name,description,quantity,image,status,brandID,categoryID}=req.body;
    try {
        const newPost=await productModel({
            name, description,quantity,image,status,brandID,categoryID
        })
        await newPost.save();
        res.status(201).json({message:"Product created"})
    }catch(err){
        res.status(400).send({error:"Bad Request"});
    }
}


export const getProduct=async (req,res)=>{
    try {
        const data=await productModel.find()
        if(!data){
            return res.status(404).send({error:"Product not found"})
        }
        res.status(200).json({message:"Product found",data:data})
    }catch(err){
        res.status(400).send({error:"Bad Request"});
    }
}

export const updateProduct=async (req,res)=>{
    const {id}=req.params;
    const {name,description,quantity,image,status}=req.body;
    try {
        const data=await productModel.findByIdAndUpdate(id,{
            name,
            description,
            quantity,
            image,
            status
        })
        if(!data){
            return res.status(404).send({error:"Product not found"})
        }
        res.status(200).json({message:"Product updated"})
    }catch(err){
        res.status(400).send({error:"Bad Request"});
    }
}


export const deleteProduct=async (req,res)=>{
    const {id}=req.params;
    try {
        const data=await productModel.findByIdAndDelete(id)
        if(!data){
            return res.status(404).send({error:"Product not found"})
        }
        res.status(200).json({message:"Product deleted"})
    }catch(err){
        res.status(400).send({error:"Bad Request"});
    }
}


export const ListbyBrand = async (req, res) => {
    try {
        const brandID = new ObjectID(req.params.brandID);

        const MatchStage = { $match: { brandID: brandID } };

        const joinwithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };

        const joinwithCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };

        const unWindBrand = { $unwind: "$brand" };
        const unWindCategory = { $unwind: "$category" };

        const ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                brandID: 0,
                categoryID: 0,
            },
        };

        const data = await productModel.aggregate([
            MatchStage,
            joinwithBrandStage,
            joinwithCategoryStage,
            unWindBrand,
            unWindCategory,
            ProjectionStage,
        ]);

        res.status(200).json({ message: "Product found successfully", data });
    } catch (err) {
        res.status(400).send({message:"Bad Request" });
    }
};



export const ListbyCategory = async (req, res) => {
    try {
        const categoryID = new ObjectID(req.params.categoryID);

        const MatchStage = { $match: { categoryID: categoryID } };



        const joinwithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };

        const joinwithCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };

        const unWindBrand = { $unwind: "$brand" };
        const unWindCategory = { $unwind: "$category" };

        const ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                brandID: 0,
                categoryID: 0,
            },
        };

        const data = await productModel.aggregate([
            MatchStage,
            joinwithBrandStage,
            joinwithCategoryStage,
            unWindBrand,
            unWindCategory,
            ProjectionStage,
        ]);

        res.status(200).json({ message: "Product found successfully", data });
    }catch(err){
        res.status(400).send({message:"Bad Request"});
    }
}


export const ListByKeywordService=async (req,res)=>{
    try {
        const keyword=req.query.keyword;

        const searchRegex={$regex:keyword,$options:"i"};
        const searchQuery={$or:[{name:searchRegex}]}

        const data=await productModel.find(searchQuery)
        res.status(200).json({message:"Product found successfully",data:data})
    }catch(err){
        res.status(400).send({message:"Bad Request"});
    }
}