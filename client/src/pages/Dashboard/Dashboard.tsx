import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { state } = useLocation();
  return (
    <div>
      <h1>Welcome {state?.user?.foreName + ' ' + state?.user?.surname}</h1>
    </div>
  );
};

export default Dashboard;
