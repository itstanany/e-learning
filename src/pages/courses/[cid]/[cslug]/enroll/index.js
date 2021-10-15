import React from 'react';
import { Enroll } from '../../../../../components/Enroll';
import { getAllcourses, getCourse } from '../../../../../utils/server';

function CourseEnroll({
  course,
  cid,
  cslug,
}) {
  return (
    <Enroll
      course={course}
      cId={cid}
      cSlug={cslug}
    />
  );
}

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
  const { params: { cid, cslug } } = ctx;
  const course = await getCourse({ id: cid });
  return {
    props: {
      course: course || null,
      cid,
      cslug,
    },
  };
};
export default CourseEnroll;

export {
  getStaticProps,
  getStaticPaths,
};
