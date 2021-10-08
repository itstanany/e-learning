import PropTypes from 'prop-types';

const coursePropTypes = PropTypes.shape({
  author: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
});

export {
  coursePropTypes,
};
