import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (_req: any, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, path.join(__dirname, '../../public/uploads/'));
  },
  filename: function (_req: any, _file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + '-' + _file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post('/api/products', (req, res) => {
  // TODO: Add product to database
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
