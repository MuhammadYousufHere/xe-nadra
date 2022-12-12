import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as YUP from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormValidation } from "../../hooks";

import { Wrapper, Button } from "../../components/common";
import { HiUserPlus } from "react-icons/hi2";
import { Input } from "../../components/Form";
import Loader from "../../components/PreLoader/Loader";
import Alert from "./Alert";
import Footer from "../Footer";
import cap from "../../assets/captcha.jpeg";
import "./VerifyStyle.scss";
import ScrollToTop from "../../components/ScrollTop";
import ErrorMessage from "../../components/Form/ErrorMessage";
import FakeInput from "./FakeInput";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getUser, verifyAUser } from "../../features/slices/userSlice";
type RegisterErrorResponse = {
  message: string;
  success: boolean;
};
const Verify = () => {
  const validate = useFormValidation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, user } = useAppSelector((state) => state.user);
  const [error, setError] = useState<RegisterErrorResponse>();
  const [email, setSelectedEmail] = useState("");

  const initialValues = {
    code: "",
    captchacode: "",
  };

  // form control
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);

      dispatch(verifyAUser({ code: values.code, email }));
      resetForm();
    },
    validationSchema: YUP.object().shape({
      code: validate.code,
      captchacode: validate.captchacode,
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });
  //

  // maunally loading...
  useEffect(() => {
    dispatch(getUser(id!));
  }, [id, dispatch]);
  useEffect(() => {
    if (!loading) {
      setSelectedEmail(user?.email);
      setFieldValue("email", user?.email);
    }
  }, [loading, user, setFieldValue]);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <div className="row bottom-reg">
          <div className="left">
            <div className="row top-reg">
              <div className="left">
                <h1>Step 1</h1>
                <h3>Personal Information</h3>
              </div>
              <div className="right">
                <h1>Step 2</h1>
                <h3>Email/Mobile Varification</h3>
              </div>
            </div>
            <div className="verify">
              <div className="bar"></div>
              <div className="verify__content">
                <div className="icon">
                  <HiUserPlus />
                </div>

                <div className="saperator"></div>
                <div className="log-error">
                  {error && <ErrorMessage message={error.message} />}
                </div>
                <form onSubmit={handleSubmit}>
                  <FakeInput email={email?.toString()} />

                  <Input
                    type="text"
                    name="code"
                    id="code"
                    label="Verification Pin"
                    value={values.code}
                    onChange={handleChange}
                    error={errors.code}
                  />
                  <div className="captcha-part">
                    <div className="captcha">
                      <img src={cap} alt="cap" />
                    </div>
                  </div>
                  <Input
                    type="text"
                    name="captchacode"
                    id="captchacode"
                    // label="Code"
                    value={values.captchacode}
                    onChange={handleChange}
                    error={errors.captchacode}
                  />
                  <div className="saperator"></div>
                  <div className="submit">
                    <Button
                      type="button"
                      title="Resend Code"
                      variant="secondary"
                    />
                    <Button type="submit" title="Verify" variant="secondary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="right ">
            <div className="row top-reg hidden">
              <div className="left">
                <h1>Step 1</h1>
                <h3>Personal ddddasdsdsdad dda wqwe</h3>
              </div>
            </div>
            <main className="bottom_right">
              <div className="bar"></div>
              <div className="bottom_right__content">
                <h3>Verification Pin</h3>

                <p>
                  Please enter the verification pin we have sent on your
                  registered Email Address / Mobile Number to Activate your
                  account.
                </p>
              </div>
            </main>
          </div>
        </div>
        <ToastContainer />
        <ScrollToTop smooth />
      </Wrapper>
      <div className="hidden-first">
        <Footer />
      </div>
    </>
  );
};

export default Verify;
