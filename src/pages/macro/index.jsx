import React from 'react';
import Tabs from '@/components/Tabs';
import CFComponent from './components/CF';
import PUBGComponent from './components/PUBG';
import ss from './index.scss';

function CreateMacro() {
  // tab变化
  const items = [
    { label: '穿越火线', value: 'cf', component: <CFComponent /> },
    { label: '绝地求生', value: 'pubg', component: <PUBGComponent /> },
  ];
  return (
    <div className={ss.root}>
      <Tabs items={items} />
      {}
    </div>
  );
}

export default CreateMacro;
