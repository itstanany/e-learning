import { adminFirestore } from '../../../firebase/admin';

/**
 * Copy a doc from firestore collection to different collection.
 * @param {object} copyingInfo - object contains info about moving data
 * @param {string} copyingInfo.collectionFrom - collection name to move a doc from
 * @param {string} copyingInfo.docId - document id
 * @param {string} copyingInfo.collectionTo - collection name to move doc to
 * @param {boolean} copyingInfo.recursive - whether to copy sub-collections or not
 * @param {object} copyingInfo.addData - data to be added to copied doc
 * @returns {boolean || Error} true for success moving or throw error for un successful move
 */
const copyDoc = async (
  {
    collectionFrom,
    docId,
    collectionTo,
    addData = {},
    recursive = false,
  },
) => {
  // document reference
  const docRef = adminFirestore.collection(collectionFrom).doc(docId);
  // copy the document
  const docData = await docRef
    .get()
    .then((doc) => doc.exists && doc.data())
    .catch(() => {
      throw new Error('not-found, Copying document was not read');
    });

  if (docData) {
    // document exists, create the new item
    await adminFirestore
      .collection(collectionTo)
      .doc(docId)
      .set({ ...docData, ...addData })
      .catch(() => {
        throw new Error('data-loss, Data was not copied properly to the target collection, please try again.');
      });

    // if copying of the subcollections is needed
    if (recursive) {
      // subcollections
      const subcollections = await docRef.listCollections();
      // eslint-disable-next-line no-restricted-syntax
      for await (const subcollectionRef of subcollections) {
        const subcollectionPath = `${collectionFrom}/${docId}/${subcollectionRef.id}`;

        // get all the documents in the collection
        return subcollectionRef
          .get()
          .then(async (snapshot) => {
            const { docs } = snapshot;
            // eslint-disable-next-line no-restricted-syntax
            for await (const doc of docs) {
              await copyDoc({
                collectionFrom: subcollectionPath,
                docId: doc.id,
                collectionTo: `${collectionTo}/${docId}/${subcollectionRef.id}`,
                recursive: true,
              });
            }
            return true;
          })
          .catch(() => {
            throw new Error(
              'data-loss, Data was not copied properly to the target collection, please try again.',
            );
          });
      }
    }
    return true;
  }
  return false;
};

export {
  copyDoc,
};
