import React from 'react';
import Waterfall from '@/components/Waterfall';
import { list } from './const';
import './index.scss';

function WaterfallPage() {
  return (
    <div className="wfp-root">
      <Waterfall dataSource={list} />
    </div>
  );
}

export default WaterfallPage;
