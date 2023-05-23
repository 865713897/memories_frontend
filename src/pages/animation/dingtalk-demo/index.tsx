import React from 'react';
import './index.scss';

function DingTalkDemo() {
  return (
    <div className="dt-root">
      <div className="dt-header">this is header</div>
      <div className="dt-animation">
        <div className="dt-animation__container">
          <div className="dt-animation__cardBg">
            <div className="dt-animation__cardItem" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DingTalkDemo;
