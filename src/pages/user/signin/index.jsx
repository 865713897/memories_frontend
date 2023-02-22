import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { phoneReg } from '@/utils/const';
import MInput from '@/components/Input';
import Sign from '../components/Sign';
import { signIn } from './services';
import ss from './index.scss';

function SignIn() {
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
    <Sign type="signIn">
      <div className={ss.content}>
        <Form form={form}>
          <Form.Item
            name="account"
            rules={[{ required: true, pattern: phoneReg, message: '请输入正确的手机号' }]}
          >
            <MInput placeholder="请输入账号" autoComplete="off" maxLength={11} type="normal" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <MInput placeholder="请输入密码" autoComplete="off" type="password" />
          </Form.Item>
        </Form>
        <div className={ss.actions}>
          <div className={ss.submit} onClick={onSubmit}>
            登录
          </div>
        </div>
      </div>
    </Sign>
  );
}

export default SignIn;
