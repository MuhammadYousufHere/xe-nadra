import "./captcha.scss";
import ReCaptcha from "react-google-recaptcha";
import { useEffect, useState } from "react";
import axios from "axios";
const sitekey = process.env.REACT_APP_CAPTCHA_SITE_KEY!;
const Captcha = ({ isHumain }: { isHumain: (value: any) => void }) => {
  const [data, setData] = useState(false);
  const verify = async (value: string) => {
    const result = await axios.post(
      "/api/captcha",
      { token: value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setData(result.data);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <ReCaptcha
        onChange={(token) => verify(token!)}
        sitekey={sitekey}
        onClick={isHumain.bind(null, { data })}
      />
    </>
  );
};

export default Captcha;
