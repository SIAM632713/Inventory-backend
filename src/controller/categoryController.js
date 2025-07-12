import categoryModel from "../model/categoryModel.js";
import brandModel from "../model/brandModel.js";


export const creatCategory=async (req,res)=>{
    const {name,image,status} = req.body;
    try {
        const newPost=await categoryModel({
            name,
            image,
            status
        })
        await newPost.save();
        return res.status(201).json({message:"Successfully created"});
    }catch(error){
        res.status(400).json({message:"Bad Request"});
    }
}

export const getAllcategories=async(req,res)=>{
    try {
        const data=await categoryModel.find()
        if(!data){
            return res.status(404).json({message:"Not Found"});
        }
        res.status(200).json({message:"Successfully founded",data:data});
    }catch(error){
        res.status(400).json({message:"Bad Request"});
    }
}

export const updateCategory=async (req,res)=>{
    const {id}=req.params;
    const {name,image,status} = req.body;
    try {
        const data=await categoryModel.findByIdAndUpdate(id,{
            name:name,
            image:image,
            status:status,
        })
        if(!data){
            return res.status(404).json({message:"Not Found"});
        }
        res.status(200).json({message:"Successfully updated"});
    }catch(error){
        res.status(400).json({message:"Bad Request"});
    }
}


export const deleteCategory=async (req,res)=>{
    const {id}=req.params;
    try {
        const data=await categoryModel.findByIdAndDelete(id)
        if(!data){
            return res.status(404).json({message:"Not Found"});
        }
        res.status(200).json({message:"Successfully deleted"});
    }catch(error){
        res.status(400).json({message:"Bad Request"});
    }
}


export const ListByKeywordService=async (req,res)=>{
    try {
        const keyword=req.query.keyword;

        const searchRegex={$regex:keyword,$options:"i"};
        const searchQuery={$or:[{name:searchRegex}]}

        const data=await categoryModel.find(searchQuery)
        res.status(200).json({message:"Category found successfully",data:data})
    }catch(err){
        res.status(400).send({message:"Bad Request"});
    }
}