import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  clearAppointment,
  clearVerifyAppointment,
} from "../../features/slices/appointmentSlice";
import { Card } from "./components";
import FinalInfo from "./components/FinalInfo";
import Header from "./components/Header";
import "./success.scss";

const Success: FC = () => {
  const { appointment, loading } = useAppSelector((state) => state.appointment);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearVerifyAppointment());
    };
  }, [dispatch]);
  const verifyHandler = () => {
    dispatch(clearAppointment());
    navigate("/appointment/verify", {
      state: { cnic: appointment.payload.cnic },
    });
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Card>
        <FinalInfo appointment={appointment} />
        <div className="action">
          <Button
            title="Verify Pre-Apointment"
            type="button"
            variant="secondary"
            onClick={verifyHandler}
          />
        </div>
      </Card>
    </div>
  );
};

export default Success;
