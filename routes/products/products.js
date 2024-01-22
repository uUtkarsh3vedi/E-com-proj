const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Products = require('../Model/ProductSchema');
const cloudinary = require('cloudinary').v2;
const authRoutes = require("../shopstore/routes/authRoute.js");

dotenv.config();

const connectDB = require("../shopstore/config/db.js");
connectDB();

const app = express();

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Products.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(201).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, image, description, ratings, productId } = req.body;

        const cloudinaryResult = await cloudinary.uploader.upload(image, {
            folder: 'Uploads',
        });

        const newProduct = new Products({
            name,
            price,
            image: cloudinaryResult.secure_url,
            description,
            ratings,
            productId,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', savedProduct });
    } catch (error) {
        console.error('Error in adding product', error);
        res.status(500).json({ message: error.message });
    }
};

const products = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(201).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

app.use('/', products);
app.use('/', cart);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
