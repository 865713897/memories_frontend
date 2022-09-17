import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { phoneReg } from '@/utils/const';
import MInput from '@/components/Input';
import { signIn } from './services';
import ss from './index.module.scss';

function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // 初始化
  const init = () => {
    // getData({ id: '123', name: 'Jane', age: 19 });
  };

  useEffect(() => {
    init();
  }, []);

  // 提交
  const onSubmit = async () => {
    const values = await form.validateFields();
    const res = await signIn(values);
    const { success, errorMsg } = res.data || {};
    if (success) {
      navigate('/home');
      message.success('登录成功');
    } else {
      message.error(errorMsg);
    }
  };

  return (
    <div className={ss.root}>
      <div className={ss.header}>
        <div className={ss.left}>
          <LeftOutlined className={ss.back} />
        </div>
        <div className={ss.right}>注册</div>
      </div>
      <div className={ss.logoArea}>
        <img className={ss.logo} src={logo} alt="logo" />
      </div>
      <div className={ss.content}>
        <div className={ss.title}>登录</div>
        <div className={ss.describe}>您好，欢迎来到***</div>
        <Form form={form}>
          <Form.Item name="account" rules={[{ required: true, pattern: phoneReg, message: '请输入正确的手机号' }]}>
            <MInput placeholder="请输入账号" maxLength={11} type="normal" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <MInput placeholder="请输入账号" type="password" />
          </Form.Item>
        </Form>
        <div className={ss.actions} onClick={onSubmit}>
          <div className={ss.submit}>登录</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
