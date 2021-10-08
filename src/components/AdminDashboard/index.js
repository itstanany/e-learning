/**
 * Admin Dashboard Container component
 */

// MUI imports
import { Button, Container } from '@material-ui/core';
// react imports
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar, useUpdateMounted } from '../../customHooks';
// utils imports
import { getCourses, deleteCourses } from '../../utils/client';
// custom component imports
import { FullPageLoader } from '../Loader';
import { ErrorPage } from '../ErrorPage';
import { AdminDashboardComponent } from './AdminDashboard.component';

const fetchData = async () => {
  /**
   * Fetch data required for the component.
   * @return {object}, "courses" => array of course objects
   */
  const courses = await getCourses();
  return {
    courses,
  };
};

// states of component
const STATE_CONSTANTS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

// Component
function AdminDashboard() {
  // update state helper, it only update state if component is mounted
  const { updateSt } = useUpdateMounted();
  // array of course objects
  const [courses, setCourses] = useState(null);
  // component state concerning data fetching
  const [state, setState] = useState(STATE_CONSTANTS.LOADING);
  // delete item state
  const [delState, setDelState] = useState(STATE_CONSTANTS.IDLE);
  // item to be deleted id
  const [delItmId, setDelItmId] = useState(null);

  // snackbar utils
  const {
    snackbar,
    showSuccess,
    showError,
    showWarning,
  } = useSnackbar();

  // show informative toast message concerning item deletion state
  useEffect(() => {
    switch (delState) {
      case STATE_CONSTANTS.ERROR:
        showError({ msg: 'Sorry, Error in deleting item(s). Please, try again.' });
        break;
      case STATE_CONSTANTS.FAIL:
        showWarning({ msg: 'Sorry, Failed to delete item(s)! Please, try again.' });
        break;
      case STATE_CONSTANTS.SUCCESS:
        showSuccess({
          msg: (
            <>
              <span>
                Congrats! Course Deleted Successfully
              </span>
              &nbsp;
              &nbsp;
              <span>
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant="contained"
                  color="primary"
                >
                  Recover
                </Button>
              </span>
            </>
          ),
        });
        break;
      case STATE_CONSTANTS.UNAUTHORIZED:
        showWarning({ msg: 'Oooops, You aren\'t authorized. Admins Only' });
        break;
      default:
        break;
    }
  }, [delState, showError, showSuccess, showWarning]);

  // data fetch on mounting
  useEffect(() => {
    fetchData()
      .then(({ courses: resCourses }) => {
        // only update state on a mounted component
        updateSt(setCourses, resCourses);
        updateSt(setState, STATE_CONSTANTS.SUCCESS);
      })
      .catch(() => updateSt(setState, STATE_CONSTANTS.ERROR));
  }, [updateSt]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    /**
     * Update "courses" state array with "disabled" state of action buttons
     */
    if (delState === STATE_CONSTANTS.LOADING) {
      return setCourses((prevState) => (
        prevState?.map((course) => ({
          ...course,
          editDisabled: (delState === STATE_CONSTANTS.LOADING && course.id === delItmId),
          delDisabled: delState === STATE_CONSTANTS.LOADING,
        }))
      ));
    }
    if (delState !== STATE_CONSTANTS.IDLE) {
      return setCourses((prevSt) => prevSt?.map((course) => ({
        ...course,
        editDisabled: false,
        delDisabled: false,
      })));
    }
  }, [delItmId, delState]);

  const handlerDeleteCourse = useCallback(async ({ id, index }) => {
    /**
     * Delete course
     * @param {object} courseInfo -  to be deleted course info
     * @param {string} courseInfo.id - Id of course
     * @param {integer} courseInfo.index - index of course in "courses" state array
     */

    updateSt(setDelState, STATE_CONSTANTS.LOADING);

    // same as facebook logic, delete it on the client first
    // i don't prefer this method, I prefer making front-end in sync with back-end
    // setCourses(() => {
    //   const newState = [...courses];
    //   newState.splice(index, 1);
    //   return newState;
    // });

    updateSt(setDelItmId, id);
    try {
      const result = await deleteCourses({ ids: [id] });
      if (result.deleted) {
        updateSt(setDelState, STATE_CONSTANTS.SUCCESS);
        return updateSt(setCourses, (prevState) => {
          const newState = [...prevState];
          newState.splice(index, 1);
          return newState;
        });
      }
      if (result?.[403]) {
        return updateSt(setDelState, STATE_CONSTANTS.UNAUTHORIZED);
      }
      return updateSt(setDelState, STATE_CONSTANTS.FAIL);
    } catch (error) {
      return updateSt(setDelState, STATE_CONSTANTS.ERROR);
    }
  }, [updateSt]);

  const renderContent = useCallback(() => {
    /**
     * Render page content according to fetching data state
     */
    switch (state) {
      case STATE_CONSTANTS.LOADING:
        return <FullPageLoader />;
      case STATE_CONSTANTS.SUCCESS:
        return (
          <AdminDashboardComponent
            courses={courses}
            deleteHandler={handlerDeleteCourse}
          />
        );
      case STATE_CONSTANTS.ERROR:
        return (
          <ErrorPage />
        );
      default:
        return null;
    }
  }, [state, courses, handlerDeleteCourse]);

  return (
    <Container maxWidth="lg">
      {
        renderContent()
      }
      {
        snackbar
      }
    </Container>
  );
}

export default AdminDashboard;
export {
  AdminDashboard,
};
