import React, { useEffect, useRef, useState } from 'react';
import { uuid } from '@/utils/utils';
import { efficientCode } from './const';
import './index.scss';

type directionType = 'up' | 'down' | 'left' | 'right';

type valueType = [number, number, matrixItemType];

interface matrixItemType {
  value: number;
  key?: string;
  i?: number;
  j?: number;
}

function NumberSlider() {
  const matrixRef = useRef<matrixItemType[][]>([]);
  const [matrix, setMatrix] = useState<matrixItemType[][]>([]);
  const [shows, setShows] = useState<any>([]);
  matrixRef.current = matrix;
  useEffect(() => {
    newGame();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  // 获取有效值
  const getShows = (_matrix) => {
    const newShows: any = [];
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (_matrix[i][j].key) {
          newShows.push({ ..._matrix[i][j], i, j });
        }
      }
    }
    setShows(newShows);
  };
  // 获取下一个坐标
  const next = {
    up: (i: number, j: number) => [i + 1, j],
    down: (i: number, j: number) => [i - 1, j],
    left: (i: number, j: number) => [i, j + 1],
    right: (i: number, j: number) => [i, j - 1],
  };
  // 是否在数组内并且存在值
  const inRange = (i: number, j: number, _matrix: matrixItemType[][]) => {
    return _matrix[i] && _matrix[i][j]?.value !== undefined;
  };
  // 监听键盘
  const onKeyDown = (event: KeyboardEvent) => {
    const { code } = event || { code: '' };
    if (efficientCode.includes(code)) {
      const direction = code.replace('Arrow', '').toLowerCase() as directionType;
      move(direction);
    }
  };
  // 找到下一个
  const getNextNotZeroValue = (
    i: number,
    j: number,
    direction: directionType,
    _matrix: matrixItemType[][],
  ): valueType => {
    let [nextI, nextJ] = next[direction](i, j);
    while (inRange(nextI, nextJ, _matrix)) {
      const nextValue = _matrix[nextI][nextJ];
      if (nextValue.value !== 0) {
        return [nextI, nextJ, nextValue];
      } else {
        [nextI, nextJ] = next[direction](nextI, nextJ);
      }
    }
    return [-1, -1, { value: 0 }];
  };
  // 计算
  const calculate = (i: number, j: number, direction: directionType, _matrix: matrixItemType[][]) => {
    if (!inRange(i, j, _matrix)) return;
    // 计算当前位置值
    const [nextI, nextJ, nextValue] = getNextNotZeroValue(i, j, direction, _matrix);
    if (nextI === -1) return;
    const newMatrix = [..._matrix];
    if (newMatrix[i][j].value === 0) {
      newMatrix[nextI][nextJ] = { value: 0 };
      newMatrix[i][j] = nextValue;
      calculate(i, j, direction, newMatrix);
    } else if (newMatrix[i][j].value === nextValue.value) {
      newMatrix[i][j].value *= 2;
      newMatrix[nextI][nextJ] = { key: uuid(16, 16), value: 0 };
    }
    const [_i, _j] = next[direction](i, j);
    calculate(_i, _j, direction, newMatrix);
  };
  // 添加数字
  // const addNumber = (_matrix: matrixItemType[][]) => {
  //   const rowLen = matrixRef.current.length;
  //   const colLen = matrixRef.current[0].length;
  //   const newMatrix = [..._matrix];
  //   let count = 0;
  //   while (true) {
  //     if (count === rowLen * colLen) {
  //       break;
  //     }
  //     const i = Math.floor(Math.random() * rowLen);
  //     const j = Math.floor(Math.random() * colLen);
  //     count += 1;
  //     if (newMatrix[i][j].value === 0) {
  //       newMatrix[i][j] = { key: uuid(16, 16), value: 2 };

  //       break;
  //     }
  //   }
  // };
  // 移动
  const move = (direction: directionType) => {
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        if (matrixRef.current[i][j].key && matrixRef.current[i][j].value === 0) {
          matrixRef.current[i][j] = { value: 0 };
        }
      }
    }
    const rowLen = matrixRef.current.length;
    const colLen = matrixRef.current[0].length;
    switch (direction) {
      case 'up':
        for (let j = 0; j < colLen; j += 1) {
          calculate(0, j, direction, matrixRef.current);
        }
        break;
      case 'down':
        for (let j = 0; j < colLen; j += 1) {
          calculate(rowLen - 1, j, direction, matrixRef.current);
        }
        break;
      case 'left':
        for (let i = 0; i < rowLen; i += 1) {
          calculate(i, 0, direction, matrixRef.current);
        }
        break;
      case 'right':
        for (let i = 0; i < rowLen; i += 1) {
          calculate(i, colLen - 1, direction, matrixRef.current);
        }
        break;
      default:
        break;
    }
    // addNumber(matrixRef.current);
    getShows(matrixRef.current);
    setMatrix([...matrixRef.current]);
  };
  // 计算偏移
  const calculateOffset = (i: number, j: number) => {
    return [j * 116 + 16, i * 116 + 16];
  };
  // 新游戏
  const newGame = () => {
    const newFlatMatrix = new Array(16).fill({ value: 0 });
    // newFlatMatrix[Math.floor(Math.random() * 7)] = { key: uuid(16, 16), value: 2 };
    // newFlatMatrix[Math.floor(Math.random() * 8 + 8)] = { key: uuid(16, 16), value: 2 };
    newFlatMatrix[3] = { key: uuid(16, 16), value: 2 };
    newFlatMatrix[4] = { key: uuid(16, 16), value: 2 };
    const newMatrix: matrixItemType[][] = [];
    for (let i = 0; i < 16; i += 4) {
      const sliceItem = newFlatMatrix.slice(i, i + 4);
      newMatrix.push(sliceItem);
    }
    getShows(newMatrix);
    setMatrix(newMatrix);
  };
  return (
    <div className="ns-root">
      <div className="ns-container">
        <div className="ns-header">
          <div className="ns-header__left">2048</div>
          <div className="ns-header__right">
            <div className="ns-header__score">
              <div className="ns-header__scoreItem">
                <div className="ns-header__itemTitle">Score</div>
                <div className="ns-header__itemValue">0</div>
              </div>
              <div className="ns-header__scoreItem">
                <div className="ns-header__itemTitle">Best</div>
                <div className="ns-header__itemValue">0</div>
              </div>
            </div>
            <div className="ns-header__actions">
              <div className="ns-header__newGame" onClick={newGame}>
                新游戏
              </div>
            </div>
          </div>
        </div>
        <div className="ns-game">
          <div className="ns-game__container">
            {matrix.map((row, rowIndex) => (
              <div className="ns-row" key={`row-${rowIndex}`}>
                {row.map((col, colIndex) => (
                  <div className="ns-col__item" key={`col-${colIndex}`} />
                ))}
              </div>
            ))}
          </div>
          <div className="ns-game__content">
            {shows.map((item: matrixItemType) => {
              const { value, key, i = 0, j = 0 } = item || [];
              const [x, y] = calculateOffset(i, j);
              return (
                <div
                  key={key}
                  data-key={key}
                  className={`ns-game__contentItem ns-col__item-${value}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberSlider;
