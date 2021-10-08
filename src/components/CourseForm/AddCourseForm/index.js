/**
 * Add Course Form,
 * presentational component
 */

import { useMemo } from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { AddToQueueOutlined } from '@material-ui/icons';
import { lecturePlaceholder } from '../../../utils/client';
import { BasicCourseForm } from '../BasicCourseForm';
import { useUser } from '../../../customHooks';

const lectures = [{
  ...lecturePlaceholder,
}];

const AddCourseForm = () => {
  // user document from back-end
  const { user } = useUser();
  // course initial data
  const course = useMemo(() => ({
    title: '',
    description: '',
    price: '',
    author: user?.name,
  }), [user]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
        >
          <Avatar style={{ margin: '0 auto' }}>
            <AddToQueueOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Course
          </Typography>
        </Grid>
      </Grid>
      <BasicCourseForm
        initialCourse={course}
        initialLectures={lectures}
      />
    </>
  );
};
export default AddCourseForm;

export {
  AddCourseForm,
};
