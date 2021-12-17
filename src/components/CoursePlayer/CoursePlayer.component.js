/**
 * Course Player presentational component
 */
import PropTypes from 'prop-types';
import { CastForEducationOutlined } from '@material-ui/icons';
import {
  Grid, ListSubheader, ListItem, ListItemIcon, ListItemText,
  List,
} from '@material-ui/core';
import {
  makeStyles,
} from '@material-ui/core/styles';
import {
  coursePropTypes,
} from '../../utils/client/propTypes';

// styles
const useStyles = makeStyles((theme) => ({
  listGrid: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 200,
    },
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '70vh',
  },
  resourcesPlayerGrid: {
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  subheaderStyle: {
    color: '#fafafa',
    background: '#0e0e0e',
  },
}));

function CoursePlayerComponent({
  course,
  lectures,
  resources,
  handleListItemClick,
}) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid
        xs={12}
        md={4}
        className={classes.listGrid}
        item
      >
        {/* Lectures List */}
        <div className={classes.listRoot}>
          <List
            component="nav"
            aria-label="Lectures List"
            subheader={
              (
                <ListSubheader
                  component="div"
                  color="primary"
                  className={classes.subheaderStyle}
                >
                  {
                    course.title
                  }
                </ListSubheader>
              )
            }
          >
            {
              lectures?.map((lecture) => (
                // escape lectures with no title
                lecture?.title
                  ? (
                    <ListItem
                      button
                      selected={lecture?.selected}
                      onClick={(e) => handleListItemClick(e, { lectureId: lecture.id })}
                      key={lecture?.id}
                    >
                      <ListItemIcon>
                        <CastForEducationOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Lecture <${lecture.order}> ${lecture?.title}`}
                      />
                    </ListItem>
                  )
                  : null
              ))
            }
          </List>
        </div>
      </Grid>
      {/* Resource area */}
      <Grid
        xs={12}
        md={8}
        className={classes.resourcesPlayerGrid}
        item
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          {
            resources
          }
        </Grid>
      </Grid>
    </Grid>

  );
}

CoursePlayerComponent.defaultProps = {
  course: {},
  lectures: [],
};

CoursePlayerComponent.propTypes = {
  course: coursePropTypes,
  lectures: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  })),
};

export {
  CoursePlayerComponent,
};
