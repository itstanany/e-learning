import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { infoItemStyles } from './styles';

const useStyles = makeStyles(infoItemStyles);

function InfoItem({
  icon,
  title,
  description,
  color = 'primary',
}) {
  const classes = useStyles();
  return (
    <div
      className={classes.item}
    >
      <div
        className={`${classes.item__iconWrapper} ${classes[color]}`}
      >
        {
          icon
        }
      </div>
      <h2
        className={classes.item__title}
      >
        {
          title
        }
      </h2>
      <p
        className={classes.item__description}
      >
        {
          description
        }
      </p>
    </div>
  );
}

export {
  InfoItem,
};
