/**
 * Add Course Form
 */

// helper utilities
import {
  adminEditorAccess, protectPage,
} from '../../../utils/server';
import { AddCourseForm } from '../../../components/CourseForm';

const AddCourse = () => (<AddCourseForm />);

/**
 * protect page,
 * access to "admin,editor" only
 */
const getSSProps = async () => ({ props: {} });

export const getServerSideProps = protectPage(adminEditorAccess(getSSProps));

export default AddCourse;
