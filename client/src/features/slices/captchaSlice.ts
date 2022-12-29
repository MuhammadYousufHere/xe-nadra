import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type Success = {
  success: boolean;
};
export interface CaptchaState {
  isLoading: boolean;
  error: Error | null;
  isSuccess: Success;
}
//

const initialState = {
  isLoading: false,
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
    clearCaptcha: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = {} as Error;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(CAPTCHA.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CAPTCHA.fulfilled, (state, action: PayloadAction<Success>) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
      })
      .addCase(CAPTCHA.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
        state.isSuccess = false;
      });
  },
});
export default captchaSlice.reducer;
export const { clearCaptcha } = captchaSlice.actions;
