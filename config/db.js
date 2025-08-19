const mongoose=require("mongoose");

const MONGO_URI="mongodb+srv://rahmatshah:rahmatshah@cluster0.usljxbr.mongodb.net/ecommerce"

exports.mongooseConnection=async()=>{
    try {
        await mongoose.connect(MONGO_URI).then((data)=>{
            console.log(`Succesfully Connected to the MongoDB`)
        })
    } catch (error) {
            console.error("Unable to connect to the database",error)
    }
}