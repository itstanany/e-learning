import { adminFirestore } from '../../firebase/admin';

/**
 * Get all users whose role is either "admin" or "editor"
 * @returns array of document objects of fields: "uid", "name", and "role"
 */
const getAllAuthors = () => {
  const usersRef = adminFirestore.collection('users');
  return usersRef.where('role', 'in', ['admin', 'editor']).get(['name', 'uid'])
    .then((querySnapshot) => querySnapshot.docs.map((doc) => (
      { uid: doc.get('uid'), name: doc.get('name'), role: doc.get('role') }
    )));
};

export {
  getAllAuthors,
};
