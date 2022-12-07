import { FC } from 'react';
import { Wrapper } from '../../components/common/Wrapper';
import './RegisterStyle.scss';
const Register: FC = () => {
  return (
    <div>
      <Wrapper>
        <div className='register'>
          <div className='register__content'>
            <div className='register__content__left'>
              <div className='register__content__left__content'>
                <h1>Register An Account</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, quibusdam.
                </p>
              </div>
            </div>
            <div className='register__content__right'>
              <div className='register__content__right__content'>
                <div className='register__content__right__content__form'>
                  <div className='form__group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Enter your name'
                    />
                  </div>
                  <div className='form__group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Enter your email'
                    />
                  </div>
                  <div className='form__group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Enter your password'
                    />
                  </div>
                  <div className='form__group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                      type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      placeholder='Confirm your password'
                    />
                  </div>
                  <div className='form__group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='text'
                      name='phone'
                      placeholder='Enter your phone number'
                    />
                  </div>
                  <div className='form__group'>
                    <label htmlFor='address'>Address</label>
                    <input
                      type='text'
                      name='address'
                      id='address'
                      placeholder='Enter your address'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Register;
