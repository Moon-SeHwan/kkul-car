import { combineReducers } from "redux";
import userSlice from "../slice/user";
import tokenSlice from "../slice/token";
import cargoSlice from "../slice/cargo";
import modalSlice from "../slice/modal";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  token: tokenSlice.reducer,
  cargo: cargoSlice.reducer,
  modal: modalSlice.reducer,
});

export default rootReducer;