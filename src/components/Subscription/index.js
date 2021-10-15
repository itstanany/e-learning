/**
 * Subscription component
 * container component
 * It show user subscription process state whether succeeded or failed
 */

import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useMemo, useState } from 'react';
import { apiPostJson } from '../../utils/client';
import { FullPageLoader } from '../Loader';
import { FullPage } from '../UI/FullPage';
import { ErrorPage } from '../ErrorPage';

const STATE_CONSTANTS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  ERROR: 'ERROR',
};

const makeSubscription = async ({
  cId,
  sessionId,
}) => {
  const { status } = await apiPostJson({
    url: 'user/subscribe',
    body: {
      cId,
      sessionId,
    },
  });
  if (status === 'subscribed') {
    return {
      status: 'success',
    };
  }
  return {
    status: 'failed',
  };
};

function Subscription() {
  const router = useRouter();
  const [state, setState] = useState(STATE_CONSTANTS.LOADING);

  useEffect(() => {
    if (router?.isReady && router?.query?.session_id) {
      makeSubscription({
        cId: router?.query?.cid,
        sessionId: router?.query?.session_id,
      })
        .then(({ status }) => setState(status === 'success'
          ? STATE_CONSTANTS.SUCCESS
          : STATE_CONSTANTS.FAIL))
        .catch(() => setState(STATE_CONSTANTS.ERROR));
    }
  }, [router?.isReady, router?.query?.cid, router?.query?.session_id, router?.session_id]);

  const renderContent = useMemo(() => {
    switch (state) {
      case STATE_CONSTANTS.LOADING:
        return <FullPageLoader />;
      case STATE_CONSTANTS.SUCCESS:
        return (
          <FullPage>
            <h1>Congrats, Redirecting to watch the course......!!!!!!!</h1>
          </FullPage>
        );
      case STATE_CONSTANTS.FAIL:
        return <ErrorPage />;
      default:
        return null;
    }
  }, [state]);

  useEffect(() => {
    if (state === STATE_CONSTANTS.SUCCESS && router?.isReady) {
      router
        ?.push(`/courses/${router?.query?.cid}/${router?.query?.cslug}/player`);
    }
  }, [router, state]);

  return (
    renderContent
  );
}

export default Subscription;

export {
  Subscription,
};
