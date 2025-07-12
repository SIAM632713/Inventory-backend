import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    quantity:{type:Number},
    image:{type:String},
    status:{type:String,
        enum:['Active','Inactive'],
    },
    brandID:{type:mongoose.Schema.Types.ObjectId, ref:"Brand"},
    categoryID:{type:mongoose.Schema.Types.ObjectId, ref:"Category"},
},{timestamps:true});
export const productModel = mongoose.model("Product",productSchema);
export default productModel;