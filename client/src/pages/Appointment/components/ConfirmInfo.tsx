import { FC } from "react";
import { useFormikContext } from "formik";
import { format } from "date-fns";
import { IntialValues } from "../Appointment";
import "./confirmInfo.scss";

const SeatSlot: FC = () => {
  const { values } = useFormikContext<IntialValues>();
  return (
    <div className="confirm_container">
      <div className="confirm_body">
        <div className="confirm_body_header">
          <h3 className="title">Please Confirm Pre-Appointment Details</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered" id="tableOne3">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <p>{values.step_1?.name}</p>
                </td>
              </tr>
              <tr>
                <td>CNIC</td>
                <td>
                  <p>{values.step_1?.cnic}</p>
                </td>
              </tr>
              <tr>
                <td>Booking For</td>
                <td>
                  <p>{format(Date.now(), "dd-MM-yyyy")}</p>
                </td>
              </tr>
              <tr>
                <td>Time Slot</td>
                <td>
                  <p>{values.step_4?.timeSlot} Hours</p>
                </td>
              </tr>
              <tr>
                <td>Dealing Time</td>
                <td>
                  <p>{values.step_5?.dealingTime}</p>
                </td>
              </tr>
              <tr>
                <td>Counter</td>
                <td>
                  <p> {values.step_5?.counter}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <b>License Type</b>
                </td>
                <td>
                  <p>{values.step_3?.licenceType}</p>
                </td>
              </tr>
              <tr>
                <td>Branch</td>
                <td>
                  <p>{values.step_2?.branch}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeatSlot;
