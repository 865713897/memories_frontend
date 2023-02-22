import React from 'react';
import { Input } from 'antd';
import ss from './index.scss';

function MInput(props) {
  const { type, ...rest } = props;
  const renderContent = () => {
    switch (type) {
      case 'password':
        return <Input.Password bordered={false} {...rest} />;
      case 'normal':
        return <Input bordered={false} {...rest} />;
      default:
        return null;
    }
  };
  return (
    <div className={ss.root}>
      {renderContent()}
      <div className={ss.line} />
    </div>
  );
}

export default MInput;
