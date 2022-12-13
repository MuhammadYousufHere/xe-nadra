import { configureStore } from "@reduxjs/toolkit";
import userReduer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import captchaSlice from "./slices/captchaSlice";

export const store = configureStore({
  reducer: {
    user: userReduer,
    auth: authReducer,
    captcha: captchaSlice,
  },
});
// ReturnType =>  TS utility that allows to transform the type definition of a function into it's return type

//RootState => contains type definition that perfectly matches all the data we have in redux store
// AppDispatch => used for the methods we use to dispatch action into our redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
