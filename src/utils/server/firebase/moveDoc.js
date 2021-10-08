import { deleteDoc } from './deleteDoc';
import { copyDoc } from './copyDoc';

/**
 * Move a doc from firestore collection to different collection.
 * @param {object} movingInfo - object contains info about moving data
 * @param {string} movingInfo.collectionFrom - collection name to move a doc from
 * @param {string} movingInfo.docId - document id
 * @param {string} movingInfo.collectionTo - collection name to move doc to
 * @param {object} movingInfo.addData - data to be added to copied doc
 * @returns {boolean || Error} true for success moving or throw error for un successful move
 */
const moveDoc = async ({
  collectionFrom,
  docId,
  collectionTo,
  addData = {},
}) => {
  // copy the organization document
  const copied = await copyDoc({
    collectionFrom, docId, collectionTo, addData, recursive: true,
  });

  // if copy was successful, delete the original
  if (copied) {
    await deleteDoc({ docPath: `${collectionFrom}/${docId}` });
    return true;
  }
  throw new Error(
    'data-loss, Data was not copied properly to the target collection, please try again.',
  );
};

export {
  moveDoc,
};
