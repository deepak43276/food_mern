import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const foodRouter = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/remove', removeFood); // Use DELETE instead of POST for deleting

export default foodRouter;
