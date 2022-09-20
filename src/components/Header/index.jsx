import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import ss from './index.module.scss';

function Header(props) {
  const { title = '' } = props;
  return (
    <div className={ss.root}>
      <div className={ss.left}>
        <LeftOutlined className={ss.back} />
      </div>
      <div className={ss.center}>{title}</div>
      <div className={ss.right}>jjj</div>
    </div>
  );
}

export default Header;
