/**
 * Course Player Container component
 */

import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Loader } from '../Loader';
import {
  fetchLectRes, selectLecture,
} from '../../utils/client';
import { CourseNotFound } from '../CourseNotFound';
import { NotAuthorized } from './NotAuthorized';
import { ErrorPage } from '../ErrorPage';
import { Resource } from './Resource';
import { CoursePlayerComponent } from './CoursePlayer.component';
import { useUpdateMounted } from '../../customHooks/useUpdateMounted';
import { coursePropTypes, lecturePropTypes } from '../../utils/client/propTypes';

const RES_STATE_CONSTANTS = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  NOT_AUTHORIZED: 'NOT_AUTHORIZED',
  FAILED: 'FAILED',
};

const CoursePlayer = ({ course, lectures: initLects }) => {
  const [lectures, setLectures] = useState(initLects);
  // client-side router
  const router = useRouter();
  const [resState, setResState] = useState(RES_STATE_CONSTANTS.LOADING);
  // boolean, status indicator for loading resources of selected lecture
  const [loadingResource, setLoadingResource] = useState(true);
  // boolean, fetching resources errors
  const [error, setError] = useState(false);
  // boolean, authorization state of current user
  const [notAuthorized, setNotAuthorized] = useState(false);
  // lecture object, currently selected lecture
  // fix, when user comes from "watch" button of course details,
  // fix,  ... the resource renders "no resource" for this lecture and "/res" api called twice
  // ... by try to figure out the bug, every thing work as expected
  // .... till fetching actual resource and renderResource re-executed and reached "cas SUCCESS"
  // ... but "resource" component doe not re-render and page remains "no content"
  const [selectedLecture, setSelectedLecture] = useState(
    // selectLecture({ lectures, id: router?.query?.lecture }),
    null,
  );
  // update state handler to update state in mounted component only
  const { updateSt } = useUpdateMounted();

  useEffect(() => {
    /**
     * If there is no lecture query parameter, add id of the first lecture
     */
    if (
      !router?.query?.lecture
      && router?.isReady
      && (lectures?.length > 0)
    ) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            cid: router.query.cid,
            cslug: router.query?.cslug,
            lecture: lectures?.[0]?.id,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [lectures, router]);

  const handleListItemClick = useCallback((e, { lectureId }) => {
    /**
     * update the url with selected lecture id
     */
    e.preventDefault();
    router.push(
      {
        pathname: router.pathname,
        query: {
          cid: router?.query?.cid,
          cslug: router?.query?.cslug,
          lecture: lectureId,
        },
      },
      undefined,
      { shallow: true },
    );
  }, [router]);

  useEffect(() => {
    /**
     * Update lectures object with "selected" boolean property
     */
    setLectures((prevSt) => (
      (prevSt)
        ?.map((lect) => (
          (lect?.id === router?.query?.lecture)
            ? ({ ...lect, selected: true })
            : ({ ...lect, selected: false })))
    ));
  }, [router?.query?.lecture]);

  useEffect(() => {
    /**
     * update "selectedLecture" with lecture object
     *  ... reflecting current "lecture" url parameter
     */
    const selected = lectures?.find((lect) => (lect.selected));
    return setSelectedLecture(selected);
  }, [lectures, router?.query?.cid]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    /**
      * fetch resources of current lecture and add it to selectedLecture object
     */
    if (selectedLecture && !selectedLecture?.res) {
      // setLoadingResource(true);
      // .catch(() => updateSt(setError, true))
      setResState(RES_STATE_CONSTANTS.LOADING);
      return fetchLectRes({ cId: router?.query?.cid, lId: selectedLecture?.id })
        .then(({ resources: responseResources, error: resError }) => {
          if (resError === 'not authenticated' || resError === 'not authorized') {
            return updateSt(setResState, RES_STATE_CONSTANTS.NOT_AUTHORIZED);
            // return updateSt(setNotAuthorized, true);
            // return setNotAuthorized(true);
          }
          // we MUTATE the state to avoid re-fetching the resources on every select
          selectedLecture.res = responseResources;
          return updateSt(setResState, RES_STATE_CONSTANTS.SUCCESS);
          // return updateSt(setSelectedLecture, selectedLecture);
          // return setSelectedLecture(selectedLecture);
        })
        .catch(() => updateSt(setResState, RES_STATE_CONSTANTS.ERROR));
      // .finally(() => updateSt(setLoadingResource, false));
      // .finally(() => updateSt(setLoadingResource, false));
    }
  }, [router?.query?.cid, selectedLecture, updateSt]);

  /**
   * Render resource part with the actual resource
   *  ... or informative message about user status
   */
  const renderResource = useMemo(
    () => {
      switch (resState) {
        case RES_STATE_CONSTANTS.LOADING:
          return <Loader />;
        case RES_STATE_CONSTANTS.SUCCESS:
          return (
            <Resource
              resources={selectedLecture?.res}
            />
          );
        case RES_STATE_CONSTANTS.NOT_AUTHORIZED:
          return (
            <NotAuthorized />
          );
        case RES_STATE_CONSTANTS.ERROR:
          return (
            <ErrorPage />
          );
        default:
          return null;
      }
    }, [resState, selectedLecture?.res],
  );

  return (
    // eslint-disable-next-line no-nested-ternary
    (course && lectures)
      ? (
        <>
          <Head>
            {/*
              * page title
              * "Lecture title" + "Course Title"
            */}
            <title>
              {
                selectedLecture?.title
              }
              {
                selectedLecture?.title
                  ? (
                    ' | '
                  )
                  : null
              }
              {
                course?.title
              }
            </title>
          </Head>
          <CoursePlayerComponent
            course={course}
            lectures={lectures}
            handleListItemClick={handleListItemClick}
            resources={renderResource}
          />
        </>
      )
      : (
        router.isFallback
          ? <Loader />
          : <CourseNotFound />
      )
  );
};

CoursePlayer.defaultProps = {
  course: null,
  lectures: null,
};

CoursePlayer.propTypes = {
  course: coursePropTypes,
  lectures: PropTypes.arrayOf(lecturePropTypes),
};

export default CoursePlayer;

export {
  CoursePlayer,
};
