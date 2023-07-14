
import mongoose from "mongoose";

export const database=()=>{ mongoose.connect('mongodb://localhost:27017/rest-api',).then( ()=>{
console.log("Successfully connected");
}).catch((err)=>{
console.log(err);
})
}


const Product = new mongoose.Schema({
    name:String,
    price:Number,
    useful:Boolean
});

export const product = new mongoose.model('product',Product);
