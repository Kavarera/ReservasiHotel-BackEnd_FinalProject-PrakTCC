const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan multer di memori
const storage = multer.memoryStorage();

// Filter jenis file jika diperlukan (misal hanya gambar)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
  });
module.exports = upload;