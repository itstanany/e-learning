/*
  * Presentational component to render a course card
*/

import Link from 'next/link';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardMedia, Typography, CardContent, Button,
  CardActions,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    // make all cards the same height of tallest card of the row and fill width of container
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
  },
  mediaStyle: {
    display: 'block',
    maxWidth: '270px',
    maxHeight: '180px',
    width: '100%',
    height: 'auto',
  },
  cardActionArea: {
    flexGrow: 3,
  },
  cardMedia: {
    objectFit: 'fill',
  },
});

function CourseCard({ course, subscribed }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link
        href={
          subscribed
            ? `/courses/${course.id}/${course.slug}/player`
            : `/courses/${course.id}/${course.slug}/enroll`
        }
      >

        <CardActionArea className={classes.cardActionArea}>
          {/* make course info occupies all remaining height */}
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            style={{ height: '100%' }}
          >
            <Grid item xs={12}>
              <CardMedia
                component="img"
                alt={course.title}
                height="140"
                width="140"
                image={course.thumbnail}
                title={course.title}
                className={classes.cardMedia}
              />
            </Grid>
            <Grid item xs={12}>
              <CardContent>
                {/* Course title */}
                <Typography gutterBottom variant="h5" component="h2">
                  {
                    course.title
                  }
                </Typography>
                {/* Course Author */}
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  noWrap
                  gutterBottom
                >
                  {
                    course.author
                  }
                </Typography>
                {/* Course description */}
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  noWrap
                >
                  {
                    course.description
                  }
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>

      </Link>
      {/* Card controller */}
      <CardActions>
        <Link
          href={`/courses/${course.id}/${course.slug}`}
          passHref
        >
          <Button
            size="small"
            color="primary"
          >
            Details
          </Button>
        </Link>
        <Link
          href={
            subscribed
              ? `/courses/${course.id}/${course.slug}/player`
              : `/courses/${course.id}/${course.slug}/enroll`
          }
          passHref
        >
          <Button size="small" color="primary">
            {
              subscribed
                ? 'Watch'
                : `Enroll (${course.price}) L.E`
            }
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default CourseCard;

export {
  CourseCard,
};
CourseCard.defaultProps = {
  subscribed: false,
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    // lectures: PropTypes.arrayOf(PropTypes.shape({
    //   description: PropTypes.string,
    //   order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    //   source: PropTypes.string.isRequired,
    //   title: PropTypes.string.isRequired,
    // })),
  }).isRequired,
  subscribed: PropTypes.bool,
};
