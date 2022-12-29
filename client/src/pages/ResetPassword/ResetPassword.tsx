import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormValidation } from '../../hooks';

import { Wrapper, Button } from '../../components/common';
import { Input } from '../../components/Form';
import Loader from '../../components/PreLoader/Loader';
import Footer from '../Footer';
import './ResetPassword.scss';
import ErrorMessage from '../../components/Form/ErrorMessage';
import FakeInput from '../Verify/FakeInput';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getUser } from '../../features/slices/userSlice';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Message } from '../../components/common/Message';
import { resetPassword, resetState } from '../../features/slices/authSlice';
import { Error } from '../../features/api';
import Captcha from '../../components/Captcha';

const Verify = () => {
  const validate = useFormValidation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, user, verified } = useAppSelector((state) => state.user);
  const { reset, error } = useAppSelector((state) => state.auth);
  const { isSuccess } = useAppSelector((state) => state.captcha);
  const [show, setShow] = useState(false);
  const [email, setSelectedEmail] = useState('');
  const [errorLog, setError] = useState<Error | null>();
  const initialValues = {
    password: '',
    confirmPassword: '',

    captchacode: '',
  };

  // form control
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setError(null);
      setShow(false);
      dispatch(resetPassword({ password: values.password, email }));
      resetForm();

      dispatch(resetState());
    },
    validationSchema: YUP.object().shape({
      password: validate.password,
      captchacode: validate.captchacode,
      confirmPassword: validate.confirmPassword,
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });
  //

  //
  useEffect(() => {
    dispatch(getUser(id!));
  }, [id, dispatch]);
  useEffect(() => {
    if (verified) {
      dispatch(getUser(id!));
    }
  }, [id, dispatch, verified]);
  useEffect(() => {
    if (!loading) {
      setSelectedEmail(user?.email);
      setFieldValue('email', user?.email);
    }
  }, [loading, user, setFieldValue]);
  useEffect(() => {
    if (reset?.msg) {
      toast.success(reset.msg);
      setShow(true);
    }
    if (error?.msg) {
      setError(error);
    }
  }, [reset, error]);
  useEffect(() => {
    if (isSuccess) {
      setFieldValue('captchacode', isSuccess);
    }
  }, [isSuccess, setFieldValue]);
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
        <div className='resetpassword'>
          <div className='bar'></div>
          <div className='resetpassword__content'>
            <div className='icon'>
              <IoEllipsisHorizontal />
            </div>
            <div className='resetpassword__content__title'>
              <h2>Reset Password</h2>
            </div>
            <div className='saperator'></div>

            <form onSubmit={handleSubmit}>
              {errorLog?.msgStatus && (
                <div className='error-log'>
                  <ErrorMessage message={errorLog?.msg} />
                </div>
              )}
              {show && (
                <Message
                  message={reset.msg}
                  onClick={() => setShow(false)}
                />
              )}
              <FakeInput email={email} />
              <Input
                type='password'
                name='password'
                id='password'
                label='Password'
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                type='password'
                name='confirmPassword'
                id='confirm-password'
                label='Re-Type Password'
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
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
                  onClick={() => navigate('/login')}
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
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Verify;
