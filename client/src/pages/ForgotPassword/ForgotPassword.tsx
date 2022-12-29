import { useEffect, useState } from 'react';
import * as YUP from 'yup';
import { Wrapper } from '../../components/common/Wrapper';
import './ForgotPassword.scss';
import { Input } from '../../components/Form';
import Loader from '../../components/PreLoader/Loader';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useFormik } from 'formik';
import useFormValidation from '../../hooks/useFormValidation';
import Footer from '../Footer/Footer';
import { Message } from '../../components/common/Message';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { forgotPasswordHandler } from '../../features/slices/authSlice';
import ErrorMessage from '../../components/Form/ErrorMessage';
import Captcha from '../../components/Captcha';
const ForgotPassword = () => {
  const { isSuccess } = useAppSelector((state) => state.captcha);

  const { emailSent, error, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const [logError, setError] = useState('');

  const validate = useFormValidation();
  const initialValues = {
    email: '',
    captchacode: '',
  };
  const {
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues,
    onSubmit: (forData) => {
      dispatch(forgotPasswordHandler({ email: forData.email }));
      resetForm();
    },
    validationSchema: YUP.object().shape({
      email: validate.email,
      captchacode: validate.captchacode,
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });
  useEffect(() => {
    if (isSuccess) {
      setFieldValue('captchacode', isSuccess);
    }
  }, [isSuccess, setFieldValue]);
  useEffect(() => {
    if (emailSent?.msgStatus === 200) {
      setShow(true);
      setMessage(emailSent.msg);
    }

    if (error?.msg) {
      setError(error?.msg);
    }
  }, [emailSent, loading, error]);
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
        <div className='forgotpassword'>
          <div className='bar'></div>
          <div className='forgotpassword__content'>
            <div className='icon'>
              <IoEllipsisHorizontal />
            </div>
            <div className='forgotpassword__content__title'>
              <h2>Reset Password</h2>
            </div>
            <div className='saperator'></div>

            <form onSubmit={handleSubmit}>
              <div className='info'>
                <p>Enter your registered email address below.</p>
                <p>
                  You will be sent an email with details of how to reset your
                  password
                </p>
              </div>

              {logError && emailSent?.msgStatus !== 200 && (
                <div className='error-log'>
                  <ErrorMessage message={logError} />
                </div>
              )}

              {show && emailSent.msgStatus === 200 && (
                <Message
                  onClick={() => setShow(false)}
                  message={message}
                />
              )}
              <Input
                type='email'
                name='email'
                id='email'
                label='Email'
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className='captcha-part'>
                <div className='captcha'>
                  <Captcha />
                  {errors.captchacode && touched.captchacode && (
                    <ErrorMessage message={errors.captchacode} />
                  )}
                </div>
              </div>
              <div className='saperator'></div>
              <div className='submit'>
                <Button
                  type='button'
                  title='Back To Login'
                  variant='secondary'
                  onClick={() => navigate(-1)}
                />
                <Button
                  type='submit'
                  title='Reset Password'
                  variant='secondary'
                />
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default ForgotPassword;
