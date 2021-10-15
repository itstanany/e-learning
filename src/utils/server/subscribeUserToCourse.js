import { firestore } from 'firebase-admin/lib';
import { adminFirestore } from '../../firebase/admin';

const subscribeUserToCourse = async ({
  cId,
  uid,
}) => {
  const userDocRef = adminFirestore.doc(`users/${uid}`);
  const userDoc = await userDocRef.get()
    .then((querySnap) => querySnap?.data());
  const newSub = [
    ...userDoc?.subscription,
    cId,
  ];
  return userDocRef.update({
    subscription: newSub,
  });
};

export {
  subscribeUserToCourse,
};
