import React from 'react';
import NavBar from '@/components/NavBar';
import ss from './index.scss';

function HomePage() {
  // useEffect(() => {
  //   // 建立web socket连接
  //   const ws = new WebSocket('ws://localhost:8003');
  //   // 连接成功
  //   ws.onopen = () => {
  //     window.console.log('连接成功');
  //   };
  //   ws.onmessage = (msg) => {
  //     window.console.log(msg);
  //   };
  //   // 连接关闭
  //   ws.onclose = () => {
  //     window.console.log('连接关闭');
  //   };
  //   // 连接异常
  //   ws.onerror = () => {
  //     window.console.log('连接异常');
  //   };
  // }, []);
  return (
    <div className={ss.root}>
      <div>这是HomePage</div>
    </div>
  );
}

export default NavBar(HomePage);
