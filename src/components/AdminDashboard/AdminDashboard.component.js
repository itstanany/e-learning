/**
 * Admin Dashboard Presentational component
 */

import Link from 'next/link';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { Add, DeleteTwoTone, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  table: {
    marginTop: '15px',
    '& th, & td': {
      border: '1px solid rgba(224, 224, 224, 1)',
      borderRadius: '10px',
    },
  },
  actionsCell: {
    width: '15%',
  },
}));

function AdminDashboardComponent({
  courses = [],
  deleteHandler = () => ({}),
}) {
  const classes = useStyles();
  return (
    <>
      <Link
        href="/admin/courses/add"
        passHref
      >
        <Button
          variant="contained"
          color="primary"
        >
          Add Course
          &nbsp;
          <Add />
        </Button>
      </Link>

      <div
        className={classes.table}
      >
        <Table
          aria-label="Courses Table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Course Title</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              courses?.map((course, index) => (
                <TableRow
                  key={course.id}
                >
                  <TableCell scope="row">
                    {
                      course.title
                    }
                  </TableCell>
                  <TableCell
                    className={classes.actionsCell}
                  >
                    <Button
                      color="secondary"
                      onClick={
                        () => deleteHandler({ id: course.id, index })
                      }
                      disabled={course.delDisabled}
                    >
                      <DeleteTwoTone />
                    </Button>
                    <Link
                      href={`/admin/courses/edit/${course?.id}`}
                      passHref
                    >
                      <Button
                        disabled={course.editDisabled}
                      >
                        <Edit />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default AdminDashboardComponent;

export {
  AdminDashboardComponent,
};
