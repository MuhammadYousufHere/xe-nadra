import * as YUP from "yup";

const useFormValidation = () => {
  const foreName = YUP.string().required("Forename(s) Required");
  const surname = YUP.string().required("Family Name/Surname required");
  const name = YUP.string().required("Name is required").min(3);
  const email = YUP.string().required().email("Invalid email address");

  const country = YUP.string().required("Select Location");
  const mobileOperater = YUP.string().required("Select Mobile Operator");
  const mobileNum = YUP.string()
    .required("Mobile number is required")
    .min(10)
    .max(11);
  const password = YUP.string()
    .required("Password required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case Character"
    );

  const confirmPassword = YUP.string().oneOf(
    [YUP.ref("password"), null],
    "Passwords must match"
  );
  const captchacode = YUP.string().required(
    "Please verify you are not a Robot"
  );
  const code = YUP.string().required("Pin required");
  const cnic = YUP.string().required("CNIC is required").max(13).min(13);
  const branch = YUP.string().required(
    "Please select branch you want to visit"
  );
  const licenceType = YUP.string().required("Please select licence type");
  const timeSlot = YUP.string().required("Please select time slot");
  const dealingCounter = YUP.string().required(
    "Please select dealing counter and time slot"
  );
  const images = YUP.array()
    .of(YUP.string())
    .min(
      4,
      "Please click at least 4 images, should be clear and visible wihout blur or any other issue with different angles"
    )
    .max(5, "You can click maximum 5 images");
  return {
    dealingCounter,
    foreName,
    branch,
    surname,
    name,
    licenceType,
    timeSlot,
    email,
    country,
    mobileOperater,
    mobileNum,
    password,
    confirmPassword,
    captchacode,
    code,
    cnic,
    images,
  };
};

export default useFormValidation;
