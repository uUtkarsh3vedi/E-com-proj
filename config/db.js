import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
// import { url } from "../Backend/config";

 const URL = "mongodb+srv://aryantrivedi1232015:xWmJFBCqoi8ycUQV@cluster0.krnnwbx.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async (app) => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    
    const store = MongoStore.create({
      mongoUrl: URL,
      collectionName: "session",
    });

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Failure in the database Connection:",error );
  }
};

export default connectDB;
