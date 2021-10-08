/**
 * Course Details Presentational component
 */
import propTypes from 'prop-types';
import Link from 'next/link';
import {
  Button,
  CardMedia, Grid, List, ListItem, ListItemIcon, ListItemText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CastForEducation } from '@material-ui/icons';
import { coursePropTypes, lecturePropTypes } from '../../utils/client/propTypes';

const useStyles = makeStyles({
  lectures: {
    marginTop: '15px',
  },
  btn: {
    // action btn at end of list item and center vertically of title height
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
});

function CourseDetailsComponent({
  course,
  lectures,
  subscribed,
}) {
  const classes = useStyles();

  return (
    <>
      {/* Course Info */}
      <Grid container spacing={2}>

        {/* Course Thumbnail */}
        <Grid
          item
          xs={12}
          sm={3}
        >
          <CardMedia
            component="img"
            alt={course.title}
            image={course.thumbnail}
            title={course.title}
          />
        </Grid>

        {/* Course Details */}
        <Grid
          item
          xs={12}
          sm={9}
        >
          {/* Course Title */}
          <Typography
            variant="h3"
            component="h2"
          >
            {
              course?.title
            }
          </Typography>
          {/* Course Author */}
          <Typography
            className={classes.pos}
            color="textSecondary"
            gutterBottom
          >
            {
              course?.author
            }
          </Typography>
          {/* course price */}
          <Typography
            className={classes.pos}
            color="textSecondary"
            gutterBottom
          >
            {
              course?.price
            }
            &nbsp;
            L.E
          </Typography>
          {/* Course Description */}
          <Typography
            variant="body2"
            component="p"
          >
            {
              course?.description
            }
          </Typography>
        </Grid>
      </Grid>

      {/* Lectures List */}
      <Grid
        container
        justifyContent="center"
        className={classes.lectures}
      >
        {/* Header */}
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            justifyContent="center"
          >
            <Typography
              variant="h3"
              component="h6"
            >
              Lectures
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
          md={6}
        >
          <List>
            {
              lectures?.map((lect) => (
                // Lecture Info
                <ListItem
                  key={lect?.id}
                >
                  <Grid
                    justify="space-between"
                    container
                    wrap="wrap"
                  >
                    <Grid item xs={9}>
                      <Grid
                        container
                        alignItems="center"
                        alignContent="center"
                        justifyContent="flex-start"
                        direction="row"
                        wrap="nowrap"

                      >
                        {/* lecture Icon */}
                        <ListItemIcon>
                          <CastForEducation />
                        </ListItemIcon>
                        {/* Lecture title */}
                        <ListItemText
                          primary={`Lecture ${lect?.order} - ${lect?.title}`}
                        />
                      </Grid>

                    </Grid>
                    {
                      /*
                        * Action button
                        * Enroll action for unenrolled student
                        * Watch for enrolled student
                      */
                    }
                    <Grid
                      item
                      xs={3}
                    >

                      <div
                        className={classes.btn}
                      >
                        <Link
                          href={
                            subscribed
                              ? `/courses/${course.id}/${course.slug}/player?lecture=${lect.id}`
                              : `/courses/${course.id}/${course.slug}/enroll`
                          }
                          passHref
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                          >
                            {
                              subscribed
                                ? 'Watch'
                                : 'Enroll'
                            }
                          </Button>
                        </Link>

                      </div>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            }
          </List>
        </Grid>
      </Grid>
    </>
  );
}

// component default props
CourseDetailsComponent.defaultProps = {
  course: {},
  lectures: [],
  subscribed: false,
};
// component prop types
CourseDetailsComponent.propTypes = {
  course: coursePropTypes,
  lectures: propTypes.arrayOf(lecturePropTypes),
  subscribed: propTypes.bool,
};

export {
  CourseDetailsComponent,
};
