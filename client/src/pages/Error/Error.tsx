import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/common/Wrapper';
import Loader from '../../components/PreLoader/Loader';
import { Button } from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdRemoveCircle } from 'react-icons/io';
import { BiCaretRight } from 'react-icons/bi';

import './ErrorStyles.scss';
import Footer from '../Footer/Footer';
const Error = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
        <div className='servererror'>
          <div className='bar'></div>
          <div className='servererror__content'>
            <div className='icon'>
              <IoMdRemoveCircle />
            </div>
            <div className='servererror__content__title'>
              <h2>ERROR</h2>
            </div>
            <div className='saperator'></div>

            <div className='info'>
              <p>Sorry! Something has gone wrong on our end.</p>
              <ul>
                <p>What could have caused this?</p>
                <li>
                  <BiCaretRight />
                  Something technical went wrong at our site
                </li>
                <li>
                  <BiCaretRight />
                  The link you clicked might be an old one and does not work
                  anymore.
                </li>
                <li>
                  <BiCaretRight />
                  You might have typed the wrong URL in the address bar.
                </li>
              </ul>
              <br />
              <ul>
                <p>What can I do?</p>
                <li>
                  <BiCaretRight />
                  You may try to access again by retyping the URL
                </li>
                <li>
                  <BiCaretRight />
                  We can take you back to the
                  <Link to='/login'> PAK IDENTITY HOME PAGE</Link>
                </li>
              </ul>
              <br />
              <p>One more thing</p>
              <span>
                You can also help us fix this issue in future. Please contact us
                and let us know what went wrong. Also provide your web browser
                and operating system that you were using when the error
                occurred.
              </span>
            </div>

            <div className='saperator'></div>
            <div className='action'>
              <Button
                type='button'
                title='Back to Login'
                onClick={() => navigate('/login')}
                variant='secondary'
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Error;
