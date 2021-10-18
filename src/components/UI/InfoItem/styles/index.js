const infoItemStyles = {
  item: {
    display: 'flex',
    flexFlow: 'column nowrap',
    textAlign: 'center',
    padding: '7px',
    justifyContent: 'flex-start',
    margin: '0  15px',
  },
  item__iconWrapper: {
    '& svg': {
      width: '61px',
      height: '61px',
      fill: 'currentColor',
    },
  },
  item__title: {
    color: '#3C4858',
    margin: '1.75rem 0 0.875rem',
    fontWeight: '700',
    textDecoration: 'none',
  },
  item__description: {
    color: ' #999999',
    overflow: 'hidden',
    fontSize: '17px',
    letterSpacing: '2px',
    lineHeight: '1.25em',
    marginTop: '0',
  },
  info: {
    color: '#00ACC1',
  },
  danger: {
    color: '#F44336',
  },
  primary: {
    color: '#9C27B0',
  },
  success: {
    color: '#4CAF50',
  },
};

export {
  infoItemStyles,
};
