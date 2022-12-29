import { FC } from 'react';
import './WrapperStyle.scss';

interface WrapperProps {
  children: React.ReactNode | JSX.Element;
}
const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className='wrapper'>{children}</div>;
};

export default Wrapper;
