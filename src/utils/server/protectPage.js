import { getUserCookie } from './getUserCookie';
import { AUTH_ROUTE } from '../client/config';

/**
 * Protect NextJs page to allow only authenticated users
 * @param {function} getServerSideProps NextJs getServerSideProps function
 * @returns redirect ot auth page if user not signed in, or
 *    ... call the getServerSideProps in authenticated users.
 */
const protectPage = (getServerSideProps) => async (ctx) => {
  const userCookie = getUserCookie(ctx.req, ctx.res);
  if (!userCookie) {
    return {
      redirect: {
        destination: `${AUTH_ROUTE || '/auth'}?from=${ctx.resolvedUrl}`,
        permanent: false,
      },
    };
  }
  return getServerSideProps(ctx, { userCookie });
};

export {
  protectPage,
};
