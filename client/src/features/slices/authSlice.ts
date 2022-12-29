import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserLogin, Error, logout } from "../api";
type EmailSent = {
  msg: string;
  msgStatus: number;
};
type User = {
  token: string;
  foreName: string;
  surname: string;
  email: string;
  isAuthenticated: boolean;
};
const user = JSON.parse(localStorage.getItem("token") || "{}") as User;
export interface UserState {
  loading: boolean;
  error: Error | null;
  user: User | null;
  isSuccess: boolean;
  emailSent: EmailSent;
  reset: PasswordReset;
  resendCode: PasswordReset;
}
//

export const loginUser = createAsyncThunk(
  "api/auth",
  async (userData: UserLogin, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth", userData);
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg = err.response?.data.msg;
        console.log(msg);
        const msgStatus = err.response.status;
        return rejectWithValue({ msg, msgStatus });
      }
    }
  }
);
export const forgotPasswordHandler = createAsyncThunk(
  "api/forgotpassword",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/forgotpassword", userData);

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
export const resetPassword = createAsyncThunk(
  "api/resetpassword",
  async (
    userData: { password: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/resetpassword", userData);

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
export const resendCodeHandler = createAsyncThunk(
  "api/resendcode",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/resendcode", userData);

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
export const logoutUser = createAsyncThunk("api/logout", async () => {
  await logout();
});
type PasswordReset = {
  msg: string;
  msgStatus: number;
};

const initialState: UserState = {
  loading: false,
  error: {
    msg: undefined,
    msgStatus: null,
  },
  user: user ? user : null,
  isSuccess: false,
  emailSent: {} as EmailSent,
  reset: {} as PasswordReset,
  resendCode: {} as PasswordReset,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.error = {} as Error;
      state.reset = {} as PasswordReset;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.isSuccess = false;
      })
      .addCase(forgotPasswordHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        forgotPasswordHandler.fulfilled,
        (state, action: PayloadAction<EmailSent>) => {
          state.loading = false;
          state.emailSent = action.payload;
          state.isSuccess = true;
        }
      )
      .addCase(forgotPasswordHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.isSuccess = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<PasswordReset>) => {
          state.loading = false;
          state.reset = action.payload;
          state.isSuccess = true;
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.isSuccess = false;
      })
      .addCase(resendCodeHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        resendCodeHandler.fulfilled,
        (state, action: PayloadAction<PasswordReset>) => {
          state.loading = false;
          state.resendCode = action.payload;
          state.isSuccess = true;
        }
      )
      .addCase(resendCodeHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.isSuccess = false;
      });
  },
});
export default authSlice.reducer;
export const { resetState } = authSlice.actions;
