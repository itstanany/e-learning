/**
 * Basic Course Form
 * It renders a course data with the ability to change it
 * Container component
 */

/**
 * TO DO
 * todo add deletion feature for lecture and resources
 * todo add prop-types
 */

/* eslint-disable react/destructuring-assignment */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
// styles
import { makeStyles } from '@material-ui/core/styles';
// components
import {
  CircularProgress, Snackbar, Container, Grid,
  Button,
} from '@material-ui/core';
import { Alert } from '../../Alert';
import {
  canUseDOM, getAllAuthors, lecturePlaceholder, resources,
  // submitCourse,
  SUBMIT_STATE,
  validateFormRequired,
} from '../../../utils/client';
import { LecturesForm } from '../LecturesForm';
import { CourseInfoForm } from '../CourseInfoForm';
import { useUser } from '../../../customHooks';

const STATE_CONSTANTS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  INVALID: 'INVALID',
  FAILED: 'FAILED',
  OFFLINE: 'OFFLINE',
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '3em',
    font: '2em',
  },
  lecture: {
    borderStyle: 'solid',
    borderRadius: '10px',
    borderColor: '#e0e0e0',
    margin: '5px 0px',
    padding: '5px',
  },
  formControl: {
    width: '100%',
  },
  centerAtSm: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

