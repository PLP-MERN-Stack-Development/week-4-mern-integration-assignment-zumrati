import cloudinary from '../utils/cloudinary.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

// Add to createPost
export const uploadImage = asyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  res.json({ url: result.secure_url });
});

// Update postRoutes
router.post('/upload', protect, upload.single('image'), uploadImage);

