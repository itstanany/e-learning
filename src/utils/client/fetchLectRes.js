import { apiPostJson } from './apiPostJson';

const fetchLectRes = ({ cId, lId }) => (apiPostJson({ url: 'courses/course/lectures/lecture/res', body: { lId, cId } }));

export {
  fetchLectRes,
};
