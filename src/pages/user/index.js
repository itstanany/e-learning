/**
 * User dashboard page
 */
import { Dashboard } from '../../components/Dashboard';
import {
  protectPage,
} from '../../utils/server';

const UserDashboard = () => (<Dashboard />);

const getSSProps = () => ({ props: {} });

export const getServerSideProps = protectPage(getSSProps);

export default UserDashboard;
