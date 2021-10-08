/**
 * ToDo:
 * Implement pagination
 */
/**
 * User dashboard page
 */
import {
  useCallback, useEffect, useState,
} from 'react';
import Head from 'next/head';
import {
  fetchUserCourses,
} from '../../utils/client';
import {
  FullPageLoader,
} from '../Loader';
import { DashboardComponent } from './Dashboard.component';
import { ErrorPage } from '../ErrorPage';
import { NoSubscription } from './NoSubscriptions';

const Dashboard = () => {
  // array of course objects
  const [courses, setCourses] = useState([]);
  // current component state, on of
  // 'loading' => loading resources from network
  // 'error' => network error happened
  // 'fetched' => resources loaded successfully
  const [state, setState] = useState('loading');

  // fetch user subscribed courses
  useEffect(() => (fetchUserCourses()
    .then(({ courses: resCourses }) => {
      const coursesWithSubscription = resCourses
        ?.map((crse) => ({ ...crse, subscribed: true }));
      setCourses(coursesWithSubscription);
      setState('fetched');
    })
    .catch(() => setState('error'))
  ), []);

  const renderContent = useCallback(() => {
    /**
     * Render page content
     * it depends on current component state
     */
    switch (state) {
      // loading resources from network
      case 'loading':
        return (
          <FullPageLoader />
        );
      // Network error happened
      case 'error':
        return <ErrorPage />;
      case 'fetched':
        return (
          courses?.length > 0
            ? (
              // user's subscribed courses
              <DashboardComponent
                courses={courses}
              />
            )
            : (
              // user has no subscribed courses
              <NoSubscription />
            )
        );
      default:
        return null;
    }
  }, [courses, state]);

  return (
    <>
      <Head>
        <title>
          Dashboard
        </title>
      </Head>
      {
        renderContent()
      }
    </>
  );
};

export default Dashboard;
export {
  Dashboard,
};
