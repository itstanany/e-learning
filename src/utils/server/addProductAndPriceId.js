import { adminFirestore } from '../../firebase/admin';

const AddProductAndPriceId = async ({
  courseId,
  productId,
  priceId,
}) => {
  const docRef = await adminFirestore.doc(`courses/${courseId}`);
  const updates = {};

  if (productId) {
    updates.productId = productId;
  }

  if (priceId) {
    updates.priceId = priceId;
  }
  return docRef.set(updates, { merge: true });
};

export {
  AddProductAndPriceId,
};
