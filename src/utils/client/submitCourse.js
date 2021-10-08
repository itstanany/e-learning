import { apiPost } from './apiPost';

const SUBMIT_STATE = {
  ADDED: 'ADDED',
  FAILED: 'FAILED',
  ERROR: 'ERROR',
};

const submitCourse = async ({ lectures, courseInfo, thumbnail = null }) => {
  let state;
  let error;
  try {
    const formData = new FormData();
    formData.set('courseInfo', JSON.stringify(courseInfo));
    formData.append('lectures', JSON.stringify(lectures));
    formData.append('thumbnail', thumbnail);
    const result = await apiPost({ url: 'admin/courses/submit', body: formData });
    if (result?.added === true) {
      state = SUBMIT_STATE.ADDED;
    } else if (result?.added === false) {
      state = SUBMIT_STATE.FAILED;
    }
  } catch (e) {
    console.log('tomato in submitCourse service function');
    console.log({ error });
    error = e;
    state = SUBMIT_STATE.ERROR;
  }
  return {
    state,
    error,
  };
};

export {
  submitCourse,
  SUBMIT_STATE,
};
