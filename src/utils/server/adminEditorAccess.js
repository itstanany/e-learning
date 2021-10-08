import { getUserCookie } from './getUserCookie';

/**
 * page protection method
 * Only allow access to users with "admin" and "editor" roles
 * @param {*} handler NextJS data fetching handler
 * @returns function that can be exported as a nextjs data fetching method
 */
const adminEditorAccess = (handler) => (ctx) => {
  const userCookie = getUserCookie(ctx?.req, ctx?.res);
  if (userCookie.role === 'admin' || userCookie.role === 'editor') {
    return handler(ctx, { userCookie });
  }
  return {
    redirect: {
      destination: `/accessdenied?from=${ctx.resolvedUrl}`,
      permanent: false,
    },
  };
};

export {
  adminEditorAccess,
};
