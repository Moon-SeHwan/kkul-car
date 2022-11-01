import { configureStore } from '@reduxjs/toolkit';
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import { useDispatch } from 'react-redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["token", "user", "cargo"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
});

export default store;

export const useAppDispatch = () => useDispatch();