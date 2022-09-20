import { post } from '@/utils/request';

// 注册
export const signUp = (params) => post('/signup', params);
