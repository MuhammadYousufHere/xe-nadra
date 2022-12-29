import ErrorMessage from "../../../components/Form/ErrorMessage";
import "./PublicMessage.scss";
const PublicMessage = ({ error }: { error: string }) => {
  return (
    <>
      <div className="publicmessage-container">
        <div className="publicmessage_body">
          <div className="publicmessage_body_header">
            <h3 className="title">Public Message</h3>
          </div>
          <div className="publicmessage_body_content">
            <h5>
              Keeping in view, sensitivities of Covid-19 and public concerns
              regarding non-issuance driving license, the Sindh Police
              Department has decided to re-open the driving license branches on
              a limited scale through online token management system.
            </h5>
            <div className="by">
              <h6>By: Deputy Inspector General Of Police</h6>
              <h6> Driving Licenses Sindh, Karachi.</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="error-body">
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
};

export default PublicMessage;
