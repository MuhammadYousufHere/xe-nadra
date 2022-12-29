import React from "react";
import "./alert.scss";
interface AlertProps {
  message?: string;
  onClose: () => void;
}
const Alert = (props: AlertProps) => {
  const {
    message = "Mobile number field is mandatory. You will receive authentication code on your provided mobile number",
  } = props;
  return (
    <div className="alert alert-info">
      <strong>NOTE: </strong>
      {message}
    </div>
  );
};

export default Alert;
