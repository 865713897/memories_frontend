import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import MyPromise from '@/utils/promise';
import './index.scss';

function HomePage() {
  useEffect(() => {
    const p = new MyPromise((reslove) => {
      setTimeout(() => {
        reslove(123);
      });
    });
    p.then(
      (res) => {
        window.console.log(res, 'res');
      },
      (error) => {
        window.console.log(error, 'error');
      },
    );
  }, []);

  return <div className="home-root">hhhh</div>;
}

export default NavBar(HomePage);
