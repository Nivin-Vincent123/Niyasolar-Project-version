import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Product from './Models/Product.js'; // Adjust path if needed
import { fileURLToPath } from 'url';

dotenv.config();

// ES module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, 'Data', 'Products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Product.deleteMany({}); // Optional: clear old products
  await Product.insertMany(products);
  console.log('Products imported!');
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
  mongoose.disconnect();
});