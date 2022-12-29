import { FaTimes } from 'react-icons/fa';
import './Message.scss';
const Message = ({
  message,
  onClick,
}: {
  message: string;
  onClick: () => void;
}) => {
  return (
    <div className='message-container'>
      <div className='message-body'>
        <div className='left'>
          <p>
            <strong>Success: </strong>
            {message}
          </p>
        </div>
        <div
          className='right'
          onClick={onClick}
        >
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default Message;
