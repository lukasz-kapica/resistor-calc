import React from 'react';
import PropTypes from 'prop-types';

export const TH = ({full, abbr}) => (
  <th>
    <span className='d-none d-sm-inline'>{full}</span>
    <span className='d-sm-none'>{abbr}</span>
  </th>
);

TH.propTypes = {
  full: PropTypes.string.isRequired,
  abbr: PropTypes.string.isRequired,
};
