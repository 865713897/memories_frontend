import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import NavBar from '@/components/NavBar';
import ss from './index.scss';

function HomePage() {
  const [x, setX] = useState(0);
  // 移动target
  function moveTarget(targetX, duration) {
    let start = null;
    function moveElement(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const position = targetX * (progress / duration);
      setX(position);
      if (progress < duration) {
        requestAnimationFrame(moveElement);
      }
    }
    requestAnimationFrame(moveElement);
  }
  useEffect(() => {}, []);

  return (
    <div className={ss.root}>
      <div className={ss.container}>
        <div className={ss.target} style={{ transform: `translateX(${x}px)` }} />
        <div className={ss.btns}>
          <Button onClick={() => moveTarget(1000, 1000)}>移动</Button>
        </div>
      </div>
    </div>
  );
}

export default NavBar(HomePage);
