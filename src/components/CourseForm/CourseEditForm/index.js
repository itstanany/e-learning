/**
 * Edit course form
 * presentational component
 */
import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { fetchCourse, getLectures, submitCourse } from '../../../utils/client';
import { FullPageLoader } from '../../Loader';
import { ErrorPage } from '../../ErrorPage';
import { BasicCourseForm } from '../BasicCourseForm';
import { CourseNotFound } from '../../CourseNotFound';

/**
 * Fetch data for client side render
 * @param {object} param0 "cId" => course Id
 * @returns {course, lectures}: course => course object from database,
 *    "lectures" => array of lectures with resources
 */
const fetchData = async ({ cId } = {}) => {
  // optimize d, fetch course and lectures in parallel
  const data = await Promise.all([
    fetchCourse({ id: cId, lectures: false }),
    getLectures({ cId, resources: true }),
  ]);
  const { course } = data[0];
  const lecturesWithResources = data[1];
  return {
    course,
    lectures: lecturesWithResources,
  };
};

const STATE_CONSTANTS = {
  LOADING: 'LOADING',
  READY: 'READY',
  ERROR: 'ERROR',
  NOT_FOUND: 'NOT_FOUND',
};

function CourseEditForm({ cId }) {
  // course object
  const [course, setCourse] = useState(null);
  // array of lectures
  const [lectures, setLectures] = useState(null);
  // data fetching state
  const [state, setState] = useState(STATE_CONSTANTS.LOADING);

  const submitHandler = useCallback(({
    lectures: lecturesArg,
    courseInfo,
    thumbnail,
  }) => (submitCourse({
    lectures: lecturesArg,
    courseInfo,
    thumbnail,
    url: 'admin/courses/edit',
  })), []);

  useEffect(() => {
    setState(STATE_CONSTANTS.LOADING);
    if (!(cId === null || cId === undefined)) {
      return fetchData({ cId })
        .then(({
          course: resCourse,
          lectures: resLectures,
        }) => {
          if (!resCourse?.title) {
            return setState(STATE_CONSTANTS.NOT_FOUND);
          }
          setCourse(resCourse);
          setLectures(resLectures);
          return setState(STATE_CONSTANTS.READY);
        })
        .catch(() => setState(STATE_CONSTANTS.ERROR));
    }
    return null;
  }, [cId]);

  const renderContent = useMemo(() => {
    /**
     * render content of the page
     */
    switch (state) {
      case STATE_CONSTANTS.READY:
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
                  <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit Course
                </Typography>
              </Grid>
            </Grid>
            <BasicCourseForm
              initialCourse={course}
              initialLectures={lectures}
              submitCourse={submitHandler}
            />
          </>
        );
      case STATE_CONSTANTS.LOADING:
        return <FullPageLoader />;
      case STATE_CONSTANTS.NOT_FOUND:
        return <CourseNotFound />;
      case STATE_CONSTANTS.ERROR:
        return <ErrorPage />;
      default:
        return null;
    }
  }, [state, course, lectures, submitHandler]);

  return (
    renderContent
  );
}

const memoized = memo(CourseEditForm);

export default memoized;

export {
  memoized as CourseEditForm,
};
