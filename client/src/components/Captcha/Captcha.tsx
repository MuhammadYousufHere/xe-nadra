import './captcha.scss';
import ReCaptcha from 'react-google-recaptcha';
import { useAppDispatch } from '../../features/hooks';
import { CAPTCHA } from '../../features/slices/captchaSlice';
const sitekey = process.env.REACT_APP_CAPTCHA_SITE_KEY!;
const Captcha = () => {
  const dispatch = useAppDispatch();
  const verify = async (value: string | null) => {
    if (typeof value === 'string') dispatch(CAPTCHA(value));
  };
  return (
    <div className='captcha-box'>
      <ReCaptcha
        onChange={(token) => verify(token)}
        sitekey={sitekey}
      />
    </div>
  );
};

export default Captcha;

// const result = await axios.post<Data>(
//   '/api/captcha',
//   { token: value },
//   {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
// );
// setData(result.data.success);
// try {
// } catch (error) {
//   console.log(error);
// }
