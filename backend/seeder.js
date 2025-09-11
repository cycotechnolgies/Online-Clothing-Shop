import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./model/products.js";

dotenv.config();
connectDB();

const products = [
  { name: "Pleated Mini Skirt - Coral", price: 20.0, oldPrice: 25.0, inStock: true, category: "SKIRT", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "A-Line Skirt - Navy Blue", price: 22.0, oldPrice: 27.0, inStock: true, category: "SKIRT", sizes: ["M","L","XL"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Chiffon Blouse - Peach", price: 18.0, oldPrice: 22.0, inStock: true, category: "BLOUSE", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Silk Blouse - Mint", price: 19.0, oldPrice: 24.0, inStock: true, category: "BLOUSE", sizes: ["S","M"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Floral Summer Frock - Yellow", price: 25.0, oldPrice: 30.0, inStock: true, category: "FROCK", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Casual Frock - Lavender", price: 23.0, oldPrice: 28.0, inStock: true, category: "FROCK", sizes: ["M","L","XL"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Denim Mini Skirt - Blue", price: 21.0, oldPrice: 26.0, inStock: true, category: "SKIRT", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Layered Skirt - Grey", price: 19.0, oldPrice: 23.0, inStock: true, category: "SKIRT", sizes: ["S","M","L","XL"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Ruffled Blouse - Lavender", price: 17.0, oldPrice: 21.0, inStock: true, category: "BLOUSE", sizes: ["S","M"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Lace Blouse - Ivory", price: 20.0, oldPrice: 24.0, inStock: true, category: "BLOUSE", sizes: ["M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Maxi Frock - Sky Blue", price: 28.0, oldPrice: 35.0, inStock: true, category: "FROCK", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Evening Frock - Burgundy", price: 30.0, oldPrice: 38.0, inStock: true, category: "FROCK", sizes: ["M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Pleated Skirt - Olive", price: 18.0, oldPrice: 22.0, inStock: true, category: "SKIRT", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Wrap Skirt - Rust", price: 20.0, oldPrice: 25.0, inStock: true, category: "SKIRT", sizes: ["M","L","XL"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Sleeveless Blouse - Coral", price: 16.0, oldPrice: 20.0, inStock: true, category: "BLOUSE", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Button-Up Blouse - Mint", price: 19.0, oldPrice: 23.0, inStock: true, category: "BLOUSE", sizes: ["M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "Casual Frock - Peach", price: 24.0, oldPrice: 29.0, inStock: true, category: "FROCK", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Summer Frock - Lime Green", price: 26.0, oldPrice: 32.0, inStock: true, category: "FROCK", sizes: ["M","L","XL"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false },
  { name: "High-Waist Skirt - Teal", price: 21.0, oldPrice: 26.0, inStock: true, category: "SKIRT", sizes: ["S","M","L"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: true },
  { name: "Floral Blouse - Yellow", price: 18.0, oldPrice: 22.0, inStock: true, category: "BLOUSE", sizes: ["S","M"], image: "https://d2x02matzb08hy.cloudfront.net/img/project_photo/image/10232743/72170/large_tas328_1.jpg", isNew: false }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
