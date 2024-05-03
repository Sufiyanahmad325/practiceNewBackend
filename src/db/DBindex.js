import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
      const connectionInstace = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      console.log(`\n MongoDB connected !! DB HOST:${connectionInstace.connection.host}`);
    } catch (error) {
        console.log(" MONGO_DB connection failed "  , eroor);
        process.exit(1)
    }
}

export default connectDB