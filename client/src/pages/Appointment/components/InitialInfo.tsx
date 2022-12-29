import { FC } from "react";
import { useFormikContext } from "formik";
import { Input } from "../../../components/Form";
import { IntialValues } from "../Appointment";
import "./initialInfo.scss";
import { useUnmount } from "../../../hooks";
import { useAppDispatch } from "../../../features/hooks";
import { clearVerifyAppointment } from "../../../features/slices/appointmentSlice";

interface InitialInfoProps {
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InitialInfo: FC<InitialInfoProps> = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange, errors } = useFormikContext<IntialValues>();
  useUnmount(() => dispatch(clearVerifyAppointment()));
  return (
    <div className="initial_info">
      <div className="initial_info_body">
        <div className="info_group">
          <label htmlFor="name" style={{ textAlign: "center" }}>
            <p>Name:</p>
            <Input
              name="step_1.name"
              id="step_1.name"
              value={values.step_1.name}
              placeholder="please enter your name"
              onChange={handleChange}
              error={errors.step_1?.name}
            />
          </label>
        </div>
        <div className="info_group">
          <label htmlFor="mobile" style={{ textAlign: "center" }}>
            <p>Mobile Number (for SMS verification):</p>
            <Input
              type="tel"
              name="step_1.mobile"
              id="step_1.mobile"
              value={values.step_1.mobile}
              onChange={handleChange}
              error={errors.step_1?.mobile}
            />
          </label>
        </div>
        <div className="info_group">
          <label htmlFor="name" style={{ textAlign: "center" }}>
            <p>CNIC:</p>
            <Input
              name="step_1.cnic"
              id="step_1.cnic"
              value={values.step_1.cnic}
              onChange={handleChange}
              error={errors.step_1?.cnic}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default InitialInfo;
