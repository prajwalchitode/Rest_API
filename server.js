

import express from "express";
const app = express();
import bodyParser from "body-parser";
// import { json } from "body-parser";

import { database,product } from "./db.js";

database();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());



// Create Product 
app.post("/api/v1/product/new",async (req,res)=>{

    const produ = await product.create(req.body);

    res.status(200).json({
        success:true,
        produ
    })

})

// Read product or find products

app.get("/api/v1/products",async(req,res)=>{

    const products = await product.find();

    res.status(200).json({
        success:true,
        products
    })

})


// Update Product 

app.put("/api/v1/update/:id",async(req,res) =>{

let updatedPro =  await product.findById(req.params.id);

updatedPro  = await product.findByIdAndUpdate(req.params.id,req.body,
    {
        new:true,
        useFindAndModify:false,
        runValidators:true
    })


    res.status(201).json(
        {
           success:true,
           updatedPro 
        }
    )


})

// Delete product

app.delete("/api/v1/product/:id",async(req,res) =>{

    // const prod = await product.findById(req.params.id);

    const {id} =  req.params;

    const prod = await product.findById(id); 

    
    if(!prod)
    {
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }

    await prod.deleteOne();

    res.json({
        success:true,
        message:"Deleted user",
    })

//    await product.findByIdAndDelete(prod);

//     res.status(200).json({
//         success:true,
//         message:"Product Deleted Successfully"
        
//     })


})

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})