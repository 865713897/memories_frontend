import React from 'react';
import NavBar from '@/components/NavBar';
import ss from './index.scss';

function HomePage() {
  return (
    <div className={ss.root}>
      <div>这是HomePage</div>
    </div>
  );
}

export default NavBar(HomePage);
