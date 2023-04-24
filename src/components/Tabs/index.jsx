import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import ss from './index.scss';

function Tabs(props) {
  const { items, onChange = () => {} } = props;
  // tabRef
  const tabsRef = useRef(null);
  // contentRef
  const contentRef = useRef(null);
  // 当前tab
  const [current, setCurrent] = useState('');
  // 当前下划线位置
  const [linePos, setLinePos] = useState({ tabX: 0, width: 0 });
  useEffect(() => {
    setCurrent(items[0].value);
    setCurrentLinePos(0);
  }, []);
  // 设置选中tab对应的下划线位置
  function setCurrentLinePos(index) {
    const { childNodes } = tabsRef.current;
    const currentNode = childNodes[index];
    const tabX = currentNode.offsetLeft;
    const width = currentNode.offsetWidth;
    setLinePos({ tabX, width });
  }
  // 点击tab
  function handleTab(key, index) {
    if (key === current) return;
    setCurrent(key);
    setCurrentLinePos(index);
    onChange(key);
  }
  return (
    <div className={ss.root}>
      <div className={ss.tabs} ref={tabsRef}>
        {items.map(({ label, value }, index) => (
          <div
            className={cn(ss.tabItem, { [ss.active]: current === value })}
            key={`tab-${value}`}
            onClick={() => handleTab(value, index)}
          >
            {label}
          </div>
        ))}
        <div className={ss.lineBox} style={{ width: linePos.width, transform: `translateX(${linePos.tabX}px)` }}>
          <div className={ss.line} />
        </div>
      </div>
      <div className={ss.content} ref={contentRef}>
        <div className={ss.scrollBox}>
          {items.map(({ component, value }) => {
            if (!component || current !== value) return null;
            return (
              <div key={`com-${value}`} className={cn(ss.comItem, { [ss.hidden]: current !== value })}>
                {component}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tabs;
