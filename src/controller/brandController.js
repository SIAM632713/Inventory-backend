import brandModel from "../model/brandModel.js";

export const creatBrand=async (req,res)=>{
    const {name,image,status}=req.body;
    try {
        const newPost=await brandModel({
            name,image,status,
        })
        await newPost.save();
        return res.status(201).json({message:"Brand successfully created"});
    }catch (e){
        res.status(400).send({message:"Bad Request"});
    }
}


export const getAllBrands=async (req,res)=>{
    try {
        const data=await brandModel.find()
        if(!data){
            return res.status(404).send({message:"Bad Request"});
        }
        res.status(200).json({message:"Brand successfully found",data:data});
    }catch (e){
        res.status(400).send({message:"Bad Request"});
    }
}

export const updateBrand=async (req,res)=>{
    const {id}=req.params;
    const {name,image,status}=req.body;
    try {
        const data=await brandModel.findByIdAndUpdate(id,{
            name:name,
            image:image,
            status:status,
        })
        if(!data){
            return res.status(404).send({message:"Bad Request"});
        }
        res.status(200).json({message:"Brand successfully updated"});
    }catch (e){
        res.status(400).send({message:"Bad Request"});
    }
}

export const deleteBrand=async (req,res)=>{
    const {id}=req.params;
    try {
        const data=await brandModel.findByIdAndDelete(id)
        if(!data){
            return res.status(404).send({message:"Bad Request"});
        }
        res.status(200).json({message:"Brand successfully deleted"});
    }catch (e){

    }
}


export const ListByKeywordService=async (req,res)=>{
    try {
        const keyword=req.query.keyword;

        const searchRegex={$regex:keyword,$options:"i"};
        const searchQuery={$or:[{name:searchRegex}]}

        const data=await brandModel.find(searchQuery)
        res.status(200).json({message:"Brand found successfully",data:data})
    }catch(err){
        res.status(400).send({message:"Bad Request"});
    }
}