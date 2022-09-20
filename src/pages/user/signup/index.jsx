import React from 'react';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import MInput from '@/components/Input';
import { phoneReg, EmailReg } from '@/utils/const';
import { signUp } from './services';
import Sign from '../components/Sign';
import ss from './index.module.scss';

function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // 注册
  const onSignUp = async () => {
    const values = await form.validateFields();
    const res = await signUp(values);
    const { success, errorMsg } = res.data || {};
    if (success) {
      message.success('注册成功');
      navigate('/signin');
    } else {
      message.error(errorMsg);
    }
  };
  // 确认密码
  const checkPassword = (_, values) => {
    return new Promise((resolve, reject) => {
      const password = form.getFieldValue('password');
      if (password !== values) {
        reject(new Error('密码不一致'));
      }
      resolve('');
    });
  };
  return (
    <Sign type="signUp">
      <div className={ss.root}>
        <Form form={form}>
          <Form.Item name="account" rules={[{ required: true, pattern: phoneReg, message: '请输入正确的手机号' }]}>
            <MInput placeholder="请输入账号" autoComplete="off" maxLength={11} type="normal" />
          </Form.Item>
          <Form.Item name="email" rules={[{ pattern: EmailReg, message: '请输入正确的邮箱' }]}>
            <MInput placeholder="请输入邮箱" autoComplete="off" type="normal" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <MInput placeholder="请输入密码" autoComplete="off" type="password" />
          </Form.Item>
          <Form.Item
            name="check-password"
            rules={[{ required: true, message: '请输入密码' }, { validator: checkPassword }]}
          >
            <MInput placeholder="确认密码" autoComplete="off" type="password" />
          </Form.Item>
        </Form>
        <div className={ss.actions}>
          <div className={ss.signUp} onClick={onSignUp}>
            注册
          </div>
        </div>
      </div>
    </Sign>
  );
}

export default SignUp;
