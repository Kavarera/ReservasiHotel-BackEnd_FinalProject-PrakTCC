const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Inisialisasi Google Cloud Storage
const storage = new Storage({
    keyFilename: ('storagekey.json'),
    projectId: 'e-02-415004'
  });

  
  // Tentukan nama bucket Anda
const bucketName = 'e-02-415004.appspot.com';
const bucket = storage.bucket(bucketName);

module.exports = bucket;