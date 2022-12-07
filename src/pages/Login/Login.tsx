import React from 'react';
import { Wrapper } from '../../components/common/Wrapper';
import { IoMdLogIn } from 'react-icons/io';
import './LoginStyle.scss';
import { Input } from '../../components/Form';
const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const { email, password } = initialValues;
  return (
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

          <form>
            <Input
              type='email'
              name='email'
              id='email'
              label='Email'
              value={email}
              onChange={() => {}}
            />
            <Input
              type='password'
              name='password'
              id='password'
              label='Password'
              value={password}
              onChange={() => {}}
            />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
