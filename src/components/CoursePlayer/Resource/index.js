/**
 * Render lecture resource based on its type
 * currently implemented types are Videos and text
 */
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { NoResourceFound } from '../NoResourceFound';

const useStyles = makeStyles(() => ({
  iframeContainer: {
    // preserve aspect ratio
    padding: '56.25% 0 0 0',
    position: 'relative',
    width: '100%',
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
}));

function Resource({ resources }) {
  const classes = useStyles();
  if (!resources) return null;

  return (
    resources?.length > 0
      ? (
        // render resources
        resources?.map((res) => {
          // escape sources with empty or null source link
          if (!(res.src)) return null;
          switch (res.type) {
            case 'video':
              return (
                <div
                  key={res.src}
                  className={classes.iframeContainer}
                >
                  <iframe
                    src={
                      `https://www.youtube.com/embed/${res.src}`
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                    title={
                      `Video ${res?.src}`
                    }
                    className={classes.iframe}
                  />
                </div>
              );

            case 'text':
              return (
                <p key={res.src}>
                  {
                    res.src
                  }
                </p>
              );

            default:
              return null;
          }
        })
      )
      // no resources provided
      : <NoResourceFound />
  );
}

Resource.defaultProps = {
  resources: [],
};

Resource.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string,
    }),
  ),
};

export default Resource;

export {
  Resource,
};
