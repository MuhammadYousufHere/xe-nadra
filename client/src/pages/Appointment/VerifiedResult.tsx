import { FC } from "react";

import { useAppSelector } from "../../features/hooks";

import { Card } from "./components";
import FinalInfo from "./components/FinalInfo";
import Header from "./components/Header";
import "./success.scss";
const Success: FC = () => {
  const { verifyAppointment, loading } = useAppSelector(
    (state) => state.appointment
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <Card>
        <FinalInfo appointment={verifyAppointment} />
      </Card>
    </div>
  );
};

export default Success;
