/* eslint-disable no-restricted-syntax */
import { adminFirestore } from '../../../firebase/admin';

/**
 * Delete Doc and its sub collection
 * @param {object} deletionInfo - object contains info about doc t be deleted
 * @param {string} deletionInfo.docPath - document path in firestore to be deleted
 * @returns {boolean} true for successful deletion, false otherwise
 */
const deleteDoc = async ({ docPath }) => {
  // document reference
  const docRef = adminFirestore
    .doc(docPath);

  // sub-collections
  const subcollections = await docRef.listCollections();
  for await (const subcollectionRef of subcollections) {
    await subcollectionRef
      .get()
      .then(async (snapshot) => {
        const { docs } = snapshot;
        for await (const doc of docs) {
          await deleteDoc({ docPath: `${docPath}/${subcollectionRef.id}/${doc.id}` });
        }
        return true;
      })
      .catch(() => false);
  }

  // when all sub-collections are deleted, delete the document itself
  return docRef
    .delete()
    .then(() => true)
    .catch(() => false);
};

export {
  deleteDoc,
};
