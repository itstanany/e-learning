import nc from 'next-connect';
import { editCourseController } from '../../../../utils/server/controllers';
import {
  multerUpload,
  parseCourseSubmission,
  requireAdminEditorRole,
  requireAuth,
  uploadFile,
} from '../../../../utils/server/middlewares';

const handler = nc();

handler.use(requireAuth);
handler.use(requireAdminEditorRole);
// extract form data into "req.body" for all fields except "files"
//    and "req.file" for attached file
handler.use(multerUpload.single('thumbnail'));

// parse course data other than file upload
handler.use(parseCourseSubmission);

// upload file to the storage
// attach file location as "req.fileLocation" field
handler.use(uploadFile);

handler.use(editCourseController);

const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

export {
  config,
};
