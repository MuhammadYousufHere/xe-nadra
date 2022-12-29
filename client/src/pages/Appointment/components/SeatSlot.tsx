import { FC, useState } from "react";
import { useFormikContext } from "formik";
import { IntialValues } from "../Appointment";
import { MdOutlineEventAvailable } from "react-icons/md";
import "./seatSlot.scss";
import ErrorMessage from "../../../components/Form/ErrorMessage";

export interface Data {
  counter: number;
  slotes: Slote[];
}

export interface Slote {
  available: boolean;
  id: number;
  slotTime: string;
}

type SeatSlotProps = {
  slotsData: Data[];
};
const SeatSlot: FC<SeatSlotProps> = ({ slotsData }) => {
  const { setFieldValue, errors, values } = useFormikContext<IntialValues>();

  const [selected, setSelected] = useState<string>(values.step_5.counter);
  const onSelectHandler = (slot: string) => {
    setSelected(slot);
  };
  return (
    <>
      <div className="slot_container">
        <div className="slot_body">
          <div className="slot_body_header">
            <h3 className="title">Select Slot:</h3>
            <p className="title">{values.step_4.timeSlot} Hours</p>
          </div>
          <div className="counters-container">
            {slotsData.map((data, id) => (
              <div className="slot_body_content" key={id}>
                <div className="slot_body_content_item">
                  <p>Counter {data.counter}</p>
                </div>
                {data.slotes.map((slot) => (
                  <div
                    className={`slot_body_content_item ${
                      selected === slot.slotTime && "selected"
                    }`}
                    onClick={() => {
                      onSelectHandler(slot.slotTime);
                      setFieldValue("step_5.counter", data.counter);
                      setFieldValue("step_5.dealingTime", slot.slotTime);
                    }}
                    key={slot.id}
                  >
                    <div className="item">
                      <MdOutlineEventAvailable
                        className={slot.available ? "available" : "unavailable"}
                      />
                      <p>
                        {slot.slotTime}# {data.counter}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {errors.step_5?.counter && (
        <ErrorMessage message={errors.step_5.counter} />
      )}
    </>
  );
};

export default SeatSlot;
