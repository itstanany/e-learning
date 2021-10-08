import multer from 'multer';

/**
 * extract 'multipart/form-data' request into req.body and req.file
 */
const multerUpload = multer({
  storage: multer.memoryStorage(),
});

export {
  multerUpload,
};
