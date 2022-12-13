import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CaptchaState {
  loading: boolean;
  error: Error | null;
  isSuccess: boolean;
}
//

const initialState = {
  loading: false,
  error: {} as Error,

  isSuccess: false,
};
export const CAPTCHA = createAsyncThunk(
  "/api/captcha",
  async (token: string, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "/api/captcha",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg = err.response?.data.msg;
        const msgStatus = err.response.status;
        return rejectWithValue({ msg, msgStatus });
      }
    }
  }
);
const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(CAPTCHA.pending, (state) => {
        state.loading = true;
      })
      .addCase(CAPTCHA.fulfilled, (state, action) => {
        state.loading = false;

        state.isSuccess = true;
      })
      .addCase(CAPTCHA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.isSuccess = false;
      });
  },
});
export default captchaSlice.reducer;
