import { combineReducers } from "redux";
import userSlice from "../slice/user";
import tokenSlice from "../slice/token";
import cargoSlice from "../slice/cargo";
import cargoImageSlice from "../slice/cargoImage";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  token: tokenSlice.reducer,
  cargo: cargoSlice.reducer,
  cargoImage: cargoImageSlice.reducer
});

export default rootReducer;