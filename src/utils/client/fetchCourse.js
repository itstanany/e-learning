import { apiPostJson } from './apiPostJson';

const fetchCourse = async ({ id, lectures = true }) => {
  const { course, lectures: resLectures = [] } = await apiPostJson({
    url: 'courses/course',
    body: { id, lectures },
  });
  return {
    course,
    lectures: resLectures,
  };
};

export {
  fetchCourse,
};
