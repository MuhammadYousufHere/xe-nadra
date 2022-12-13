import { FC } from 'react';
import ErrorMessage from './ErrorMessage';
import './inputStyles.scss';
import { InputProps } from './types';
const Input: FC<InputProps> = (props) => {
  const {
    label,
    id,
    type,
    name,
    value,
    onChange,
    onToggle,
    icon,
    pattern,
    error,
  } = props;
  return (
    <section className='ui-input-container'>
      <div className='input-group'>
        <label htmlFor={id}>{label}</label>
        <div className='input-box'>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            pattern={pattern}
          />

          {icon && (
            <div
              onClick={onToggle}
              className='input-icon'
            >
              {icon}
            </div>
          )}
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
    </section>
  );
};

export default Input;
