import { Grid } from '@material-ui/core';
import { CourseCard } from '../CourseCard/Index';

function CourseLibrary({ courses }) {
  return (
    <Grid container spacing={3}>
      {
        courses?.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CourseCard course={course} key={course.id} subscribed={course?.subscribed} />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default CourseLibrary;

export {
  CourseLibrary,
};
