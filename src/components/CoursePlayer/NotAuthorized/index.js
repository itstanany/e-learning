/**
 * Not Authorized presentational component
 */
import { useRouter } from 'next/router';
import Link from 'next/link';

function NotAuthorized() {
  const router = useRouter();
  return (
    <div>
      <h1>
        You are not authorized to see content of this lecture.
      </h1>
      <p>
        Click
        &nbsp;
        <Link
          href={
            {
              pathname: '/courses/[cid]/[cslug]/enroll',
              query: {
                cid: router?.query?.cid,
                cslug: router?.query?.cslug,
              },
            }
          }
        >
          <a>
            HERE to ENROLL
          </a>
        </Link>
      </p>
      <p>
        Or LogIn
        &nbsp;
        <Link
          href={
            {
              pathname: '/auth',
              query: {
                from: `/courses/${router?.query?.cid}/${router?.query?.cslug}/player`,
              },
            }
          }
          HERE
        >
          <a>
            HERE
          </a>
        </Link>
        &nbsp;
        if you are already enrolled.
      </p>
    </div>
  );
}

export default NotAuthorized;
export {
  NotAuthorized,
};
