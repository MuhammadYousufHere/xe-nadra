import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import uuid from 'react-uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Wrapper } from '../../components/common/Wrapper';
import { Country } from 'country-state-city';
import { HiUserPlus } from 'react-icons/hi2';
import './RegisterStyle.scss';
import { Dropdown, Input } from '../../components/Form';
import Loader from '../../components/PreLoader/Loader';
import cap from '../../assets/captcha.jpeg';
import { Button } from '../../components/common/Button';
import SearchBar from '../../components/Form/SearchBar';
import { useFormik } from 'formik';
import * as YUP from 'yup';

import Alert from './Alert';
import useFormValidation from '../../hooks/useFormValidation';
import ScrollToTop from '../../components/ScrollTop';
import Footer from '../Footer/Footer';
const operators = [
  { id: uuid(), name: 'Ufone' },
  { id: uuid(), name: 'Mobilink' },
  { id: uuid(), name: 'Zong' },
  { id: uuid(), name: 'Warid' },
  { id: uuid(), name: 'Telenor' },
];

const Register = () => {
  const validate = useFormValidation();
  const navigate = useNavigate();
  const all = Country.getAllCountries().map((country) => ({
    id: uuid(),
    name: country.name,
  }));
  const [allCountries, setAllCountries] = useState(all);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [countryCode] = useState<string | undefined>('+92');
  const [country] = useState('Pakistan');
  const [mobileOperater] = useState('Mobilink');

  const initialValues = {
    foreName: '',
    surname: '',
    email: '',
    mobileOperater,
    mobileNum: '',
    password: '',
    country,
    captchacode: '',
    confirmPassword: '',
  };

  // form control
  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      try {
        // axios post
        const res = await axios.post('http://localhost:8080/users', values, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = res.data;
        toast(data?.message);
        navigate('/inprocess');
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: YUP.object().shape({
      foreName: validate.foreName,
      surname: validate.surname,
      email: validate.email,
      mobileOperater: validate.mobileOperator,
      mobileNum: validate.mobileNum,
      country: validate.country,
      password: validate.password,
      confirmPassword: validate.confirmPassword,
      captchacode: validate.captchacode,
    }),
  });
  //
  // instantant filter data
  const filteredCountries = (filterTerm: string) => {
    const res = allCountries.filter((c) =>
      c.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
    return res;
  };
  // filter country codes
  // const countryCodeHandler = (countryName: string) => {
  //   const filter = Country.getAllCountries()
  //     .map((country) => country)
  //     .find((c) => c.name === countryName && c);

  //   return filter?.phonecode;
  // };

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
            <div className='register'>
              <div className='bar'></div>
              <div className='register__content'>
                <div className='icon'>
                  <HiUserPlus />
                </div>
                <div className='register__content__title'>
                  <h2>Registration</h2>
                </div>
                <div className='saperator'></div>

                <form onSubmit={handleSubmit}>
                  <div className='info'>
                    <p>
                      Create an account to register yourself in Pak-Identity
                      System.
                    </p>
                    Or
                    <Link to='/login'> Signin with your existing account</Link>
                  </div>
                  <Input
                    type='text'
                    name='foreName'
                    id='name'
                    label='Forname(S)'
                    value={values.foreName}
                    onChange={handleChange}
                    error={errors.foreName}
                  />
                  <Input
                    type='text'
                    name='surname'
                    id='surname'
                    label='Surname'
                    value={values.surname}
                    onChange={handleChange}
                    error={errors.surname}
                  />
                  <Dropdown
                    id='country'
                    label='Country'
                    data={allCountries}
                    errorMessage={errors.country}
                  >
                    <SearchBar
                      value={filter}
                      onChange={(e) => {
                        setFilter(e.target.value);
                        setAllCountries(filteredCountries(e.target.value));
                      }}
                    />
                  </Dropdown>
                  <Alert />
                  <Dropdown
                    id='mob-operator'
                    label='Mobile Operater'
                    data={operators}
                    errorMessage={errors.mobileOperater}
                  />
                  <label htmlFor='mobile-num'>Mobile No</label>
                  <div className='phonenum'>
                    <div className='operator-code'>
                      <p>{countryCode}</p>
                    </div>
                    <Input
                      type='tel'
                      name='mobileNum'
                      id='mobile-num'
                      value={values.mobileNum}
                      onChange={handleChange}
                      error={errors.mobileNum}
                    />
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
                  <Input
                    type={'password'}
                    name='password'
                    id='password'
                    label='Password'
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                  <Input
                    type={'password'}
                    name='confirmPassword'
                    id='re-password'
                    label='RE-TYPE YOUR PASSWORD'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
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
                      type='submit'
                      title='Login'
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
                <h1>Step </h1>
                <h3>Personal </h3>
              </div>
            </div>
            <main className='bottom_right'>
              <div className='bar'></div>
              <div className='bottom_right__content'>
                <h3>Mobile Number</h3>

                <p>Provide mobile number registered with PTA.</p>
                <h3>Password</h3>
                <p>
                  Password must be at least 8 characters and must contain an
                  upper case character, a lower case character, a numeric
                  character, and a special character.
                </p>
              </div>
            </main>
          </div>
        </div>
        <ToastContainer />
        <ScrollToTop smooth />
      </Wrapper>
      <div className='hidden-first'>
        <Footer />
      </div>
    </>
  );
};

export default Register;
