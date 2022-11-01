import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist"

const initialState = {
  ownerUid:'',
  name: '',
  email: '',
  phoneNumber: '',
  social: '',
  isLogin: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.ownerUid = action.payload.ownerUid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.social = action.payload.social;
      state.isLogin = action.payload.isLogin;
    },
    SET_LOGOUT(state) {
      state.ownerUid = '';
      state.name = '';
      state.email = '';
      state.phoneNumber = '';
      state.social = '';
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default userSlice;