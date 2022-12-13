import { RxInfoCircled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { Button, Wrapper } from '../../components/common';
import './TermsStyles.scss';
const TermsCodition = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='termsncondition'>
        <div className='bar'></div>
        <div className='termsncondition__content'>
          <div className='icon'>
            <RxInfoCircled />
          </div>
          <div className='termsncondition__content__title'>
            <h2>Terms and Conditions</h2>
          </div>
          <div className='saperator'></div>

          <div className='info scrollview'>
            <h3 className='heading-3'>
              By proceeding further you agree to the following:
            </h3>
            <ul>
              <li>
                <strong>
                  The fee charged in the application is for the processing of
                  NADRA document application.
                </strong>
              </li>
            </ul>
          </div>

          <div className='saperator'></div>
          <div className='action'>
            <Button
              type='button'
              title='Do Not Accept'
              onClick={() => navigate('/login')}
              variant='danger'
            />
            <Button
              type='button'
              title='Accept and Continue'
              onClick={() => navigate('/dashboard')}
              variant='secondary'
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default TermsCodition;
