import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "../shopstore/config/db.js";  
import authRoutes from "../shopstore/routes/authRoute.js";
import { products } from "./controllers/product/product.js";
import cart from "../shopstore/routes/cart"


dotenv.config();

connectDB();


const app = express();

app.use('/',cart)
app.use('/',products)
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
