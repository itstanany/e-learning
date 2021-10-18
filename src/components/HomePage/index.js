import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { homeStyle } from './styles';
import { ProductSection } from './ProductSection';

const useStyles = makeStyles(homeStyle);

function HomePage() {
  const classes = useStyles();

  return (
    <>
      <div
        className={
          classes.landingView
        }
      >
        <img
          src="/imgs/landing.jpg"
          alt="LearningX"
          className={classes.landingView__img}
        />
        <div
          className={classes.landingView__content}
        >
          LearningX is the most trusted e-learning platform
        </div>
      </div>
      <ProductSection />
    </>
  );
}

export default HomePage;
