import { useEffect, useState } from "react";
import { Wrapper } from "../../components/common/Wrapper";
import "./ForgotPassword.scss";
import { Input } from "../../components/Form";
import Loader from "../../components/PreLoader/Loader";
import cap from "../../assets/captcha.jpeg";
import { Button } from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const initialValues = {
    email: "",
    code: "",
  };
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const { email, code } = initialValues;
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="forgotpassword">
        <div className="bar"></div>
        <div className="forgotpassword__content">
          <div className="icon">
            <IoEllipsisHorizontal />
          </div>
          <div className="forgotpassword__content__title">
            <h2>Forgot Password</h2>
          </div>
          <div className="saperator"></div>

          <form>
            <div className="info">
              <p>Enter your registered email address below.</p>
              <p>
                You will be sent an email with details of how to reset your
                password
              </p>
            </div>
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={email}
              onChange={() => {}}
            />

            <div className="captcha-part">
              <div className="captcha">
                <img src={cap} alt="cap" />
              </div>
              <div className="confirm">
                <Input
                  type="text"
                  name="code"
                  id="code"
                  label="Code"
                  value={code}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="saperator"></div>
            <div className="submit">
              <Button
                type="button"
                title="Back To Login"
                variant="secondary"
                onClick={() => navigate(-1)}
              />
              <Button
                type="submit"
                title="Reset Password"
                variant="secondary"
              />
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ForgotPassword;
