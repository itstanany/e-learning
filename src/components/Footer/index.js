/**
 * Footer component
 */
import { Grid, List, ListItem } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { footerStyle } from './style';

// footer links objects
const footerLinks = [
  {
    name: 'About',
    path: '#',
  },
  {
    name: 'FAQ',
    path: '#',
  },
  {
    name: 'Terms & Conditions',
    path: '#',
  },
  {
    name: 'Admin',
    path: '/admin',
  },
  {
    name: 'Source Code',
    path: 'https://github.com/ahmdGeek',
  },
];

// stylesheet linking
const useStyles = makeStyles(footerStyle);

function Footer() {
  // classes in linked stylesheets
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      wrap
      alignContent="center"
    >
      {/* left links */}
      <Grid
        item
      >
        <Grid
          container
          justifyContent="flex-start"
          alignContent="center"
          alignItems="center"
          wrap
        >
          <List className={classes.list}>
            {
              footerLinks.map((lnk) => (
                <ListItem
                  className={classes.inlineBlock}
                  key={lnk.name}
                >
                  <a
                    href={lnk.path}
                    className={classes.block}
                    rel="noreferrer"
                  >
                    {
                      lnk.name
                    }
                  </a>
                </ListItem>
              ))
            }
          </List>
        </Grid>
      </Grid>

      {/* right copyright */}
      <Grid
        item
        className={classes.right}
      >
        &copy;
        {
          1900 + new Date().getYear()
        }
        ,
        made with
        &nbsp;
        <Favorite
          className={classes.icon}
        />
        &nbsp;
        by
        <a
          href="https://www.linkedin.com/in/ahmdgeek/"
          target="_blank"
          rel="noreferrer"
          className={classes.a}
        >
          &nbsp;
          ahmdGeek
        </a>
        &nbsp;
        for a better web.
      </Grid>
    </Grid>
  );
}

export default Footer;

export {
  Footer,
};
