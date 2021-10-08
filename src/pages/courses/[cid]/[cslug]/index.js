/**
 * Course Details Page
 */
import propTypes from 'prop-types';
import { CourseDetails } from '../../../../components/CourseDetails';
import { coursePropTypes, lecturePropTypes } from '../../../../utils/client/propTypes';
import { getAllcourses, getCourse, getLectures } from '../../../../utils/server';

function CourseDetailsPage({ course, lectures }) {
  return (
    <CourseDetails
      course={course}
      lectures={lectures}
    />
  );
}

// component default props
CourseDetailsPage.defaultProps = {
  course: {},
  lectures: [],
};
// component prop types
CourseDetailsPage.propTypes = {
  course: coursePropTypes,
  lectures: propTypes.arrayOf(lecturePropTypes),
};

export default CourseDetailsPage;

// Routes for available courses at build time
const getStaticPaths = async () => {
  const courses = await getAllcourses();
  const paths = [];
  courses.forEach((course) => paths.push({ params: { cid: course.id, cslug: course.slug } }));
  return ({
    paths,
    fallback: true,
  });
};

// get course details and pass it to the component
const getStaticProps = async (ctx) => {
  const { params: { cid } } = ctx;
  const course = await getCourse({ id: cid }) || null;
  const lectures = await getLectures({ courseId: course?.id }) || null;
  return {
    props: {
      course,
      lectures,
    },
  };
};

export {
  getStaticProps,
  getStaticPaths,
};
