import './HomeStyles.scss';
import logo from '../../assets/top-logo.png';
import { Wrapper } from '../../components/common/Wrapper';
import { Button } from '../../components/common/Button';
import { FaUser } from 'react-icons/fa';
import { TiArrowRightThick } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
function Home() {
  const navigate = useNavigate();
  return (
    <header className='home'>
      <Wrapper>
        <div className='home__content'>
          <div className='logo'>
            <figure>
              <img
                src={logo}
                alt='logo'
              />
            </figure>
          </div>
          <div className='content_box'>
            <div className='shadowed_box'>
              <span className='note_info'>PAK IDENTITY</span>
              <span className='desc'>
                <span className='dashes'>--</span> Apply online in 3 easy steps
              </span>
            </div>
            <h1>Online Application, Online Payment &amp; Home Delivery</h1>
            <p className='desc info'>
              Pak-Identity is NADRA's online ID issuance services for Pakistani
              citizens. Apply for NADRA identity products from anywhere in the
              world.
            </p>
            <div className='action-box'>
              <Button
                title='Register An Account'
                variant='primary'
                icon={<FaUser />}
                onClick={() => navigate('/register')}
              />
              <Button
                title='Login With Existing Account'
                variant='secondary'
                icon={<TiArrowRightThick />}
                onClick={() => navigate('/login')}
              />
            </div>
          </div>

          <div className='footer'>
            <p>Copyrights NADRA 2015 - 2022 All Rights Reserved.</p>
          </div>
        </div>
      </Wrapper>
      <div className='hidden-first'>
        <Footer />
      </div>
    </header>
  );
}

export default Home;
