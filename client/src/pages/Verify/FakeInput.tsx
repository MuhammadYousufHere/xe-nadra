import "./finputstyles.scss";
const FakeInput = ({ email }: { email: string }) => {
  return (
    <div className="fake-input">
      <label htmlFor="email-verify">Email</label>
      <div className="fake-input__body" id="email-verify">
        <p>{email}</p>
      </div>
    </div>
  );
};

export default FakeInput;
