import React from 'react';
import ss from './index.scss';

function UserPage(props) {
  const { children = null } = props;
  return (
    <div className={ss.root}>
      <div>这是UserPage</div>
      {children}
    </div>
  );
}

export default UserPage;
