const headerStyles = {
  container: {
    minHeight: '50px',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'nowrap',
    padding: '10px 0',
  },
  appResponsive: {
    margin: '20px 10px',
  },
  drawerPaper: {
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: 260,
    boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
  },
  brand: {
    maxWidth: '200px',
    maxHeight: '46px',
    textDecoration: 'none',
    overflow: 'hidden',
    color: 'inherit',
    cursor: 'pointer',
  },
};

export default headerStyles;

export {
  headerStyles,
};
