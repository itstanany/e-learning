import React, {
  useEffect, useState,
} from 'react';
import Link from 'next/link';
// @material-ui/core components
import {
  List,
  Button,
  ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import {
  School,
  Dashboard,
  YouTube,
} from '@material-ui/icons';
// styles object
import { headerLinksStyle } from './style/headerLinksStyle';
import { auth } from '../../firebase/client';
import AuthNavItem from './AuthNavItem/index.js';

const useStyles = makeStyles(headerLinksStyle);

const HeaderLinks = ({ handleDrawerToggle }) => {
  const classes = useStyles();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribeFromAuth();
  }, []);

  return (
    <List
      className={classes.list}
    >
      {/* All courses page */}
      <ListItem
        className={classes.listItem}
      >
        <Link
          href="/courses"
          passHref
        >
          <Button
            className={classes.navLink}
            onClick={handleDrawerToggle}
          >
            <School className={classes.icons} />
            All Courses
          </Button>
        </Link>
      </ListItem>
      {/* Dashboard */}
      <ListItem className={classes.listItem}>
        <Link
          href="/user"
          passHref
        >
          <Button
            className={classes.navLink}
            onClick={handleDrawerToggle}
          >
            <Dashboard className={classes.icons} />
            Dashboard
          </Button>
        </Link>
      </ListItem>
      {/* YouTube channel */}
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.youtube.com/c/%D9%82%D9%86%D8%A7%D8%A9%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D9%84%D9%84%D9%85%D9%88%D8%A7%D8%AF%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9/playlists"
          target="_blank"
          className={classes.navLink}
          onClick={handleDrawerToggle}
        >
          <YouTube className={classes.icons} />
          Watch on YT
        </Button>
      </ListItem>
      <AuthNavItem
        handleDrawerToggle={handleDrawerToggle}
        user={user}
      />
    </List>
  );
};

export default HeaderLinks;

export {
  HeaderLinks,
};
