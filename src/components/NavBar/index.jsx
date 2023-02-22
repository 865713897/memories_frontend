import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { changeNavBar } from '@/store/navbar';
import IconFont from '../IconFont';
import ss from './index.scss';

const bars = [
  {
    iconName: 'icon-shouye5',
    path: '/home',
    key: 'home',
    text: '首页',
  },
  {
    iconName: 'icon-wode3',
    path: '/user/personalinfo',
    key: 'personal',
    text: '我的',
  },
];

function NavBar(WrappedComponent) {
  const { length = 1 } = bars;
  function HOC(props) {
    const { _key, dispatch } = props;
    const navigate = useNavigate();
    // 点击导航
    const onClickBar = (key, path) => {
      dispatch(changeNavBar(key));
      navigate(path);
    };
    return (
      <div className={ss.root}>
        <WrappedComponent />
        <div className={ss.footer}>
          {bars.map(({ iconName, key, path, text }) => (
            <div className={ss.iconArea} key={key} style={{ width: `${100 / length}%` }}>
              <div
                className={cn(ss.icon, { [ss.active]: _key === key })}
                onClick={() => onClickBar(key, path)}
              >
                <IconFont type={iconName} />
                <span className={ss.text}>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return connect((state) => ({ _key: state.navbar.key }))(HOC);
}

export default NavBar;
