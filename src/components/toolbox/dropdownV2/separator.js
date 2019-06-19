import React from 'react';
import PropTypes from 'prop-types';
import styles from './dropdownV2.css';

const Separator = ({ className }) =>
  <span className={`${styles.separator} ${className}`} />;

Separator.displayName = 'Dropdown.Separator';

Separator.propTypes = {
  className: PropTypes.string,
};

Separator.defaultProps = {
  className: '',
};

export default Separator;
