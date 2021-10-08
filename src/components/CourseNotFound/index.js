import Link from 'next/link';

function CourseNotFound() {
  return (
    <div>
      The requested course can not be found right now,
      <br />
      What about exploring out course Catalog
      &nbsp;
      <Link
        href="/courses"
      >
        <a>
          HERE
        </a>
      </Link>
    </div>
  );
}

export default CourseNotFound;

export {
  CourseNotFound,
};
