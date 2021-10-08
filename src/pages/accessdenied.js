import Link from 'next/link';
import React from 'react';

function AccessDenied() {
  return (
    <div>
      Access Denied for the requested page!
      <br />
      <Link href="/">
        <a>
          Back to Home.
        </a>
      </Link>
    </div>
  );
}

export default AccessDenied;
