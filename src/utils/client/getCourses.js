import { apiGet } from './apiGet';

const getCourses = () => (
  apiGet({ url: 'courses' })
    .then(({ courses }) => courses)
);

export {
  getCourses,
};
