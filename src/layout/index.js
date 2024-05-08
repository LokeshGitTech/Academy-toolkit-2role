// BaseLayout.js

import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const BaseLayout = ({ children }) => {
  
  return (
    <div>
      {children || <Outlet />}
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
