import mongoose from "mongoose";

const productSchema =new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    category:{
        type:String,
        ensum:[
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"

        ],
        required:true
    },
    foodType:{
        type:String,
        enum:["veg","non-veg"],
        required:true
    }

},{timestamps:true})


const Product =mongoose.model("Product",productSchema)
export default Product