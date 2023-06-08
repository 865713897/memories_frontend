import React, { useEffect, useRef, useState } from 'react';
import { useThis } from '@/hooks';
import Item from './item';
import WaterfallContext from './waterfallContext';
import './index.scss';

interface wfProps {
  dataSource: unknown[];
  cols?: number; // 列数
  gutter?: [number, number]; // item间隔
  width?: number; // 容器宽度
  children: (item: any, index: number) => React.ReactElement;
}

function WaterfallLayout(props: wfProps) {
  const { dataSource = [], cols = 2, gutter = [8, 8], width, children } = props;
  const windowWidth = width || window.innerWidth;
  const [columns, setColumns] = useState<any[][]>([]);
  /* 记录children高度 */
  const [heightArr, setHeightArr] = useState([0]);

  // const _this = useThis({
  //   // heightArr: [],
  // });

  useEffect(() => {
    window.console.log(heightArr, 'heightArr');
  }, [heightArr]);

  useEffect(() => {
    initData();
  }, [dataSource, gutter, cols]);
  // 处理数据
  const initData = () => {
    const newColumns = new Array(cols).fill([]);
    const columnsMaxHeight = new Array(cols).fill(0);
    dataSource.forEach((item: any, index: number) => {
      /* 找出当前最矮的一列，插入dataSource的Item */
      const minHeight = Math.min(...columnsMaxHeight);
      const minColumnIndex = columnsMaxHeight.findIndex((height) => height === minHeight);
      newColumns[minColumnIndex].push(item);
      // columnsMaxHeight[minColumnIndex] += heightArr[index] + (gutter[1] || 0);
    });
    setColumns(newColumns);
  };
  return (
    <div className="wfl-root">
      <WaterfallContext.Provider value={{}}>
        {columns.map((columnItems) => (
          <div className="wfl-column">
            {columnItems.map((columnItem, columnItemIndex) => (
              <Item>{children(columnItem, columnItemIndex)}</Item>
            ))}
          </div>
        ))}
      </WaterfallContext.Provider>
    </div>
  );
}

export default WaterfallLayout;
