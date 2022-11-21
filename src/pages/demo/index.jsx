import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from 'antd';
import ss from './index.module.scss';

function Demo() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    flushSync(() => {
      setCount(count + 1);
    });
    window.console.log(count);
  };
  return (
    <div className={ss.root}>
      <div>{count}</div>
      <Button onClick={handleClick}>点击</Button>
    </div>
  );
}

export default Demo;
