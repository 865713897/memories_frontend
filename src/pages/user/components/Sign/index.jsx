import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import ss from './index.scss';

const textEnum = {
  signIn: '登录',
  signUp: '注册',
};

function SignHOC(props) {
  const { type, children } = props;
  const navigate = useNavigate();
  // 跳转注册页面
  const goToSignUpPage = () => {
    navigate('/user/signup');
  };
  return (
    <div className={ss.root}>
      <div className={ss.header}>
        <div className={ss.left}>
          {type === 'signUp' && <LeftOutlined className={ss.back} onClick={() => navigate(-1)} />}
        </div>
        {type === 'signIn' && (
          <div className={ss.right} onClick={goToSignUpPage}>
            注册
          </div>
        )}
      </div>
      <div className={ss.logoArea}>
        <img className={ss.logo} src={logo} alt="logo" />
      </div>
      <div className={ss.title}>{textEnum[type]}</div>
      <div className={ss.describe}>您好，欢迎来到***</div>
      {children}
    </div>
  );
}

export default SignHOC;
