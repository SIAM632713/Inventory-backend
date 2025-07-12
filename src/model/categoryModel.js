import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    status:{type:String,
        enum:['Active','Inactive'],
    },
},{timestamps:true});
export const categoryModel = mongoose.model("Category",categorySchema);
export default categoryModel;