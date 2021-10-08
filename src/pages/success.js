/*
  * stripe session success page
*/

import { useRouter } from 'next/router';

import React from 'react';

function StripeSuccess() {
  const router = useRouter();
  return (
    <div>
      <h1>
        Congrats, you have subscripted to the course successfully!
      </h1>
      {
        router?.isReady
        && router?.query?.sessionId
      }
    </div>
  );
}

export default StripeSuccess;
