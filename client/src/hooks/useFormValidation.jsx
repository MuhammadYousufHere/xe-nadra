import * as YUP from "yup";

const useFormValidation = () => {
  const foreName = YUP.string().required("Forename(s) Required");
  const surname = YUP.string().required("Family Name/Surname required");

  const email = YUP.string().required().email();

  const country = YUP.string().required("Select Location");
  const mobileOperator = YUP.string().required("Select Mobile Operator");
  const mobileNum = YUP.string().required("Mobile Number required");
  const password = YUP.string().required("Password required");
  const confirmPassword = YUP.string().required("Re-Type Password Required");
  const captchacode = YUP.string().required("Code required");

  return {
    foreName,
    surname,
    email,
    country,
    mobileOperator,
    mobileNum,
    password,
    confirmPassword,
    captchacode,
  };
};

export default useFormValidation;
