import { adminBucket } from '../../../firebase/admin/adminFirestorage';
import { bypassThumbnailUpload } from '../bypassThumbnailUpload';

/**
 * Save the file into google firebase storage
 * @param {object} req NextJs request object
 * @param {object} res NextJs response object
 * @param {object} next next function in api callback stack
 */
// eslint-disable-next-line consistent-return
const uploadFile = (req, res, next) => {
  try {
    const blob = adminBucket.file(req.file.originalname + (Math.random() * 10));
    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on('error', (err) => (next(err)));

    blobWriter.on('finish', () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${adminBucket.name}/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      req.body.fileLocation = publicUrl;
      next();
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    if (bypassThumbnailUpload({ req })) return next();
    return res.status(400).json({ error: `Error, could not upload file: ${error.message}` });
  }
};

export {
  uploadFile,
};
