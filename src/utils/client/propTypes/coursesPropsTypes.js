import PropTypes from 'prop-types';
import { coursePropTypes } from './coursePropTypes';

const coursesPropTypes = PropTypes.arrayOf(coursePropTypes).isRequired;

export {
  coursesPropTypes,
};
