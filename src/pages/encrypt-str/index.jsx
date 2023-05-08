/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import ss from './index.scss';

export default function EncryptStr() {
  const [data, setData] = useState([]);
  const key = 'wz:http://cfhong.kccun.cn/';
  const codeStr =
    'kaiguan = true\nEnablePrimaryMouseButtonEvents(true)\nfunction OnEvent(event, arg)\n  if (event == "MOUSE_BUTTON_PRESSED" and kaiguan and arg == lianyu) then\n    repeat\n      PressMouseButton(1)\n      Sleep(math.random(160, 190))\n      ReleaseMouseButton(1)\n      Sleep(math.random(14, 29))\n    until not IsMouseButtonPressed(lianyu)\n  end\nend';
  // 字符串转码
  function strToASCII(str) {
    const newArray = [];
    for (let i = 0; i < str.length; i += 1) {
      newArray.push(str[i].charCodeAt());
    }
    return newArray;
  }
  // 异或运算
  function bxor(d, e) {
    let _d = d;
    let _e = e;
    const f = [
      [0, 1],
      [1, 0],
    ];
    let g = 1;
    let h = 0;
    while (_d > 0 || _e > 0) {
      h += f[_d % 2][_e % 2] * g;
      _d = Math.floor(_d / 2);
      _e = Math.floor(_e / 2);
      g *= 2;
    }
    return h;
  }
  // 与key值异或运算
  function bxorWithKey(d = [], k = '') {
    const _d = [...d];
    let n = 0;
    for (let i = 0; i < _d.length; i += 1) {
      _d[i] = bxor(_d[i], k[n].charCodeAt());
      n += 1;
      if (n > k.length - 1) {
        n = 0;
      }
    }
    return _d;
  }
  // 打乱数组
  function shuffle(_d = []) {
    // 打乱数组
    const d = [..._d];
    d.sort(() => Math.random() - 0.5);
    const r = [...new Array(_d.length).fill(0), -1, ...d];
    for (let i = 0; i < d.length; i += 1) {
      for (let j = Math.floor(r.length / 2) + 1; j < r.length; j += 1) {
        if (r[j] === _d[i]) {
          r[i] = j;
          break;
        }
      }
    }
    return r;
  }
  useEffect(() => {
    const code1 = strToASCII(codeStr);
    const code2 = bxorWithKey(code1, key);
    const code3 = shuffle(code2);
    setData(code3);
  }, []);
  return (
    <div className={ss.root}>
      {data.map((item, index) => (
        <div key={index} style={item === -1 ? { color: 'red' } : {}}>
          {index}----{item}
        </div>
      ))}
    </div>
  );
}
