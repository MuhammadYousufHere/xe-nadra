import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../api";
export const registerUser = createAsyncThunk("api/register", async () => {});
export interface UserState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(registerUser.pending, (state) => {});
  },
});
export default authSlice.reducer;
