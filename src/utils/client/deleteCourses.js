import { apiPostJson } from './apiPostJson';

const deleteCourses = async ({ ids = [] } = {}) => {
  const result = await apiPostJson({ url: 'admin/courses/delete', body: { ids } });
  return {
    deleted: result?.deleted,
    403: true,
  };
};

export {
  deleteCourses,
};
