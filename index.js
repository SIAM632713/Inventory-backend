import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import brandRoute from "./src/route/brandRoute.js";
import categoryRoute from "./src/route/categoryRoute.js";
import productRoute from "./src/route/productRoute.js";
import uploadRoute from "./src/route/uploadRoute.js";

const port = process.env.PORT || 8000
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173" ,
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


export const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

async function main(){
    await mongoose.connect(process.env.UB_URL);

    app.get('/', (req, res) => {
        res.send('Welcome to the Inventory App!');
    })
}
main().then(()=>console.log("mongoDB connected")).catch(err => console.log(err));


app.use("/api/brand",brandRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use("/api/upload",uploadRoute)

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

