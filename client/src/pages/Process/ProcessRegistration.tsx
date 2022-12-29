import "./style.scss";
import { useEffect, useState } from "react";
import { Wrapper } from "../../components/common/Wrapper";
import Loader from "../../components/PreLoader/Loader";
import { Button } from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";

const ProcessRegistration = () => {
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
    <Wrapper>
      <div className="inprocess">
        <div className="bar"></div>
        <div className="inprocess__content">
          <div className="icon">
            <IoEllipsisHorizontal />
          </div>
          <div className="inprocess__content__title">
            <h2>Registration Inprocess</h2>
          </div>
          <div className="saperator"></div>

          <div className="info">
            <ul>
              <li>
                You will now need to <strong>Activate</strong> your account with
                verification pins.
              </li>
              <li>
                An Email / SMS has been sent on your registered Email Address /
                Mobile Number with PIN for verification.
              </li>
              <li>
                Further instructions on how to activate your account have been
                sent to your Email address.
              </li>
              <p>
                Please follow the link in Email for Verification of your
                Account.
              </p>
            </ul>
          </div>

          <div className="saperator"></div>
          <div className="action">
            <Button
              type="button"
              title="Back to Login"
              onClick={() => navigate("/login")}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProcessRegistration;
