const homeStyle = {
  landingView: {
    height: 'calc(100vh - 65px)',
    '&::after': {
      content: '""',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backgroundImage: `linear-gradient(to top,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.8) 100%)`,
      width: '100vw',
      height: 'calc(100vh - 65px)',
      right: '0',
      top: '65px',
    },
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
    fontSize: '3em',
    width: '90vw',
    // gradient text color
    backgroundImage: 'linear-gradient(33deg, #3949cf, #890980, #ffffff)',
    backgroundColor: '#F8E',

    backgroundSize: '100%',
    backgroundRepeat: 'repeat',

    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    '-moz-background-clip': 'text',
    '-moz-text-fill-color': 'transparent',
  },
  gradientText: {
    backgroundImage: 'linear-gradient(45deg, #f3ec78, #af4261)',
    backgroundColor: '#F8E',

    backgroundSize: '100%',
    backgroundRepeat: 'repeat',

    '-webkit-background-clip': 'text',
    'webkit-text-fill-color': 'transparent',
    '-moz-background-clip': 'text',
    '-moz-text-fill-color': 'transparent',
  },
};

export {
  homeStyle,
};
