import { apiPostJson } from './apiPostJson';

const fetchUserCourses = () => (apiPostJson({ url: 'user/courses' }));

export {
  fetchUserCourses,
};
