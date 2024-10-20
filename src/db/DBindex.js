import mongoose from "mongoose";

const connectDB = async function(){
    try {
        const connectionInstace = await mongoose.connect(
            process.env.MONGODB_URL
        )
        console.log(`\n MONGODB connection !! DB Host ==> : ${connectionInstace.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection Faild => " , error)
        process.exit(1)
    }
}

export default connectDB