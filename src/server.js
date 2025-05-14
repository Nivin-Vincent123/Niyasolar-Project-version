import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Enable CORS for all origins (development only)
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images statically from /uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Return the permanent URL to access the image
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// MongoDB connection
console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // force IPv4 to avoid IPv6 ::1 errors
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Product model (for MongoDB)
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  category: String,
  wattage: Number,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// User model (for MongoDB)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name: name || email.split('@')[0], // Use name if provided, otherwise use email username
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Get user profile endpoint
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Get all products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get a single product by ID endpoint
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Add a new product (admin only)
app.post('/api/products', authenticateToken, async (req, res) => {
  const { name, brand, description, category, wattage, price, image } = req.body;
  try {
    const newProduct = new Product({
      name,
      brand,
      description,
      category,
      wattage,
      price,
      image,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Update product (admin only)
app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, brand, description, category, wattage, price, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, brand, description, category, wattage, price, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product (admin only)
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
