import ScrollToTop from "./components/common/ScrollToTop";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="">
      <ScrollToTop />
      {/* <GoogleReCaptchaProvider reCaptchaKey="6LduaXcjAAAAAGTgCJwRM32SmiJ_3bqoEXFzeDmQ"> */}
      <AppRoutes />
      {/* </GoogleReCaptchaProvider> */}
    </div>
  );
}

export default App;
