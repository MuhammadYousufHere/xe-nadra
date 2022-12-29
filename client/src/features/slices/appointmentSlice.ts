import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Error } from "../api";
export interface Data {
  name: string;
  cnic: string | number;
  mobileNum: string | number;
  branch: string;
  licenceType: string;
  timeSlot: string | number;
  counter: string | number;
  dealingTime: string | number;
}

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token") || "{}")
  : null;

export const registerAppointment = createAsyncThunk(
  "/api/appointment",
  async (appointmentData: Data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/appointment", appointmentData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token.token,
        },
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
type VerifyData = {
  cnic: string | number | undefined;
  verifyFor: string | number;
};
export const verifyUserAppointment = createAsyncThunk(
  "/api/verifyAppointment",
  async (appointmentData: VerifyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/verifyAppointment",
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token.token,
          },
        }
      );
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

export interface Appointment {
  msg: string;
  msgStatus: number;
  payload: {
    tokenNo: number | string;
    name: string;
    cnic: string | number;
    branch: string;
    licenceType: string;
    timeSlot: string | number;
    counter: string | number;
    dealingTime: string | number;
  };
}
export interface AppointmentState {
  appointment: Appointment;
  loading: boolean;
  error: Error | null;
  verifyAppointment: Appointment;
}
const initialState: AppointmentState = {
  appointment: {} as Appointment,
  loading: false,
  error: null,
  verifyAppointment: {} as Appointment,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointment: (state) => {
      state.appointment = {} as Appointment;
      state.loading = false;
      state.error = null;
    },
    clearVerifyAppointment: (state) => {
      state.verifyAppointment = {} as Appointment;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        registerAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.loading = false;
          state.appointment = action.payload;
        }
      )
      .addCase(registerAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      })
      .addCase(verifyUserAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        verifyUserAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.loading = false;
          state.verifyAppointment = action.payload;
        }
      )
      .addCase(verifyUserAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });
  },
});

export const { clearAppointment, clearVerifyAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
