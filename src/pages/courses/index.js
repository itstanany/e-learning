/*
  * Render all courses in a responsive page.
  * Render mode: Incremental static Generation. Page is revalidated after 5 seconds of visit
*/

import Head from 'next/head';
import { AllCourses } from '../../components/AllCourses';
import { getAllcourses } from '../../utils/server';

function AllCoursesPage({ courses }) {
  return (
    <>
      <Head>
        <title>
          All Courses
        </title>
      </Head>
      {/* Courses Library */}
      <AllCourses courses={courses} />
    </>
  );
}

export default AllCoursesPage;

export const getStaticProps = async () => {
  // get array of all courses
  const courses = await getAllcourses();
  return {
    props: {
      courses: courses || [],
    },
    revalidate: 5,
  };
};
