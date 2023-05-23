import pages from '@/pages';

export const routes = [
  {
    path: '/home',
    exact: true,
    name: '首页',
    Component: pages.HomePage,
    children: [],
  },
  {
    path: '/user',
    exact: true,
    name: '用户',
    Component: pages.UserPage,
    children: [
      {
        path: '/user/signin',
        exact: true,
        name: '登陆',
        Component: pages.SignIn,
        children: [],
      },
      {
        path: '/user/signup',
        exact: true,
        name: '注册',
        Component: pages.SignUp,
        children: [],
      },
      {
        path: '/user/personalinfo',
        exact: true,
        name: '个人信息',
        Component: pages.PersonalInfoPage,
        children: [],
      },
    ],
  },
  {
    path: '/macro',
    exact: true,
    name: '设置宏',
    Component: pages.CreateMacro,
    children: [],
  },
  {
    path: '/encrypt-str',
    exact: true,
    name: '加密字符串',
    Component: pages.EncryptStr,
    children: [],
  },
  {
    path: '/animation',
    exact: true,
    name: '动画',
    // Component: pages.UserPage,
    children: [{ path: '/animation/dingtalk-demo', exact: true, name: '钉钉官网动画', Component: pages.DingTalkDemo }],
  },
];
