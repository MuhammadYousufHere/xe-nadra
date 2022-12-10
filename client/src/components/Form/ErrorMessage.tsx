import './error.scss';
interface ErrorMessageProps {
  touched?: boolean;
  error?: boolean;
  message?: string;
}
const ErrorMessage = (props: ErrorMessageProps) => {
  const { message } = props;
  return (
    <div
      id=''
      aria-live='polite'
      className='ui-message ui-message-error ui-widget ui-corner-all'
      role='alert'
      aria-atomic='true'
    >
      <span className='ui-message-error-icon'></span>
      <span className='ui-message-error-detail'>{message}</span>
    </div>
  );
};

export default ErrorMessage;