function BasicCourseForm({
  initialCourse,
  initialLectures,
  submitCourse,
}) {
  // classes object of class names
  const classes = useStyles();

  // user document, {name, role, uid, subscription, ...}
  const { user } = useUser();

  // array of author objects, object is in the form of the initial state below
  const [allAuthors, setAllAuthors] = useState([{
    name: user?.name,
    uid: user?.uid,
    role: user?.role,
  }]);

  useEffect(() => (
    /**
     * Fetch all authors and update state
     */
    getAllAuthors()
      .then((resAllAuthors) => {
        setAllAuthors(resAllAuthors);
      })), []);

  // value of file input
  const [thumbnail, setThumbnail] = useState(null);

  // snackbar toast message state
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: '',
  });

  // course info object, see prop-types for object shape
  const [courseInfo, setCourseInfo] = useState(initialCourse);
  // lecture order
  const lectureOrder = useRef(initialLectures?.[initialLectures.length - 1]?.order || 1);
  // array of lecture objects, see prop-types for object shape
  const [lectures, setLectures] = useState(initialLectures);

  // form submission state, one of "STATE_CONSTANTS" defined above
  const [submitState, setSubmitState] = useState(STATE_CONSTANTS.IDLE);

  const handlerInpChange = useCallback((e, { index, value: unformattedValue, resIndex } = {}) => {
    /**
   * Handle input change
   * @param e => input change html event
   * @param index => number, index of changed lecture in lectures array
   * @param value: unformattedValue => value either string or number value
   * @param resIndex: number, index of resource object
   */
    // any input change revert submit state to idle state
    // so, next submit start from idle state
    setSubmitState(STATE_CONSTANTS.IDLE);

    const { target: { value: eValue, name } } = e;
    const value = unformattedValue !== undefined ? unformattedValue : eValue;
    // input is a courseInfo property
    if (index === undefined) {
      if (name === 'thumbnail') return setThumbnail(e.target.files[0]);
      return setCourseInfo((prevState) => ({ ...prevState, [name]: value }));
    }
    // input is a resource entry of a specific lecture
    if (resIndex !== undefined) {
      return setLectures((prevSt) => {
        const newState = [...prevSt];
        const newLect = {
          ...newState[index],
          resources: [...newState[index].resources],
        };
        newLect.resources[resIndex] = {
          ...newLect.resources[resIndex],
          [name]: value,
        };
        newState[index] = newLect;
        return newState;
      });
    }
    // update a lecture info prop
    return setLectures((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: value,
      };
      return newState;
    });
  }, []);

  const handlerAddNewLect = useCallback(() => {
    /**
     * Add New lecture entry form
     */
    lectureOrder.current += 1;
    setLectures((prevState) => ([
      ...prevState, {
        ...(lecturePlaceholder),
        order: lectureOrder.current,
      }]));
  }, [lectureOrder]);

  const handlerAddNewRes = useCallback((_e, { index } = {}) => (
    /**
     * Add new resource object placeholder for resources array of current lecture
     * @param "_e" => click event
     * @param { index }, => "index": integer, index of lecture object in lectures array
     */
    setLectures((prevSt) => {
      const newState = [...prevSt];
      newState[index].resources = [
        ...newState[index].resources,
        {
          ...resources,
        }];
      return newState;
    })
  ), []);

  const handleSubmit = useCallback(async (e) => {
    /**
     * Submit course to the back-end
     * @param "e" => submit html event
     */
    e.preventDefault();
    // eslint-disable-next-line no-underscore-dangle
    let _state = STATE_CONSTANTS.LOADING;
    setSubmitState(_state);

    try {
      // validate form fields
      if (!validateFormRequired({ formName: 'basicCourseForm' })) {
        return setSubmitState(STATE_CONSTANTS.INVALID);
      }
      // submit course
      const {
        state,
        error,
      } = await submitCourse({ lectures, courseInfo, thumbnail });
      // update the component state depending on submission state
      switch (state) {
        case SUBMIT_STATE.ADDED:
          _state = STATE_CONSTANTS.SUCCESS;
          setTimeout(() => {
            if (canUseDOM()) {
              window.location.reload(true);
            }
          }, 2000);
          break;
        case SUBMIT_STATE.FAILED:
          _state = STATE_CONSTANTS.FAILED;
          break;
        case SUBMIT_STATE.ERROR:
          if (error?.message === 'Failed to fetch') {
            _state = STATE_CONSTANTS.OFFLINE;
          } else {
            _state = STATE_CONSTANTS.ERROR;
          }
          break;
        default:
          break;
      }
    } catch (error) {
      _state = STATE_CONSTANTS.ERROR;
    }
    return setSubmitState(_state);
  }, [courseInfo, lectures, thumbnail]);

  const handlerSnackbarClose = useCallback(() => {
    /**
     * Control visibility of Snackbar toast
     */
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  const handlerDeleteThumbnail = useCallback(() => {
    /**
     * Delete thumbnail from current course info object
     */
    setCourseInfo((prevState) => {
      const newCourseInfo = {
        ...prevState,
      };
      delete newCourseInfo.thumbnail;
      return newCourseInfo;
    });
  }, []);

  useEffect(() => {
    // update course info switch latest parent picture
    setCourseInfo(initialCourse);
  }, [initialCourse]);

  const showToast = useCallback(({
    msg,
    severity,
  }) => {
    /**
     * Show Toast message
     * @param msg: string, toast message
     * @param severity: message color variant
     */
    setSnackbarState(
      {
        open: true,
        message: msg,
        severity,
      },
    );
  }, []);

  useEffect(() => {
    /**
     * Show toast message reflecting current state of course submission
     */
    let msg;
    let severity;
    switch (submitState) {
      case STATE_CONSTANTS.INVALID:
        msg = 'Invalid Entries, please fill all required fields';
        severity = 'error';
        break;
      case STATE_CONSTANTS.ERROR:
        msg = 'Something went wrong, please try again';
        severity = 'error';
        break;
      case STATE_CONSTANTS.SUCCESS:
        msg = 'Submitted Successfully, Great!';
        severity = 'success';
        break;
      case STATE_CONSTANTS.FAILED:
        msg = 'Sorry, Failed to Submit, Please Try again';
        severity = 'error';
        break;
      case STATE_CONSTANTS.OFFLINE:
        msg = 'It seems You are offline. Don\'t worry, we saved your work and will try again when you back online';
        severity = 'warning';
        break;
      default:
        break;
    }
    if (msg && severity) {
      showToast({ msg, severity });
    }
  }, [submitState, showToast]);

  return (
    <Container
      maxWidth="lg"
    >
      <form
        className={classes.form}
        name="basicCourseForm"
      >
        <Grid container spacing={2}>
          {/* Course Basic Info */}
          <Grid
            item
            xs={12}
          >
            <CourseInfoForm
              title={courseInfo?.title}
              description={courseInfo?.description}
              price={courseInfo?.price}
              author={courseInfo?.author}
              // eslint-disable-next-line jsx-a11y/aria-role
              role={user?.role}
              allAuthors={allAuthors}
              handlerInpChange={handlerInpChange}
              thumbnail={courseInfo?.thumbnail}
              onDeleteThumbnail={handlerDeleteThumbnail}
            />
          </Grid>

          {/* Lectures */}
          <Grid
            item
            xs={12}
          >
            <LecturesForm
              lectures={lectures}
              handlerAddNewRes={handlerAddNewRes}
              handlerInpChange={handlerInpChange}
              handlerAddNewLect={handlerAddNewLect}
              state={submitState}
            />
          </Grid>
        </Grid>
        {/* Submit button */}
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          className={classes.centerAtSm}
        >
          <Grid
            item
            xs={10}
            sm={4}
            md={3}
          >
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={submitState === STATE_CONSTANTS.LOADING}
            >
              Submit
              &nbsp;
              {
                submitState === STATE_CONSTANTS.LOADING
                && <CircularProgress size="2em" />
              }
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Toast message */}
      <Snackbar
        autoHideDuration={6000}
        open={snackbarState.open}
        onClose={handlerSnackbarClose}
      >
        <Alert
          severity={snackbarState.severity}
          onClose={handlerSnackbarClose}
        >
          {
            snackbarState.message
          }
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BasicCourseForm;

export {
  BasicCourseForm,
};
