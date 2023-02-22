import React from 'react';
import NavBar from '@/components/NavBar';
import ss from './index.scss';

function PersonalInfoPage() {
  return (
    <div className={ss.root}>
      <div>这是PersonalInfoPage</div>
    </div>
  );
}

export default NavBar(PersonalInfoPage);
