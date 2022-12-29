import React, { useEffect } from "react";
import { Dropdown, Input } from "../../components/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card } from "./components";
import { FC } from "react";
import "./verify.scss";
import { Button } from "../../components/common";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import Header from "./components/Header";
import { useFormValidation } from "../../hooks";
import { verifyUserAppointment } from "../../features/slices/appointmentSlice";

import AppointmentLoader from "../../components/AppointmentLoader/AppointmentLoader";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from "../../components/Form/ErrorMessage";
const data = [
  {
    id: 1,
    name: "Today",
  },
  {
    id: 2,
    name: "Tomorrow/Next Working Day",
  },
];

const VerifyAppointment: FC = () => {
  const { loading, error, verifyAppointment } = useAppSelector(
    (state) => state.appointment
  );
  const location = useLocation();

  const dispatch = useAppDispatch();
  const validate = useFormValidation();
  const navigate = useNavigate();
  const [select, setSelect] = React.useState("");
  const [cnic] = React.useState<string | undefined | number>(
    location?.state?.cnic ?? ""
  );
  const { values, errors, setFieldValue, handleSubmit, handleChange } =
    useFormik({
      initialValues: { cnic, verifyFor: "" },
      onSubmit: (values) => {
        dispatch(verifyUserAppointment(values));
      },
      validationSchema: Yup.object().shape({
        cnic: validate.cnic,
        verifyFor: Yup.string().required("Verify For is required"),
      }),
      validateOnBlur: false,
      validateOnChange: false,
    });

  useEffect(() => {
    if (error?.msg) {
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (verifyAppointment.msgStatus === 200) {
      navigate("/appointment/verified");
    }
  }, [verifyAppointment, dispatch, navigate]);

  const date = new Date();
  const today = date.getDate() + "-" + date.getMonth();
  const tommorrow = date.getDate() + 1 + "-" + date.getMonth();

  return (
    <>
      <Header />
      <Card>
        <div className="branch_container">
          <div className="branch_body">
            <div className="branch_body_header">
              <h3 className="title">Select Driving Licence Branch</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="branch_body_content">
                <div className="error-body">
                  {error?.msg && <ErrorMessage message={error.msg} />}
                </div>
                <div className="info_group">
                  <label htmlFor="name" style={{ textAlign: "center" }}>
                    <p>CNIC :</p>
                    <Input
                      name="cnic"
                      type="number"
                      id="cnic"
                      value={values.cnic}
                      onChange={handleChange}
                      error={errors.cnic}
                    />
                  </label>
                </div>
                <div className="info_group">
                  <label htmlFor="verifyFor" style={{ textAlign: "center" }}>
                    <p>Booked Pre-Appointment for</p>
                    <Dropdown
                      selectedItem={select}
                      setSelectedItem={setSelect}
                      data={data}
                      id="verifyFor"
                      handleItemClick={(day) => {
                        setFieldValue(
                          "verifyFor",
                          day === "Today" ? today : tommorrow
                        );
                      }}
                      errorMessage={errors.verifyFor}
                    />
                  </label>
                </div>

                <div className="action-verify">
                  <Button title="Verify" type="submit" variant="secondary" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
      {loading && <AppointmentLoader />}
    </>
  );
};

export default VerifyAppointment;
