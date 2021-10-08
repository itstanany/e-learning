/**
 * Edit course page
 */
import { useRouter } from 'next/router';
import { CourseEditForm } from '../../../../components/CourseForm';
import { adminEditorAccess, protectPage } from '../../../../utils/server';

function EditCoursePage() {
  const router = useRouter();
  return (
    <CourseEditForm
      cId={router?.query?.cid}
    />
  );
}

export default EditCoursePage;

const getSSProps = () => ({ props: {} });

export const getServerSideProps = protectPage(adminEditorAccess(getSSProps));
