import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'navbar',
  initialState: {
    key: 'home',
  },
  reducers: {
    changeNavBar: (state, { payload }) => {
      return { ...state, key: payload };
    },
  },
});

export const { changeNavBar } = actions;

export default reducer;
