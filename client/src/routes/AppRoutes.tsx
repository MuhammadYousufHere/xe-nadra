import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProcessRegistration from "../pages/Process";
import Register from "../pages/Register";
import TermsCodition from "../pages/TermsCodition";
import Verify from "../pages/Verify";
import PrivateRoute from "./PrivateRoutes";
import Error from "../pages/Error";
import ResetPassword from "../pages/ResetPassword";
import Appointment from "../pages/Appointment";
import Success from "../pages/Appointment/Success";
import VerifyAppointment from "../pages/Appointment/VerifyAppointment";
import VerifiedResult from "../pages/Appointment/VerifiedResult";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/inprocess" element={<ProcessRegistration />} />
      <Route path="/error" element={<Error />} />
      <Route path="/resetpassword/:id" element={<ResetPassword />} />
      <Route path="/verifyuser/:id" element={<Verify />} />

      <Route path="*" element={<Navigate to="/" />} />
      <Route element={<PrivateRoute />}>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/success" element={<Success />} />
        <Route path="/appointment/verify" element={<VerifyAppointment />} />
        <Route path="/appointment/verified" element={<VerifiedResult />} />
        <Route path="/terms&condtion" element={<TermsCodition />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
