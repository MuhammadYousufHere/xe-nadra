import { FC } from "react";
import "./inputStyles.scss";
import { InputProps } from "./types";
const Input: FC<InputProps> = (props) => {
  const { label, id, type, name, value, onChange, onToggle, icon, pattern } =
    props;
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-box">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          pattern={pattern}
        />
        {icon && (
          <div onClick={onToggle} className="input-icon">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
