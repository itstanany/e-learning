import PropTypes from 'prop-types';

const lecturePropTypes = PropTypes.shape({
  description: PropTypes.string,
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}).isRequired;

export {
  lecturePropTypes,
};
