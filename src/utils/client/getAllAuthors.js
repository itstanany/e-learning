import { apiPostJson } from './apiPostJson';

const getAllAuthors = () => (
  apiPostJson({ url: 'user/allauthors' })
    .then(({ allAuthors }) => allAuthors)
);

export {
  getAllAuthors,
};
