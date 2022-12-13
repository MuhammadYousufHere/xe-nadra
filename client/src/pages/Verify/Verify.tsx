import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import 'react-toastify/dist/ReactToastify.css';

import { useFormValidation } from '../../hooks';

import { Wrapper, Button } from '../../components/common';
import { HiUserPlus } from 'react-icons/hi2';
import { Input } from '../../components/Form';
import Loader from '../../components/PreLoader/Loader';
import Footer from '../Footer';
import './VerifyStyle.scss';
import ScrollToTop from '../../components/ScrollTop';
import ErrorMessage from '../../components/Form/ErrorMessage';
import FakeInput from './FakeInput';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  getUser,
  verifyAUser,
  VerifiedResponse,
} from '../../features/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { resendCodeHandler } from '../../features/slices/authSlice';
import Captcha from '../../components/Captcha';

const Verify = () => {
  const validate = useFormValidation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, user, error, verified } = useAppSelector(
    (state) => state.user
  );
  const { resendCode, isSuccess } = useAppSelector((state) => state.auth);
  const captcha = useAppSelector((state) => state.captcha);

  const [errorLog, setError] = useState<VerifiedResponse | null>(error);
  const [email, setSelectedEmail] = useState('');

  const initialValues = {
    code: '',
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
    onSubmit: async (values) => {
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
  const onResendCode = () => {
    dispatch(resendCodeHandler({ email }));
  };
  useEffect(() => {
    if (captcha.isSuccess) {
      setFieldValue('captchacode', captcha.isSuccess);
    }
  }, [captcha, setFieldValue]);
  useEffect(() => {
    dispatch(getUser(id!));
  }, [id, dispatch]);

  useEffect(() => {
    if (!loading) {
      setSelectedEmail(user?.email);
      setFieldValue('email', user?.email);
    }
  }, [loading, user, setFieldValue]);
  useEffect(() => {
    if (error.msg) {
      setError(error);
    }
  }, [error, loading, verified]);
  useEffect(() => {
    if (verified.msg) {
      setError(null);
      toast(verified.msg, { type: 'success' });
      setTimeout(() => {
        navigate('/terms&condtion');
      }, 2000);
    }
  }, [verified, navigate]);
  useEffect(() => {
    if (resendCode.msg) {
      toast(resendCode.msg, { type: 'success' });
    }
  }, [resendCode, isSuccess]);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (user?.verified) {
    navigate('/terms&condtion');
  }

  return (
    <>
      <Wrapper>
        <div className='row bottom-reg'>
          <div className='left'>
            <div className='row top-reg'>
              <div className='left'>
                <h1>Step 1</h1>
                <h3>Personal Information</h3>
              </div>
              <div className='right'>
                <h1>Step 2</h1>
                <h3>Email/Mobile Varification</h3>
              </div>
            </div>
            <div className='verify'>
              <div className='bar'></div>
              <div className='verify__content'>
                <div className='icon'>
                  <HiUserPlus />
                </div>

                <div className='saperator'></div>

                <form onSubmit={handleSubmit}>
                  <div className='log-error'>
                    {errorLog?.msg && <ErrorMessage message={errorLog.msg} />}
                  </div>
                  <FakeInput email={email?.toString()} />

                  <Input
                    type='text'
                    name='code'
                    id='code'
                    label='Verification Pin'
                    value={values.code}
                    onChange={handleChange}
                    error={errors.code}
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
                      title='Resend Code'
                      variant='secondary'
                      onClick={onResendCode}
                    />
                    <Button
                      type='submit'
                      title='Verify'
                      variant='secondary'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='right '>
            <div className='row top-reg hidden'>
              <div className='left'>
                <h1>Step 1</h1>
                <h3>Personal ddddasdsdsdad dda wqwe</h3>
              </div>
            </div>
            <main className='bottom_right'>
              <div className='bar'></div>
              <div className='bottom_right__content'>
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
        <ScrollToTop smooth />
        <ToastContainer />
      </Wrapper>
      <div className='hidden-first'>
        <Footer />
      </div>
    </>
  );
};

export default Verify;
