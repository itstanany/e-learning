import React from 'react';
import { FullPage } from '../UI/FullPage';

function Redirect({
  children,
}) {
  return (
    <FullPage>
      {
        children
      }
    </FullPage>
  );
}

export default Redirect;
export {
  Redirect,
};
