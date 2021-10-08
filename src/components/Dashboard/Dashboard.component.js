/**
 * presentational component for user dashboard
 */
import { coursesPropTypes } from '../../utils/client/propTypes';
import { CourseLibrary } from '../CourseLibrary';

function DashboardComponent({ courses }) {
  return (
    <CourseLibrary
      courses={courses}
    />
  );
}

DashboardComponent.defaultProps = {
  courses: [],
};

DashboardComponent.propTypes = {
  courses: coursesPropTypes,
};

export default DashboardComponent;

export {
  DashboardComponent,
};
