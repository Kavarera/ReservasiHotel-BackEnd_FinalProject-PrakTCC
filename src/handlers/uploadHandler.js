const { nanoid } = require('nanoid');
const bucket = require('../config/storage');
const path = require('path');


const uploadFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      const blob = bucket.file(`images/${nanoid(16)}${path.extname(req.file.originalname)}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: req.file.mimetype,
        },
      });
  
      blobStream.on('error', (err) => {
        res.status(500).send({ message: err.message });
      });
  
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).send({ message: 'File uploaded successfully', url: publicUrl });
      });
  
      blobStream.end(req.file.buffer);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  module.exports = { uploadFile };