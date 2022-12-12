import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProcessRegistration from "./pages/Process/ProcessRegistration";
import Register from "./pages/Register";
import TermsCodition from "./pages/TermsCodition";
import Verify from "./pages/Verify";

function App() {
  useEffect(() => {
    // iife
    (async () => {
      try {
        const res = await fetch("/api");
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/inprocess" element={<ProcessRegistration />} />
        <Route path="/error" element={<Error />} />
        <Route path="/verifyuser/:id" element={<Verify />} />
        <Route path="/terms&codtion" element={<TermsCodition />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
