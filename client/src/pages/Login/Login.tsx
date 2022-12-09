import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import { ImEyeBlocked, ImEye } from 'react-icons/im';

import { Wrapper } from '../../components/common/Wrapper';
import { Input } from '../../components/Form';
import Loader from '../../components/PreLoader/Loader';
import { Button } from '../../components/common/Button';
import cap from '../../assets/captcha.jpeg';
import * as YUP from 'yup';
import './LoginStyle.scss';
import { useFormik } from 'formik';
import useFormValidation from '../../hooks/useFormValidation';
import Footer from '../Footer/Footer';

const Login = () => {
  const validate = useFormValidation();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const initialValues = {
    email: '',
    password: '',
    captchacode: '',
  };
  const { resetForm, errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
    validationSchema: YUP.object().shape({
      email: validate.email,
      password: validate.password,
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
        <div className='login'>
          <div className='bar'></div>
          <div className='login__content'>
            <div className='icon'>
              <IoMdLogIn />
            </div>
            <div className='login__content__title'>
              <h1>Login to your PAK-IDENTITY account</h1>
            </div>
            <div className='saperator'></div>

            <form onSubmit={handleSubmit}>
              <Input
                type='email'
                name='email'
                id='email'
                label='Email'
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                type={show ? 'text' : 'password'}
                name='password'
                id='password'
                label='Password'
                value={values.password}
                onChange={handleChange}
                onToggle={() => setShow(!show)}
                icon={show ? <ImEye /> : <ImEyeBlocked />}
                error={errors.password}
              />
              <div className='captcha-part'>
                <div className='captcha'>
                  <img
                    src={cap}
                    alt='cap'
                  />
                  <Link to='/register'>Create New Account</Link>
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
                  <div className='link'>
                    <Link to='/forgotpassword'>Forgot Password ?</Link>
                  </div>
                </div>
              </div>
              <div className='saperator'></div>
              <div className='submit'>
                <Button
                  type='submit'
                  title='Login'
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

export default Login;
