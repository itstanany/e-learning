const homeStyle = {
  landingView: {
    height: 'calc(100vh - 65px)',
  },
  landingView__img: {
    position: 'absolute',
    width: '100vw',
    height: 'calc(100vh - 65px)',
    right: '0', // remove horizontal scrollbar
    top: '65px',
  },
  landingView__content: {
    position: 'absolute',
    bottom: '50%',
    right: '50%',
    transform: 'translate(50%, 50%)',
    textAlign: 'center',
    color: '#F8E',
    zIndex: '500',
    fontWeight: '700',
    fontSize: '2em',
    width: '90vw',
  },
};

export {
  homeStyle,
};
