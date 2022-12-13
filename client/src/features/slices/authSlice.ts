import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserLogin, Error } from '../api';
type EmailSent = {
  msg: string;
  status: number;
};
type User = {
  token: string;
  foreName: string;
  surname: string;
  email: string;
  isAuthenticated: boolean;
};
//

export const loginUser = createAsyncThunk(
  'api/auth',
  async (userData: UserLogin, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth', userData);
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
      }
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
export const forgotPasswordHandler = createAsyncThunk(
  'api/forgotpassword',
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/forgotpassword', userData);

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
  'api/resetpassword',
  async (
    userData: { password: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/resetpassword', userData);

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
type PasswordReset = {
  message: string;
  status: number;
};
export interface UserState {
  loading: boolean;
  error: Error | null;
  user: User | null;
  isSuccess: boolean;
  emailSent: EmailSent;
  reset: PasswordReset;
}

const initialState: UserState = {
  loading: false,
  error: {
    msg: undefined,
    msgStatus: null,
  },
  user: null,
  isSuccess: false,
  emailSent: {} as EmailSent,
  reset: {} as PasswordReset,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isSuccess = false;
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
      });
  },
});
export default authSlice.reducer;
