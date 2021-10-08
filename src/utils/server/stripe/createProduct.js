const createProduct = async ({
  name,
  id,
  images = [],
  active = true,
  description = '',
} = {}) => {
  const product = {
    name,
    id,
    images,
    active,
    description,
  };
  const result = await stripe.products.create(product);
  console.log({ result });
  return {
    product: result,
  };
};

export {
  createProduct,
};
