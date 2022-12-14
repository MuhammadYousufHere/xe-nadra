import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../components/common/Wrapper";
import { IoMdLogIn } from "react-icons/io";
import "./LoginStyle.scss";
import { Input } from "../../components/Form";
import Loader from "../../components/PreLoader/Loader";
import { ImEyeBlocked, ImEye } from "react-icons/im";
import cap from "../../assets/captcha.jpeg";
import { Button } from "../../components/common/Button";
const Login = () => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    code: "",
  };
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const { email, password, code } = initialValues;
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="login">
        <div className="bar"></div>
        <div className="login__content">
          <div className="icon">
            <IoMdLogIn />
          </div>
          <div className="login__content__title">
            <h1>Login to your PAK-IDENTITY account</h1>
          </div>
          <div className="saperator"></div>

          <form>
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={email}
              onChange={() => {}}
            />
            <Input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              label="Password"
              value={password}
              onChange={() => {}}
              onToggle={() => setShow(!show)}
              icon={show ? <ImEye /> : <ImEyeBlocked />}
            />
            <div className="captcha-part">
              <div className="captcha">
                <img src={cap} alt="cap" />
                <Link to="/register">Create New Account</Link>
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
                <div className="link">
                  <Link to="/forgotpassword">Forgot Password ?</Link>
                </div>
              </div>
            </div>
            <div className="saperator"></div>
            <div className="submit">
              <Button type="submit" title="Login" variant="secondary" />
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

/* <Recaptcha
                sitekey={process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA_SITE_KEY}
                render="explicit"
                verifyCallback={verifyCallback}
              />*/
