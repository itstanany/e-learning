import { makeStyles } from '@material-ui/core/styles';
import { School } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Header from '../Header/Header.js';
import { Footer } from '../Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  footer: {
    // padding: theme.spacing(0.1, 0.1),
    marginTop: 'auto',
    backgroundColor: (theme.palette.type === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[800]),
  },
}));

export function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header
          brand={(
            <School
              fontSize="large"
            />
          )}
        />
      </div>

      <Container
        component="main"
        className={classes.main}
        maxWidth="lg"
      >
        {
          children
        }
      </Container>

      <footer
        className={classes.footer}
      >
        <Container
          style={{ paddingLeft: 0 }}
        >
          <Footer />
        </Container>
      </footer>
    </div>
  );
}
