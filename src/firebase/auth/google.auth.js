import firebase from 'firebase/app';
import { auth } from './auth.config';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const verifyOnBackEnd = ({ idToken, isNewUser }) => fetch('/api/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    idToken,
    isNewUser,
  }),
}).then((signinRes) => signinRes.json());

const signinWithGoogle = async () => {
  const res = await auth.signInWithPopup(googleProvider);
  // official way to get idTOken of google sign in
  // but "res.user.Aa" worked in real example
  // res.credential.idToken raise...
  //    "error: FirebaseAuthError: Firebase ID token has incorrect "aud" (audience) claim."
  // const idToken = await auth.currentUser.getIdToken();
  const idToken = res.user.Aa;
  const result = await verifyOnBackEnd({ idToken, isNewUser: res.additionalUserInfo.isNewUser });
  return result;
};

export {
  googleProvider,
  signinWithGoogle,
};
