/**
 * Authentication Container component
 */
import { Grid } from '@material-ui/core';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FullPageLoader } from '../Loader';
import { loginWithGoogle } from '../../firebase/client';
import { useUser } from '../../customHooks/useUser';
import { AuthFailed } from './AuthFailed';
import { AuthError } from './AuthError';
import { AuthRedirect } from './AuthRedirect';
import { AuthComponent } from './Auth.component';
import { AUTH_ROUTE } from '../../utils/client/config';

const STATE_CONSTANTS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const Auth = () => {
  // user document fetching custom hook
  const { user, isLoading, isError } = useUser();
  // client side router
  const router = useRouter();
  // auth flow state, see "STATE_CONSTANTS" for possible states
  const [state, setState] = useState(STATE_CONSTANTS.IDLE);

  // perform redirection for already authenticated users
  const redirectAuthenticated = useCallback(() => (
    (
      router?.isReady
      && router.push(`${router?.query?.from || AUTH_ROUTE}`)
    )
  ), [router]);

  useEffect(() => {
    /**
     * Update state according to custom hook state
     */
    if (isLoading) {
      return setState(STATE_CONSTANTS.LOADING);
    }
    if (isError) {
      return setState(STATE_CONSTANTS.ERROR);
    }
    if (user) {
      redirectAuthenticated();
      return setState(STATE_CONSTANTS.SUCCESS);
    }
    return setState(STATE_CONSTANTS.IDLE);
  }, [user, isLoading, isError, redirectAuthenticated]);

  const handleLogin = useCallback(async (e) => {
    /**
     * Login logic handler
     * @param {HTMLClickEvent} - Click event
     * @return undefined
     */
    e.preventDefault();
    try {
      const result = await loginWithGoogle();
      if (result.auth) {
        setState(STATE_CONSTANTS.SUCCESS);
        redirectAuthenticated();
      } else {
        setState(STATE_CONSTANTS.FAILED);
      }
    } catch {
      setState(STATE_CONSTANTS.ERROR);
    }
  }, [redirectAuthenticated]);

  const authComponent = useMemo(() => (
    <AuthComponent
      handleLogin={handleLogin}
    />
  ), [handleLogin]);

  const renderContent = useMemo(() => {
    /**
     * Content render logic
     */
    switch (state) {
      case STATE_CONSTANTS.LOADING:
        return <FullPageLoader />;
      case STATE_CONSTANTS.SUCCESS:
        return <AuthRedirect />;
      case STATE_CONSTANTS.FAILED:
        return (
          <>
            <AuthFailed />
            {
              authComponent
            }
          </>
        );
      case STATE_CONSTANTS.ERROR:
        return (
          <>
            <AuthError />
            {
              authComponent
            }
          </>
        );
      case STATE_CONSTANTS.IDLE:
        return (
          authComponent
        );
      default:
        return null;
    }
  }, [authComponent, state]);

  return (
    <>
      <Head>
        <title>
          Authentication
        </title>
      </Head>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {
          renderContent
        }
      </Grid>
    </>
  );
};

export default Auth;

export {
  Auth,
};
