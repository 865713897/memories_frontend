import { get, post } from '@/utils/request';

// 获取数据
export const getData = (params) => get('/login', params);

// 登陆
export const signIn = (params) => post('/signin', params);
