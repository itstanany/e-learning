/**
 * Course Player Page
 */

import { CoursePlayer } from '../../../../components/CoursePlayer';
import {
  getAllcourses,
  getCourse, getLectures,
} from '../../../../utils/server';

const PlayerPage = ({ course, lectures }) => (
  <CoursePlayer
    course={course}
    lectures={lectures}
  />
);

export default PlayerPage;

const getStaticPaths = async () => {
  const courses = await getAllcourses();
  const paths = [];
  courses.forEach((course) => paths.push(
    {
      params: { cid: course.id, cslug: course.slug },
    },
  ));
  return ({
    paths,
    fallback: true,
  });
};

const getStaticProps = async (ctx) => {
  const { params: { cid } } = ctx;
  const course = await getCourse({ id: cid });
  const lectures = await getLectures({ courseId: cid });
  return {
    props: {
      course: course || null,
      lectures: lectures || null,
    },
  };
};

export {
  getStaticProps,
  getStaticPaths,
};
