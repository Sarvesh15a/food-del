import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://yaduvesh:sarvesh@food-del.3basooo.mongodb.net/").then(()=>{console.log("mongoDb connected")}).catch((error)=>{
        console.log(error)
    })
}