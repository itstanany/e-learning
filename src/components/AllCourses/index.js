/*
  * Render all courses in a responsive page.
  * Render mode: Incremental static Generation. Page is revalidated after 5 seconds of visit
*/

import {
  useMemo,
} from 'react';
import { useUser } from '../../customHooks';
import { CourseLibrary } from '../CourseLibrary';
import { coursesPropTypes } from '../../utils/client/propTypes';

function AllCourses({ courses: initialCourses }) {
  const {
    user,
  } = useUser();

  const courses = useMemo(() => {
    /**
     * Update course object to add a boolean "subscribed" prop
     * @returns [objects], array of course objects, see prop-types for object shape
     */
    if (initialCourses?.length && user?.subscription?.length > 0) {
      const coursesWithSubscription = initialCourses?.map((crse) => {
        const crseWithSubscription = {
          ...crse,
          subscribed: user?.subscription?.includes(crse?.id),
        };
        return crseWithSubscription;
      });
      return coursesWithSubscription;
    }
    return initialCourses;
  }, [user, initialCourses]);

  return (
    <>
      {/* Courses Library */}
      <CourseLibrary courses={courses} />
    </>
  );
}

AllCourses.defaultProps = {
  courses: [],
};

AllCourses.propTypes = {
  courses: coursesPropTypes,
};

export default AllCourses;

export {
  AllCourses,
};
