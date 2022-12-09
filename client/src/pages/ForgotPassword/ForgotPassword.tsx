import { useEffect, useState } from 'react';
import * as YUP from 'yup';
import { Wrapper } from '../../components/common/Wrapper';
import './ForgotPassword.scss';
import { Input } from '../../components/Form';
import Loader from '../../components/PreLoader/Loader';
import cap from '../../assets/captcha.jpeg';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useFormik } from 'formik';
import useFormValidation from '../../hooks/useFormValidation';
import Footer from '../Footer/Footer';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const validate = useFormValidation();
  const initialValues = {
    email: '',
    captchacode: '',
  };
  const { errors, values, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
    validationSchema: YUP.object().shape({
      email: validate.email,
      captchacode: validate.captchacode,
    }),
  });
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
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
              <h2>Forgot Password</h2>
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
                  <img
                    src={cap}
                    alt='cap'
                  />
                </div>
                <div className='confirm'>
                  <Input
                    type='text'
                    name='captchacode'
                    id='captchacode'
                    label='Code'
                    value={values.captchacode}
                    onChange={handleChange}
                    error={errors.captchacode}
                  />
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
