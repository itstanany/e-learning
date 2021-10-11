import { getStripe } from './getStripe';

const stripe = getStripe();
const createProduct = async ({
  name,
  id,
  images = [],
  active = true,
  description,
} = {}) => {
  const product = {
    name,
    id,
    images,
    active,
    description,
  };
  const result = await stripe.products.create(product);
  return {
    product: result,
  };
};

export {
  createProduct,
};
