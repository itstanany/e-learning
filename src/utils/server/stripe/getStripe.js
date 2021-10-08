import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config/stripe';

const getStripe = () => (new Stripe(STRIPE_SECRET_KEY));

export {
  getStripe,
};
