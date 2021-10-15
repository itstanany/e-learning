/**
 * Enroll page for courses
 */
import { useEffect } from 'react';
import { stripeSession } from '../../utils/client/stripe';
import { FullPageLoader } from '../Loader';

function Enroll({
  course,
  cId,
  cSlug,
}) {
  useEffect(() => (
    stripeSession({
      items: [{
        price: course?.priceId,
        quantity: 1,
      }],
      cId,
      cSlug,
    })), [cId, cSlug, course?.priceId]);
  return (
    <FullPageLoader />
  );
}

export default Enroll;

export {
  Enroll,
};
