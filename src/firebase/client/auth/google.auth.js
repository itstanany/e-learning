import firebase from 'firebase/app';
import { verifyOnBackend } from '../../../utils/client';
import { auth } from './auth.config';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const loginWithGoogle = async () => {
  const res = await auth.signInWithPopup(googleProvider);
  // official way to get idTOken of google sign in
  // but "res.user.Aa" worked in real example
  // res.credential.idToken raise...
  //    "error: FirebaseAuthError: Firebase ID token has incorrect "aud" (audience) claim."
  // const idToken = await auth.currentUser.getIdToken();
  const idToken = res.user.Aa;
  const result = await verifyOnBackend({ idToken, isNewUser: res.additionalUserInfo.isNewUser });
  return result;
};

export {
  googleProvider,
  loginWithGoogle,
};
