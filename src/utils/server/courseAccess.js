import { getUserDoc } from './getUserDoc';

/**
 * Check for User access to the requested course.
 * @param {*} getServerSideProps nextJS getServerSideProps method.
 * @returns either redirect to course details page if user is not enrolled in that course
 *  ...  or call the getServerSideProps if user is already enrolled.
 */
const courseAccess = (getServerSideProps) => async (ctx, { userCookie }) => {
  const userDoc = await getUserDoc({ uid: userCookie.uid });
  if (userDoc.subscription.includes(ctx.params?.cid)) {
    return getServerSideProps(ctx, { userCookie });
  }
  return {
    redirect: {
      destination: `/courses/${ctx.params?.cid}/${ctx.params?.cslug}`,
      permanent: false,
    },
  };
};

export {
  courseAccess,
};
