import { MultistepFormWrapper, FormikStep } from "./MultistepFormWrapper";
import { object } from "yup";
import { ImClock } from "react-icons/im";
import TimeSlotSelection from "./components/TimeSlotSelection";
import { Card } from "./components";
import { Data } from "./components/TimeSlotSelection";
import LicenceType from "./components/LicenceType";
import Branch from "./components/Branch";
import SeatSlot from "./components/SeatSlot";
import ConfirmInfo from "./components/ConfirmInfo";
import PublicMessage from "./components/PublicMessage";
import Header from "./components/Header";
import InitialInfo from "./components/InitialInfo";
import "./appointmentStyles.scss";
import { useFormValidation } from "../../hooks";
import { registerAppointment } from "../../features/slices/appointmentSlice";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface IntialValues {
  step_1: {
    name: string;
    mobile: string | number;
    cnic: string | number;
  };
  step_2: {
    branch: string;
  };
  step_3: { licenceType: string };
  step_4: {
    timeSlot: string;
  };
  step_5: {
    counter: string;
    dealingTime: string;
  };
}
const data: Data = {
  tableBody: [
    {
      select: <ImClock />,
      time: "09-10",
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: "10-11",
      available: 2,
      booked: 0,
    },
    {
      select: <ImClock />,
      time: "11-12",
      available: 2,
      booked: 20,
    },
    {
      select: <ImClock />,
      time: "12-13",
      available: 0,
      booked: 4,
    },
    {
      select: <ImClock />,
      time: "13-14",
      available: 4,
      booked: 20,
    },
    {
      select: <ImClock />,
      time: "15-16",
      available: 2,
      booked: 0,
    },
  ],
  tableHeadings: ["Select", "Time Slot", "Available", "Booked"],
};
const licenceTypes = [
  {
    id: 1,
    name: "Learner Driving Licence",
  },
  {
    id: 2,
    name: "Renewal of Driving Licence",
  },
  {
    id: 3,
    name: "International Driving Permit (IDP)",
  },
  {
    id: 4,
    name: "Permanent Driving Licence (PDL)",
  },
  {
    id: 5,
    name: "Permanent Driving Licence (Commercial)",
  },
];
const branches = [
  { id: 1, name: "Korangi" },
  { id: 2, name: "DHA" },
  { id: 3, name: "Nazmabad" },
  { id: 4, name: "Landhi" },
  { id: 5, name: "Dadu" },
  { id: 6, name: "Badin" },
  { id: 7, name: "Sukker" },
  { id: 8, name: "Larkana" },
  { id: 9, name: "Hyderabad" },
];
const seatSlotData = [
  {
    counter: 1,
    slotes: [
      { available: false, id: 1, slotTime: "09:00" },
      { available: true, id: 2, slotTime: "09:10" },
      { available: false, id: 3, slotTime: "09:20" },
      { available: true, id: 4, slotTime: "09:30" },
      { available: false, id: 5, slotTime: "09:40" },
      { available: false, id: 6, slotTime: "09:50" },
    ],
  },
];

const Appointment = () => {
  const { appointment, error, loading } = useAppSelector(
    (state) => state.appointment
  );
  const [errorLog, setLogError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validate = useFormValidation();
  const initialValues: IntialValues = {
    step_1: {
      name: "",
      mobile: "",
      cnic: "",
    },
    step_2: {
      branch: "",
    },
    step_3: {
      licenceType: "",
    },
    step_4: {
      timeSlot: "",
    },

    step_5: {
      counter: "",
      dealingTime: "",
    },
  };
  useEffect(() => {
    if (error?.msg) {
      setLogError(error?.msg);
    }
  }, [loading, error]);
  useEffect(() => {
    if (appointment?.payload?.tokenNo) {
      navigate("/appointment/success");
    }
  }, [appointment, navigate, loading]);

  return (
    <>
      <Header />
      <Card>
        <MultistepFormWrapper
          initialValues={initialValues}
          onSubmit={async (values) => {
            dispatch(
              registerAppointment({
                branch: values.step_2.branch,
                licenceType: values.step_3.licenceType,
                timeSlot: values.step_4.timeSlot,
                counter: values.step_5.counter,
                dealingTime: values.step_5.dealingTime,
                name: values.step_1.name,
                mobileNum: values.step_1.mobile,
                cnic: values.step_1.cnic,
              })
            );
          }}
        >
          <FormikStep
            label="Personal Data"
            validationSchema={object().shape({
              step_1: object().shape({
                name: validate.name.trim("step_1."),
                mobile: validate.mobileNum.trim("step_1."),
                cnic: validate.cnic.trim("step_1."),
              }),
            })}
          >
            <InitialInfo />
          </FormikStep>
          <FormikStep
            label="Branch"
            validationSchema={object().shape({
              step_2: object().shape({
                branch: validate.branch,
              }),
            })}
          >
            <Branch branchesData={branches} />
          </FormikStep>
          <FormikStep
            label="Licence Types"
            validationSchema={object().shape({
              step_3: object().shape({
                licenceType: validate.licenceType.trim("step_3."),
              }),
            })}
          >
            <LicenceType licenceTypes={licenceTypes} />
          </FormikStep>
          <FormikStep
            label="Time Slot"
            validationSchema={object().shape({
              step_4: object().shape({
                timeSlot: validate.timeSlot,
              }),
            })}
          >
            <TimeSlotSelection
              title="Time Slot Availability"
              subtitle="Pre-Appointment for Next Day :"
              date="16-Dec-22"
              data={data}
            />
          </FormikStep>
          <FormikStep
            label="Seat Slot"
            validationSchema={object().shape({
              step_5: object().shape({
                counter: validate.dealingCounter,
              }),
            })}
          >
            <SeatSlot slotsData={seatSlotData} />
          </FormikStep>

          <FormikStep label="Confirm Info">
            <ConfirmInfo />
          </FormikStep>
          <FormikStep label="Public Message">
            <PublicMessage error={errorLog} />
          </FormikStep>
        </MultistepFormWrapper>
      </Card>
    </>
  );
};

export default Appointment;
