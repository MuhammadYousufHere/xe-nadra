import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getUserFromDB, register, UserVerify, verify, User } from "../api";
export interface UserState {
  loading: boolean;
  error: any;
  user: any | null;
  verified: boolean;
}
const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
  verified: false,
};

export const registerUser = createAsyncThunk(
  "api/register",
  async (userData: User) => {
    return await register(userData);
  }
);
export const getUser = createAsyncThunk(
  "api/getUser",
  async (userID: string) => {
    return await getUserFromDB(userID);
  }
);
export const verifyAUser = createAsyncThunk(
  "api/verify",
  async (userData: UserVerify) => {
    return await verify(userData);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAUser.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(verifyAUser.rejected, (state, action) => {
        state.loading = false;
        state.verified = false;
      });
  },
});
export default userSlice.reducer;
