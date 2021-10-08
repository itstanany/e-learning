import { apiPostJson } from './apiPostJson';

const getLectures = ({ cId, resources = false }) => (
  apiPostJson({ url: 'courses/course/lectures', body: { id: cId, resources } })
    .then(({ lectures }) => lectures)
);

export {
  getLectures,
};
