import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbar';

export default configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});
