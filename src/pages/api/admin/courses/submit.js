/**
 * Course submission API route handler
 * it accepts course addition or editing
 */
import nextConnect from 'next-connect';
import { multerUpload, parseCourseSubmission, uploadFile } from '../../../../utils/server/middlewares';
import { submitCourse } from '../../../../utils/server/controllers';

const handler = nextConnect();

// extract form data into "req.body" for all fields except "files"
//    and "req.file" for attached file
handler.use(multerUpload.single('thumbnail'));

// parse course data other than file upload
handler.use(parseCourseSubmission);

// upload file to the storage
// attach file location as "req.fileLocation" field
handler.use(uploadFile);

// controller
// save course details in data base
handler.post(submitCourse);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
