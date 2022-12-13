import * as YUP from 'yup';

const useFormValidation = () => {
  const foreName = YUP.string().required('Forename(s) Required');
  const surname = YUP.string().required('Family Name/Surname required');

  const email = YUP.string().required().email();

  const country = YUP.string().required('Select Location');
  const mobileOperater = YUP.string().required('Select Mobile Operator');
  const mobileNum = YUP.string()
    .required('Mobile Number required')
    .min(10)
    .max(10);
  const password = YUP.string().required('Password required');

  const confirmPassword = YUP.string().oneOf(
    [YUP.ref('password'), null],
    'Passwords must match'
  );
  const captchacode = YUP.string().required('Please verify captcha');
  const code = YUP.string().required('Pin required');
  return {
    foreName,
    surname,
    email,
    country,
    mobileOperater,
    mobileNum,
    password,
    confirmPassword,
    captchacode,
    code,
  };
};

export default useFormValidation;
