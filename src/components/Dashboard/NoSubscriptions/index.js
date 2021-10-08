/**
 * Presentational component to show informative message
 * ... to usr that hasn't subscribed to any course yet
 */

import Link from 'next/link';

function NoSubscription() {
  return (
    <div>
      <h1>
        You are not enrolled in any course yet.
      </h1>
      <h3>
        Click
        &nbsp;
        <Link
          href='/courses'
        >
          <a>
            HERE
          </a>
        </Link>
        &nbsp;
        to see Courses Catalog
      </h3>
    </div>
  );
}

export default NoSubscription;

export {
  NoSubscription,
};
