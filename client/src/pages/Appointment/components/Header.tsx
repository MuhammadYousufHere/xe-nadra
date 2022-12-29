import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-body">
        <Link to="/appointment">
          <div className="logo">
            <img
              src="https://dls.sindhpolice.gov.pk/assets/images/logo.png"
              alt="logo"
            />
            <br />
            Online Pre-Appointment
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
