import { auth } from '../../../firebase/client';
import { apiGet } from '../apiGet';

const logoutHandler = () => {
  apiGet({ url: 'auth/logout' })
    .then(() => (auth.signOut()))
    .catch(() => ({}));
};

export {
  logoutHandler,
};
