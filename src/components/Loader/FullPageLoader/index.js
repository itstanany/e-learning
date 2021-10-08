import { Loader } from '../Loader';
import s from './style.module.css';

function FullPageLoader() {
  return (
    <div
      className={s['loader--full-page']}
    >
      <Loader />
    </div>
  );
}

export default FullPageLoader;
export {
  FullPageLoader,
};
