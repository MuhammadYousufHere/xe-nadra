import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import countires from "./countires.json";
import { Wrapper } from "../../components/common/Wrapper";
import { Country } from "country-state-city";
import { HiUserPlus } from "react-icons/hi2";
import "./RegisterStyle.scss";
import { Dropdown, Input } from "../../components/Form";
import Loader from "../../components/PreLoader/Loader";
import cap from "../../assets/captcha.jpeg";
import { Button } from "../../components/common/Button";
import SearchBar from "../../components/Form/SearchBar";
import { useFormik } from "formik";
const Register = () => {
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState("+92");
  const [country, setCountry] = useState("Pakistan");
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    mobileOperater: "",
    mobileNum: "",
    password: "",
    origin: country,
    code: "",
    confirmPassword: "",
  };
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const onSubmitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const {
    code,
    confirmPassword,
    email,
    mobileNum,
    mobileOperater,
    name,
    origin,
    password,
    surname,
  } = values;
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
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
          <div className="register">
            <div className="bar"></div>
            <div className="register__content">
              <div className="icon">
                <HiUserPlus />
              </div>
              <div className="register__content__title">
                <h2>Registration</h2>
              </div>
              <div className="saperator"></div>

              <form onSubmit={handleSubmit}>
                <div className="info">
                  <p>
                    Create an account to register yourself in Pak-Identity
                    System.
                  </p>
                  Or
                  <Link to="/login">Signin with your existing account</Link>
                </div>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  label="Forname(S)"
                  value={name}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  label="Surname"
                  value={surname}
                  onChange={handleChange}
                />
                <Dropdown id="country" label="Country" />
                <Dropdown id="mob-operator" label="Mobile Operater" />

                <div className="phonenum">
                  <div className="operator-code">
                    <p>{countryCode}</p>
                  </div>
                  <Input
                    type="tel"
                    name="mobileNum"
                    id="mobile-num"
                    value={mobileNum}
                    onChange={handleChange}
                    pattern={"[+()]*(?:d[s-.()xX]*){10,14}"}
                  />
                </div>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  label="Email"
                  value={email}
                  onChange={handleChange}
                />
                <Input
                  type={"password"}
                  name="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={handleChange}
                />
                <Input
                  type={"password"}
                  name="confirmPassword"
                  id="re-password"
                  label="Password"
                  value={confirmPassword}
                  onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="saperator"></div>
                <div className="submit">
                  <Button type="submit" title="Login" variant="secondary" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="right ">
          <div className="row top-reg hidden">
            <div className="left">
              <h1>Step </h1>
              <h3>Personal </h3>
            </div>
          </div>
          <main className="bottom_right">
            <div className="bar"></div>
            <div className="bottom_right__content">
              <h3>Mobile Number</h3>

              <p>Provide mobile number registered with PTA.</p>
              <h3>Password</h3>
              <p>
                Password must be at least 8 characters and must contain an upper
                case character, a lower case character, a numeric character, and
                a special character.
              </p>
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;

/* <Recaptcha
                sitekey={process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA_SITE_KEY}
                render="explicit"
                verifyCallback={verifyCallback}
              />*/
