import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    status:{type:String,
    enum:['Active','Inactive'],
    },
},{timestamps:true});
export const brandModel = mongoose.model("Brand",brandSchema);
export default brandModel;