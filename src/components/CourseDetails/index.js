/**
 * Course Details Container component
 */
import propTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import {
  Button,
} from '@material-ui/core';
import Link from 'next/link';
import { useUser } from '../../customHooks';
import { FullPageLoader } from '../Loader';
import { coursePropTypes, lecturePropTypes } from '../../utils/client/propTypes';
import { CourseDetailsComponent } from './CourseDetails.component';

const CourseDetails = ({ course, lectures }) => {
  // client-side router
  const router = useRouter();
  // user document
  const { user } = useUser();
  // boolean, Is current user subscribed to the course or not?
  const [subscribed, setSubscribed] = useState(user?.subscription?.includes(course?.id));
  useEffect(() => {
    setSubscribed(user?.subscription?.includes(course?.id));
  }, [course?.id, user]);

  const renderContent = useMemo(() => {
    if (router.isFallback) return (<FullPageLoader />);
    // course not found
    if (!course?.title) {
      return (
        <>
          <h1>
            Sorry, we can&apos;t find this course,
          </h1>
          <Link
            href="/courses"
            passHref
          >
            <Button
              color="primary"
              variant="contained"
            >
              Back to Course Catalog
            </Button>
          </Link>
        </>
      );
    }
    return (
      <>
        <Head>
          {/* Page title */}
          <title>
            {
              course?.title
            }
          </title>
        </Head>
        <CourseDetailsComponent
          lectures={lectures}
          course={course}
          subscribed={subscribed}
        />
      </>
    );
  }, [course, lectures, router.isFallback, subscribed]);

  return (
    renderContent
  );
};

// component default props
CourseDetails.defaultProps = {
  course: {},
  lectures: [],
};
// component prop types
CourseDetails.propTypes = {
  course: coursePropTypes,
  lectures: propTypes.arrayOf(lecturePropTypes),
};

export {
  CourseDetails,
};
