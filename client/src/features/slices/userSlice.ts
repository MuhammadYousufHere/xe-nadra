import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { getUserFromDB, UserVerify, User } from "../api";
export type RegisterResponse = {
  token: string;
  foreName: string;
  surname: string;
  email: string;
  msg: string;
  status: number;
};
const config = {
  header: {
    "Content-Type": "application/json",
  },
};
export const registerUser = createAsyncThunk(
  "api/register",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/register", userData, {
        headers: config.header,
      });

      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
        return response.data;
      }
      return response;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg = err.response?.data.msg;
        const msgStatus = err.response.status;
        return rejectWithValue({ msg, msgStatus });
      }
    }
  }
);
export const getUser = createAsyncThunk(
  "api/getUser",
  async (userID: string) => {
    return await getUserFromDB(userID);
  }
);
export const verifyAUser = createAsyncThunk(
  "/api/verify",
  async (userData: UserVerify, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/verify", userData, {
        headers: config.header,
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg = err.response?.data.msg;
        const msgStatus = err.response.status;
        return rejectWithValue({ msg, msgStatus });
      }
    }
  }
);

//
export type RegisterErrorResponse = {
  msg: string;
  msgStatus: number;
};
export type VerifiedResponse = { msg: string; msgStatus: number };
export interface UserState {
  loading: boolean;
  error: RegisterErrorResponse;
  registerUserObj: RegisterResponse;
  user: any | null;
  verified: VerifiedResponse;
}
const initialState: UserState = {
  loading: false,
  registerUserObj: {} as RegisterResponse,
  error: {} as RegisterErrorResponse,
  user: null,
  verified: {} as VerifiedResponse,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.loading = false;
          state.registerUserObj = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as RegisterErrorResponse;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as RegisterErrorResponse;
      })
      .addCase(verifyAUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        verifyAUser.fulfilled,
        (state, action: PayloadAction<VerifiedResponse>) => {
          state.loading = false;
          state.verified = action.payload;
        }
      )
      .addCase(verifyAUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as RegisterErrorResponse;
      });
  },
});
export default userSlice.reducer;
