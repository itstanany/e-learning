/**
 * Full page wrapper component
 * it render its children component with full view dimensions
 */
import s from './style/index.module.scss';

function FullPage({ children }) {
  return (
    <div
      className={s['loader--full-page']}
    >
      {
        children
      }
    </div>
  );
}

export {
  FullPage,
};
