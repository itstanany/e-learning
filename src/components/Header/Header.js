// todo fix the disruption effect of opening and closing select menu in add course form

/* eslint-disable react/require-default-props */
import React/* , { useEffect, useState }  */ from 'react';
import Link from 'next/link';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
// @material-ui/icons
import { Menu } from '@material-ui/icons';
// core components
import { Container } from '@material-ui/core';
import { headerStyles } from './style';
import { HeaderLinks } from './HeaderLinks.js';

const useStyles = makeStyles(headerStyles);

const Header = ({
  brand,
}) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileOpen((currentMobileOpen) => !currentMobileOpen);
  };

  return (
    <AppBar>
      {/*
        * This tool bar renders in order:
        * Brand Component
        * Left links component (mdUp)
        * Right links from (mdUp)
        * Menu icon (smDown) as a toggler button for opening a drawer of both right and left links
      */}
      <Container>
        <Toolbar className={classes.container}>
          {/* brand */}
          <Link
            href="/"
            passHref
          >
            <a
              className={classes.brand}
            >
              {
                brand
              }
            </a>

          </Link>
          {/* header links, appears on mdUp */}
          <Hidden smDown implementation="css">
            <HeaderLinks
              handleDrawerToggle={handleDrawerToggle}
            />
          </Hidden>

          {/* Menu Icon as a toggler button for Menu Nav on smDown screen */}
          <Hidden
            mdUp
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>

      {
        /*
          * Drawer of header links components (smDown)
        */
      }
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            <HeaderLinks
              handleDrawerToggle={handleDrawerToggle}
            />
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  brand: PropTypes.node,
};
