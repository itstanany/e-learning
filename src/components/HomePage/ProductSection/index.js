import React from 'react';
import {
  makeStyles,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Chat, Fingerprint, VerifiedUser } from '@material-ui/icons';
import { InfoItem } from '../../UI/InfoItem';
import { productSectionStyles } from './styles';

const useStyles = makeStyles(productSectionStyles);

function ProductSection() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.product__title}>
        <h1>
          OUR PLATFORM
        </h1>
      </div>
      <Grid
        container
        justifyContent="center"
        alignItems="start"
        alignContent="start"
      >
        <Grid
          item
          xs={12}
          sm={3}
        >
          <InfoItem
            icon={<Chat />}
            title="Support 24/7"
            description={
              `Our helpful instructors are available for 24 hour per day, 7 days per week.
            They are here to help you either with text messages or video calls`
            }
            color="info"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
        >
          <InfoItem
            icon={<VerifiedUser />}
            title="Distinguished Instructors"
            description={
              `Our astonishing instructors are the best in the industry
                they have taught Harvard, MIT, and NewYork uni graduates. You turn is the next
              `
            }
            color="success"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
        >
          <InfoItem
            icon={<Fingerprint />}
            title="Insights &amp; Follow Up"
            description={`
              Tailored Insights using AI.
              Follow up system to track your progress.
            `}
            color="danger"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export {
  ProductSection,
};
